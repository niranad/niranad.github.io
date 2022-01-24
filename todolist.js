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
			if (text.trim().split(/\s+/).join(" ").toLowerCase() === 
				todo.textContent.trim().split(/\s+/).join(" ").toLowerCase()) 
			{
				const message = document.getElementById('message');
				message.textContent = "You already added this task!";
				message.style.display = "block";
				document.getElementById("text-input").value = "";
				return;
			}
		}
		const listItem = document.createElement('li');
		listItem.setAttribute('class', 'listItem');
		listItem.style.marginBottom = "40px";

		const div = document.createElement('div');
		const todoBox = document.createElement('div');
		todoBox.setAttribute('class', 'todo-item');

		const todo = document.createTextNode(document.getElementById(todoId).value);

		todoBox.appendChild(todo);

		const textArea = document.createElement('textArea');
		const textAreaTextNode = document.createTextNode(
			document.getElementById('text-input').value);
		textArea.setAttribute('class', 'edit-area');
		textArea.setAttribute('row', 50);
		textArea.setAttribute('col', 50);
		textArea.appendChild(textAreaTextNode);
		textArea.style.display = "none";

		const h5 = document.createElement('h5');
		const h5TextNode = document.createTextNode('Resize the text area as needed. Press enter to finish edit. ');
		h5.appendChild(h5TextNode);
		h5.style.display = "none";

		textArea.appendChild(textAreaTextNode);
		textArea.addEventListener('keypress', function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				this.parentNode.firstChild.textContent = this.value;
				this.style.display = "none";
				h5.style.display = "none";
			}
		});

		const editBtn = document.createElement('button');
		const editTextNode = document.createTextNode('Edit');
		editBtn.appendChild(editTextNode);
		editBtn.setAttribute('class', 'edit-btn');
		editBtn.addEventListener('click', function(event) {
			event.preventDefault();
			textArea.style.display = "block";
			h5.style.display = "block";
		});

		const deleteBtn = document.createElement('button');

		deleteBtn.setAttribute('class', 'delete-btn');
		deleteBtn.addEventListener('click', function(event) {
			event.preventDefault();
			document.getElementById('todos').removeChild(
				this.parentNode.parentNode);
		});

		const deleteTextNode = document.createTextNode('Remove');
		deleteBtn.appendChild(deleteTextNode);

		div.appendChild(todoBox);
		div.appendChild(editBtn);
		div.appendChild(deleteBtn);
		div.appendChild(textArea);
		div.appendChild(h5);

		listItem.appendChild(div);

		document.getElementById('todos').appendChild(listItem);
		document.getElementById('text-input').value = "";
		document.getElementById('message').style.display = "none";
	}
	else {
		const message = document.getElementById("message");
		message.textContent = "You have not entered a task to be added";
		message.style.display = "block";
	}
}