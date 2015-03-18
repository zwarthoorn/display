(function  () {
	//get all the buton elements
	var buttons = document.getElementsByTagName('button');
	//array for the calculation
	var calculationArray = [];
	//for making the display
	var display = ""
	//getting display div
	var displayDiv = document.getElementById('display');
	//loping true the buttons
	for (var i = 0; i < buttons.length; i++) {
		//activation on a specific button click and adding it to a array
		buttons[i].onclick = function(){
			display = "";	
			calculationArray[calculationArray.length] = this.value;
			// check if the = key or CE key is pressed
			for (var i = 0; i < calculationArray.length; i++) {
				
				if (calculationArray[i] == "=") {
					calculate();
					calculationArray = [];
					break;
				};
				if (calculationArray[i] == "CE") {
					display = "0";
					calculationArray = [];
					break;	
				};
				
				display += calculationArray[i];
			};
			
			
			//displays the number if it is calculatet or not
			displayDiv.innerHTML = display;
			return false;
		}
		
	};
	//calculated the array we just made with the normal buttons and takes out the operator so it can calculate withoud eval
	function calculate () {
		var operator = "";
		var number1 = false;
		var number2 = false;
		var store = ""
		for (var i = 0; i < calculationArray.length; i++) {
			if (number1 == false) {
				switch(calculationArray[i]){
					case "+":
						number1 = parseInt(store);
						operator = "+";
						break;
					case "-":
						number1 = parseInt(store);
						operator = "-";
						break;
					case "*":
						number1 = parseInt(store);
						operator = "*";
						break;
					case "/":
						number1 = parseInt(store);
						operator = "/";
						break;
					default:
						store += calculationArray[i];
						

				}
				if (number1 != false) {store = ""};
			}else{
				if (calculationArray[i] == "=") {	
					number2 = parseInt(store);
					switch(operator){
						case "+":
							var isCalculated = number1 + number2;
						break;
						case "-":
							var isCalculated = number1 - number2;
							break;
						case "*":
							var isCalculated = number1 * number2;
							break;
						case "/":
							var isCalculated = number1 / number2;
							break;
					}
					display = isCalculated.toString();

				}
				store += calculationArray[i];

				};
			
		};
	}



})();
