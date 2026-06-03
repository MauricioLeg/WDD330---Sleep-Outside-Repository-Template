import { 
	getLocalStorage, 
	setLocalStorage,
	loadHeaderFooter,
	alertMessage,
	removeAlerts
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();
const services = new ExternalServices();

export default class CheckoutProcess {
	constructor(key, outputSelector) {
		this.key = key;
		this.outputSelector = outputSelector;
		this.list = []
		this.itemTotal = 0;
		this.shipping = 0;
		this.tax = 0;
		this.orderTotal = 0;
	}

	init() {
		this.list = getLocalStorage(this.key);
		this.calculateSubtotal();
		this.calculateOrderTotal();
		this.displayOrderTotal();
	}

	calculateSubtotal() {
		this.itemTotal = 0;
		this.list.forEach(product => {
			this.itemTotal += product.FinalPrice;
		})
	}
	calculateOrderTotal() {
		this.tax = 0;
		this.shipping = 0;

		this.list.forEach((product, index) => {
			const taxPrice = product.FinalPrice * 0.06;
			this.tax += taxPrice;
			if (index === 0) {
				this.shipping += 10;
			} else {
				this.shipping += 2;
			}
		});
		this.orderTotal = this.itemTotal + this.tax + this.shipping;
	}
	displayOrderTotal() {
		const summary = document.querySelector(this.outputSelector);
		if (summary) {
			summary.innerHTML = `
			<div class="order-details">
				<p>Subtotal: <span>${this.itemTotal.toFixed(2)}</span></p>
				<p>Tax: <span>${this.tax.toFixed(2)}</span></p>
				<p>Shipping Estimate: <span>${this.shipping.toFixed(2)}</span></p>
				<hr />
				<p>Order Total: <span>${this.orderTotal.toFixed(2)}<span></p>
			</div>

			<button type="submit" id="checkout-submit-btn">PLACE ORDER</button>
			`;
		}
	}
	packageItems() {
		const cleanItems = this.list.map(item => {
			return {
				id: item.Id,
				name: item.Name,
				price: item.FinalPrice,
				quantity: 1
			};
		});
		return cleanItems;
	}
	async checkout() {
		const form = document.querySelector('form');
		if (!form) {
		alertMessage('Checkout form not found.');
		return;
		}

		if (!this.list || this.list.length === 0) {
			alertMessage('Your cart is empty. Add items before checking out.');
			return;
		}

		const formValues = formDataToJSON(form);
		const orderPayload = {
			...formValues,
			orderDate: new Date().toISOString(),
			items: this.packageItems(),
			orderTotal: this.orderTotal.toFixed(2),
			shipping: this.shipping,
			tax: this.tax.toFixed(2)
		};

		try {
			const res = await services.checkout(orderPayload);
			console.log('Order successful:', res);

			removeAlerts();
			alertMessage('Order placed successfully. Redirecting to confirmation page...', false, 'success');

			this.clearCart();

			setTimeout(() => {
				window.location.href = './success.html';
			}, 1200);
		} catch (err) {
			console.error('Server checkout processing error:', err);

			const message =
				Array.isArray(err?.message)
					? err.message.join(' ')
					: err?.message || 'Checkout failed. Please try again.';

			removeAlerts();
			alertMessage(message, true, 'error');
		}
	}
	clearCart() {
		this.list = [];
		setLocalStorage(this.key);
	}
}

const checkout = new CheckoutProcess('so-cart', '.summary');
checkout.init();

const formElement = document.querySelector('form');
if (formElement) {
	formElement.addEventListener('submit', async (event) => {
		event.preventDefault();
		removeAlerts();

		if (!formElement.checkValidity()) {
			formElement.reportValidity();
			alertMessage('Please fix the highlighted fields before placing your order.');
			return;
		}

		await checkout.checkout();
	});
}

function formDataToJSON(formElement) {
	const formData = new FormData(formElement);
	const convertedJSON = {}
	
	formData.forEach(function (value, key) {
		convertedJSON[key] = value;
	});
	return convertedJSON;
}