let mainConfig = {
	"flexRadioDefault1": {
		"selection-wrapper": "none",
		"checkbox-wrapper": "none",
		"price": 30,
		"checkbox_mod": 0,
		"items": []
	},

	"flexRadioDefault2": {
		"selection-wrapper": "block",
		"checkbox-wrapper": "none",
		"price": 40,
		"checkbox_mod": 0,
		"items": ["bh1", "bh2", "bh3"]
	},

	"flexRadioDefault3": {
		"selection-wrapper": "none",
		"checkbox-wrapper": "block",
		"price": 50,
		"checkbox_mod": 10,
		"items": []
	}
};

let itemsConfig = {
	"bh1": {
		"name": "Минтай",
		"price_mod": 10
	},

	"bh2": {
		"name": "Горбуша",
		"price_mod": 5
	},

	"bh3": {
		"name": "Скумбрия",
		"price_mod": 20
	}
};

let selectedService = "";

function setupSelection(selectionWrapper, target) {
	selectionWrapper.style.display = mainConfig[target.id][selectionWrapper.id];

	let selection = document.getElementById("orderform-selection");
	let selectionItems = mainConfig[target.id]["items"];
	let selectionSize = selection.length - 1;

	for (let i = selectionSize; i >= 0; i--) {
		selection.remove(i);
	}

	for (let i = 0; i < selectionItems.length; i++) {
		let option = document.createElement("option");
		option.value = selectionItems[i];
		option.text = itemsConfig[selectionItems[i]]["name"];

		selection.add(option);
	}
}

function changeCost(result, selection, checkbox, count) {
	if (count.value < 0) count.value = 0;

	console.log(selection.value);

	if (selectedService != "") {
		let price = mainConfig[selectedService]["price"];
		let priceMod = 0;
		let checkboxMod = checkbox.checked * mainConfig[selectedService]["checkbox_mod"];

		if (selection.value != "") priceMod = itemsConfig[selection.value]["price_mod"];

		let cost = (price + priceMod + checkboxMod) * count.value;
		
		result.className = "orderform-result-succes";
		result.innerHTML = "<br /><strong>Стоимость: " + cost + " ₽</strong><br />";
	}
	else {
		result.className = "orderform-result-failure";
		result.innerHTML = "<br /><strong>Выберите тип товара!</strong><br />";
	}
}

window.addEventListener("DOMContentLoaded", function(event) {
	console.log("DOM loaded!");

	let count = document.getElementById("services-input-count");
	count.value = 1;

	let radios = document.getElementById("services-radios");
	let selectionWrapper = document.getElementById("selection-wrapper");
	let checkboxWrapper = document.getElementById("checkbox-wrapper");
	let result = document.getElementById("services-result");
	let button = document.getElementById("services-button");

	let servicesWrapper = document.getElementById("services-wrapper");

	radios.addEventListener("change", function(event) {
		selectedService = event.target.id;

		setupSelection(selectionWrapper, event.target, mainConfig);
		checkboxWrapper.style.display = mainConfig[selectedService][checkboxWrapper.id];
	})

	let selection = document.getElementById("orderform-selection");
	let checkbox = document.getElementById("services-checkbox");

	servicesWrapper.addEventListener("change", function(event) {
		changeCost(result, selection, checkbox, count);
	});
});