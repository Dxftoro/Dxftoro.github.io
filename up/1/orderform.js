let itemInfo = {
	"Минтай": 46,
	"Горбуша": 54,
	"Корюшка": 41,
	"Треска": 82,
	"Тунец": 106,
	"Мойва": 32,
	"Скумбрия": 95
};

function doOrder() {
	let items = document.getElementsByName("items");
	let count = document.getElementsByName("count");
	let result = document.getElementById("orderform-result");

	alert("Посчитать стоимость заказа?");

	if (count[0].value.match(/^\d+$/) !== null) {
		let cost = Math.abs(itemInfo[items[0].value] * count[0].value);

		result.className = "orderform-result-succes";
		result.innerHTML = "<br /><strong>Стоимость: " + cost + " ₽</strong>";
	}
	else {
		result.className = "orderform-result-failure";
		result.innerHTML = "<br /><strong>Поле ввода количества не должно содержать буквы, отрицательные значения или быть пустым!</strong>";
	}

	return false;
}

window.addEventListener("DOMContentLoaded", function(event){
	console.log("DOM loaded!");
	let button = document.getElementById("orderform-button");
	button.addEventListener("click", doOrder);
});