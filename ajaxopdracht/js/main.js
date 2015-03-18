(function  () {
	// variabele voor ophalen van de input box
	var textbox = document.getElementById('box');
	// de section ophalen waar alle namen en toebehoren worden in gezet
	var displayBox = document.getElementById('displayfield');
	//alle paragraven die opgehaalt worden die er zijn waronder die later aangemaakt worden
	var ptjes = document.getElementsByTagName('p')
	// declaratie van de json array
	var json = "";
	// ajax request
	var xhr = new XMLHttpRequest();
		// triggert als de status verandert en triggert een functie die 
		// daarna controleert of het de juiste statusen zijn
		xhr.onreadystatechange = function  () {
			if ((xhr.readyState == "4" && xhr.status == "200") ) {
				json = JSON.parse(xhr.responseText);
			};
		}
		//opent de ajax link
		xhr.open("GET","files/zoek.json");
		//zend het verzoek voor het ophalen van de pagiena die gespecificeert is
		xhr.send();
		//vangt de input van te texbox op die er opgevraagt word voor de neamen
	textbox.oninput = function  () {
		var input = textbox.value;
		var namecheck;
		var real = input.toLowerCase();
		displayBox.innerHTML = "";

		for (var i = 0; i < json.length; i++) {
			namescheck = json[i].name.toLowerCase();
			if (real != "") {
				if (namescheck.indexOf(real) !== -1) {
					display(json[i]);
				};
			};

		};
	for (var i = 0; i < ptjes.length; i++) {
		ptjes[i].onclick = function  () {
				for (var j = 0; j < json.length; j++) {
					if (json[j]['name'].replace( /\s/g, "") === this.id) {
						this.innerHTML = "";
						this.setAttribute("id",json[j]['name'].replace( /\s/g, "")+"stop");

						for (var next in json[j]) {
							
							if (next == "friends") {
								this.innerHTML += next+": ";
								for (var k = 0; k < json[j][next].length; k++) {
									for (var friens in json[j][next][k]) {
										this.innerHTML +=json[j][next][k]['name']+", ";
									}
								};
								this.innerHTML +="<br>";

							}else{
								this.innerHTML += next + ": "+json[j][next] + "<br>";
							};
						}
					} else if(json[j]['name'].replace( /\s/g, "")+"stop" === this.id) {
						this.innerHTML = "name: "+json[j]['name'];
						this.setAttribute("id",json[j]['name'].replace( /\s/g, ""));
					};
				};


		}	

	};

	}
	function display (array) {
		
		for (var key in array) {
			if (key == "name") {
				displayBox.innerHTML += "<p id="+ array['name'].replace( /\s/g, "") +">"+"name" +": "+ array["name"]+"<br>";
				document.getElementById(array['name'].replace( /\s/g, "")).setAttribute("value",array['name'].replace( /\s/g, ""))
				
			};				
		}
		
	}


		
})();