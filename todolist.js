const input = document.getElementById("text-input");
input.addEventListener('keypress', function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById('input-button').click();
	}
});

function addTodo(event, todoId) {
	event.preventDefault();
	if (document.getElementById(todoId).value !== "") {
		const list = document.getElementsByClassName('todo-item');

		for (let todo of list) {
			const text = document.getElementById("text-input").value;
			if (text.trim().split(/\s+/).join(" ").toLowerCase() === todo.innerText.trim().split(/\s+/).join(" ").toLowerCase()) 
			{
				const message = document.getElementById('message');
				message.innerText = "You already added this task!";
				message.style.display = "block";
				document.getElementById("text-input").value = "";
				return;
			}
		}
		const listItem = document.createElement('li');
		listItem.setAttribute('class', 'listItem');
		listItem.style.marginBottom = "40px";

		const div = document.createElement('div');
		const p = document.createElement('p');
		p.setAttribute('class', 'todo-item');

		const todo = document.createTextNode(document.getElementById(todoId).value);

		p.appendChild(todo);

		const removeBtn = document.createElement('button');

		removeBtn.setAttribute('class', 'deleteBtn');
		removeBtn.addEventListener('click', function(event) {
			event.preventDefault();
			document.getElementById('todos').removeChild(this.parentNode.parentNode);
		});

		const remove = document.createTextNode('delete');
		removeBtn.appendChild(remove);

		div.appendChild(p);
		div.appendChild(removeBtn);

		listItem.appendChild(div);

		document.getElementById('todos').appendChild(listItem);
		document.getElementById('text-input').value = "";
		document.getElementById('message').style.display = "none";
	}
	else {
		const message = document.getElementById("message");
		message.innerHTML = "You have not entered a task to be added";
		message.style.display = "block";
	}
}