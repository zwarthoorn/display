var ajaxinput = document.getElementById("ajaxpost");
var display = document.getElementById('display');

ajaxinput.onclick = function()
{
	var author = document.getElementById("QuizName").value;
	

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if((xhr.readyState == 4) && (xhr.status == 200 || xhr.status ==304))
		{
			var response = xhr.responseText;
			var jsonArray = JSON.parse(response);
			var innerHtmlString = ""
			for (var i = 0; i < jsonArray.length; i++) {
				innerHtmlString += "<p>"+jsonArray[i].title+" <input type='submit' name='"+jsonArray[i].id+"' value='delete' class='delete'></p>";
			};
			display.innerHTML = innerHtmlString;
			var quizNameInput = document.getElementById('QuizName');
			quizNameInput.value = "";
			var deleter = document.getElementsByClassName("delete");

			for (var j = 0; j < deleter.length; j++) {
				deleter[j].onclick = function() {
				deleteQuiz(this.getAttribute("name"));
			}
	};
		}
	}
	xhr.open("POST", "/test2/ajax/ajaxinsert");
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.send("QuizName="+author);

	return false;
}



	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		var display = document.getElementById('display');
		if((xhr.readyState == 4) && (xhr.status == 200 || xhr.status ==304))
		{
			var response = xhr.responseText;
			var jsonArray = JSON.parse(response);
			var innerHtmlString = ""
			for (var i = 0; i < jsonArray.length; i++) {
				innerHtmlString += "<p>"+jsonArray[i].title+" <input type='submit' name='"+jsonArray[i].id+"' value='delete' class='delete'><input type='submit' name='"+jsonArray[i].id+"' value='edit' class='edit'></p>";
			};
			display.innerHTML = innerHtmlString;
			var deleter = document.getElementsByClassName("delete");

			for (var j = 0; j < deleter.length; j++) {
				deleter[j].onclick = function() {
				deleteQuiz(this.getAttribute("name"));
			}
			var edit = document.getElementsByClassName("edit");
			for (var k = 0; k < edit.length; k++) {
				edit[k].onclick = function() {
					editQuiz(this.name)
				}
			};
	};
		}
	}
	xhr.open("GET", "/test2/ajax/QuizGet");
	xhr.send();

	function deleteQuiz (id) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if((xhr.readyState == 4) && (xhr.status == 200 || xhr.status ==304))
			{
				var response = xhr.responseText;
				var jsonArray = JSON.parse(response);
				var innerHtmlString = ""
				for (var i = 0; i < jsonArray.length; i++) {
					innerHtmlString += "<p>"+jsonArray[i].title+" <input type='submit' name='"+jsonArray[i].id+"' value='delete' class='delete'></p>";
				};
				display.innerHTML = innerHtmlString;
			

			
			};
		}
		xhr.open("POST", "/test2/ajax/QuizDelete");
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("QuizId="+ id);
		}

	function editQuiz (id) {
		var display = document.getElementById('display');
		
		display.innerHTML = "";

		var numbertjes = new XMLHttpRequest();
		numbertjes.onreadystatechange = function()
		{
			if((numbertjes.readyState == 4) && (numbertjes.status == 200 || numbertjes.status ==304))
			{
				

				if(xhr.responseText != "no"){
					var question = parseInt(numbertjes.responseText);
					makeQuestion(id, question);


				}else{
					makeQuestion(id , 1);
				}
			};
		}
		numbertjes.open("POST", "/test2/ajax/questionGet");
		numbertjes.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		numbertjes.send("QuizId="+ id);

	}
	
	function makeAwnser () {
		var make = "<p>awnser <input type='text' class='awnser'></p>"
		var display = document.getElementById('qBox');

		display.innerHTML += make;



	}
	function makeQuestion (idQuiz , many) {
		var display = document.getElementById('display');
		display.innerHTML = "";
		var qBox = document.createElement('div')
		qBox.setAttribute('id','qBox');
		display.appendChild(qBox);
		qBox = document.getElementById('qBox');
		
		var make = "<p>"+ many + "</p>";
		make += "<p> <label for='vraag'>question</label> <input type='text' name='"+idQuiz+"' id='vraag'></p>";
		qBox.innerHTML = make;
		makeAwnser();
		makeAwnser();
		display.innerHTML += "<p><input type='submit' value='new Awnser' id='new'></p>";
		//display.innerHTML +="<p><input type='submit' value='delete Awnser' id='delAwnser'></p>";
		display.innerHTML +="<p><input type='submit' value='prev' id='edittor' name='"+ (many - 1)+ "'><input type='submit' value='next' id='send' name='"+many+"'></p>"
		var new_Awnser_Button = document.getElementById('new');
		var prev_Question_Button = document.getElementById('edittor');
		var next_Question_Button = document.getElementById('send');

		new_Awnser_Button.onclick = function () {
			makeAwnser();
			delButtonExisist();
		}
		prev_Question_Button.onclick = function () {
			prev();
		}
		next_Question_Button.onclick = function () {
			next();
		}

	}

	function delAwnser () {
		var qBox = document.getElementById('qBox');
		var display = document.getElementById('display');
		qBox.removeChild(qBox.childNodes[qBox.childNodes.length - 1])
		alert(qBox.childNodes.length);


		

	}
	function delButtonExisist () {
		var qBox = document.getElementById('qBox');
		if (qBox.childNodes.length == 4) {
			display.removeChild(display.childNodes[display.childNodes.length - 2])
		};
		if (qBox.childNodes.length > 4 && document.getElementById('delAwnser') == null) {
			var delbutton = document.createElement('p');
		
			delbutton.innerHTML = "<input type='submit' value='delete Awnser' id='delAwnser'>";
						display.insertBefore(delbutton, display.lastChild)
			var del_Awnser_Button = document.getElementById('delAwnser')
			del_Awnser_Button.onclick = function () {
				delAwnser();
				delButtonExisist();
			}

		};
	}

	function prev () {
		var last = display.lastChild;

		var prevbutton = last.firstChild;

		alert(prevbutton.getAttribute('name'));
	}

	function next () {
		var last = display.lastChild;

		var nextbutton = last.lastChild;

		var stringForSend = makeSendString(nextbutton.getAttribute('name'));
		

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if((xhr.readyState == 4) && (xhr.status == 200 || xhr.status ==304))
			{
				alert(xhr.responseText);
				var question = document.getElementById('vraag');
				editQuiz(question.name);
			};
		}
		xhr.open("POST", "/test2/ajax/MakeQuestion");
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(stringForSend);


	}

	function makeSendString (questionnumber) {
		var awnsers = document.getElementsByClassName('awnser');
		var question = document.getElementById('vraag');

		var back = "Questionnum="+questionnumber+"&Question="+question.value+"&Quiz_id="+question.name+"&";
		
		var lenghtawnsers = awnsers.length;
		for (var i = 0; i < lenghtawnsers; i++) {
			if (i == lenghtawnsers - 1) {
				back +="&";
			};
			back += i.toString()+"="+awnsers[i].value;
		};
		return back;
	}
	

