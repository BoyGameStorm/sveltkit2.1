let date = new Date();

const db = new Map();

export function getTodos(userid) {
	if (!db.get(userid)) {

		const todoMap = new Map();
		const todoSet = new Set();
		
		
		const todoId = crypto.randomUUID();
		const firstTodo = {
			id: todoId,
			description: 'Learn SvelteKit',
			data: date.setHours(0),
			done: false
		};
		
	
		todoMap.set(todoId, firstTodo);
		todoSet.add(todoId);
		
		db.set(userid, {
			map: todoMap,
			set: todoSet
		});
	}
	
	const userData = db.get(userid);
	const todos = [];
	

	for (const id of userData.set) {
		todos.push(userData.map.get(id));
	}
	
	console.log("Данные:", todos);
	return todos;
}

export function createTodo(userid, description) {
	if (description === '') {
		throw new Error('todo must have a description');
	}

	const userData = db.get(userid);
	if (!userData) {
		throw new Error('user not found');
	}


	let descriptionExists = false;
	for (const todo of userData.map.values()) {
		if (todo.description === description) {
			descriptionExists = true;
			break;
		}
	}

	if (descriptionExists) {
		throw new Error('todos must be unique');
	}


	const todoId = crypto.randomUUID();
	const newTodo = {
		id: todoId,
		description,
		done: false,
		data: new Date().toISOString() // Добавил дату создания
	};

	userData.map.set(todoId, newTodo);
	userData.set.add(todoId);
	
	// 🔥 ВАЖНО: возвращаем созданный todo
	return newTodo;
}

export function deleteTodo(userid, todoid) {
	const userData = db.get(userid);
	if (!userData) return false;

	const deleted = userData.map.delete(todoid);
	userData.set.delete(todoid);
	
	return deleted;
}

export function updateTodo(userid, todoid, newDescription) {
	if (newDescription === '') {
		throw new Error('todo must have a description');
	}

	const userData = db.get(userid);
	if (!userData) {
		throw new Error('user not found');
	}

	const todo = userData.map.get(todoid);
	if (!todo) {
		throw new Error('todo not found');
	}


	let descriptionExists = false;
	for (const t of userData.map.values()) {
		if (t.description === newDescription && t.id !== todoid) {
			descriptionExists = true;
			break;
		}
	}

	if (descriptionExists) {
		throw new Error('todos must be unique');
	}

	
	todo.description = newDescription;
	
	// Возвращаем обновленный todo
	return todo;
}

// Добавь функцию для обновления статуса (toggle)
export function updateTodoStatus(userid, todoid, done) {
	const userData = db.get(userid);
	if (!userData) {
		throw new Error('user not found');
	}

	const todo = userData.map.get(todoid);
	if (!todo) {
		throw new Error('todo not found');
	}

	todo.done = done;
	
	// Возвращаем обновленный todo
	return todo;
}

export function toggleTodo(userid, todoid, done) {
	const userData = db.get(userid);
	if (!userData) {
		throw new Error('user not found');
	}

	const todo = userData.map.get(todoid);
	if (!todo) {
		throw new Error('todo not found');
	}

	todo.done = done;
	
	// Возвращаем обновленный todo
	return todo;
}