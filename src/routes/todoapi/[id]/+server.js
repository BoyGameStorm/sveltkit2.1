import * as database from '$lib/server/tododata/js';

export async function PUT({ params, request, cookies }) {
	const { done } = await request.json();
	const userid = cookies.get('userid');

	await database.toggleTodo( userid,  params.id, done )
	return new Response(null, { status: 204 });
}