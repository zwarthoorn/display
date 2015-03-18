<h1>Bericht ophalen:</h1>

<p>Selecting a message by sender_id:</p>
<form action="">
	<input type="text" id="txt1" onkeyup="getMessage(this.value)">
</form>
<div>
	<p>Message <hr><br><span id="message"></span></p>
</div>

<script type="text/javascript" src="assets/js/main.js"></script>

<script>

function getMessage(id)
{
	var text = document.getElementById("message");
	text.innerHTML = "";

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() 
	{
		if((xhr.readyState == 4) && (xhr.status == 200 || xhr.status == 304))
		{
			var obj = JSON.parse(xhr.responseText);
			
			if(obj == "")
			{
				text.innerHTML += "Geen bericht gevonden";
			}
			else
			{
				for (var i = 0; i < obj.length; i++)
				{
					text.innerHTML += "<p>Author:"+obj[i].author+"</p><p>Bericht:<br>"+obj[i].message + "</p><hr>";
				}
			}
		}		
	}
	xhr.open("GET", "ajax/get_message/"+id, true);

	xhr.send();
}

</script>