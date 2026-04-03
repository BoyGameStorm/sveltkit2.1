import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/tododata/js.js';

export function load({ cookies }) {
	let id = cookies.get('userid');

	if (!id) {
		id = crypto.randomUUID();
		cookies.set('userid', id, { path: '/' });
	}

	return {
		todos: db.getTodos(id)
	};
}

export const actions = {
	create: async ({ cookies, request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();
		const description = data.get('description');

		// Валидация: описание не должно быть пустым
		if (!description || description.toString().trim() === '') {
			return fail(422, {
				description: description,
				error: 'Description cannot be empty'
			});
		}

		try {
			db.createTodo(cookies.get('userid'), description);
		} catch (error) {
			return fail(422, {
				description: description,
				error: error.message
			});
		}
	},

	toggle: async ({ cookies, request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();
		const todoId = data.get('id');

		try {
			// Получаем текущий todo, чтобы узнать его статус
			const userId = cookies.get('userid');
			const todos = db.getTodos(userId);
			const todo = todos.find(t => t.id === todoId);
			
			if (todo) {
				// Переключаем статус: если done = true, ставим false, и наоборот
				db.updateTodoStatus(userId, todoId, !todo.done);
			}
		} catch (error) {
			return fail(422, {
				id: todoId,
				error: error.message
			});
		}
	},

	delete: async ({ cookies, request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();
		const todoId = data.get('id');

		try {
			db.deleteTodo(cookies.get('userid'), todoId);
		} catch (error) {
			return fail(422, {
				id: todoId,
				error: error.message
			});
		}
	},

	update: async ({ cookies, request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();
		const todoId = data.get('id');
		const newDescription = data.get('description');

		// Валидация: описание не должно быть пустым
		if (!newDescription || newDescription.toString().trim() === '') {
			return fail(422, {
				id: todoId,
				description: newDescription,
				error: 'Description cannot be empty'
			});
		}

		try {
			db.updateTodo(cookies.get('userid'), todoId, newDescription);
		} catch (error) {
			return fail(422, {
				id: todoId,
				description: newDescription,
				error: error.message
			});
		}
	}
};