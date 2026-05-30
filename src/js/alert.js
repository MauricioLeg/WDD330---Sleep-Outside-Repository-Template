export default class Alert {
    constructor(jsonPath) {
        this.jsonPath = jsonPath;
    }

    //fetch the alert data from the JSON file and display it on the page
    async fetchAlert() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error('Error fetching alert data:', error);
        }
    }
    //initialize and render alert elements on the page
    async init() {
        const alerts = await this.fetchAlert();
        if (alerts && alerts.length > 0) {
            this.renderAlerts(alerts);
        }
    }
    
    /// Build the DOM elements and prepend them to <main>
    renderAlerts(alerts) {
        // 1. Create the <section class="alert-list">
        const alertSection = document.createElement('section');
        alertSection.classList.add('alert-list');

        // 2. Loop through each alert and build a <p> element
        alerts.forEach(alertData => {
        const p = document.createElement('p');
        p.innerText = alertData.message;
        
        // Apply custom background and text colors
        p.style.backgroundColor = alertData.background;
        p.style.color = alertData.color;
        
        // Optional: Add a helper class for styling gaps/padding in CSS
        p.classList.add('alert-item'); 

        alertSection.appendChild(p);
        });

        // 3. Prepend to the <main> element of the page
        const mainElement = document.querySelector('main');
        if (mainElement) {
        mainElement.prepend(alertSection);
        } else {
        throw new Error('Could not find a <main> element to prepend alerts to.');
        }
    }
}