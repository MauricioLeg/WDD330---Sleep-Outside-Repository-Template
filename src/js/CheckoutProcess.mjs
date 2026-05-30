import { getLocalStorage } from "./utils.mjs";

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
		this.calculateOrderTotal;
		this.displayOrderTotal;
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
			summary.innerHTML = `<p>Subtotal: ${this.itemTotal.toFixed(2)}</p>
			<p>Tax: ${this.tax.toFixed(2)}</p>
			<p>Shipping Estimate: ${this.shipping.toFixed(2)}</p>
			<hr />
			<p>Order Total: ${this.orderTotal.toFixed(2)}</p>`;
		}
	}
}

const checkout = new CheckoutProcess('so-cart', '.summary');
checkout.init();

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
	event.preventDefault();

	console.log('Form successfully filled out.')
});


