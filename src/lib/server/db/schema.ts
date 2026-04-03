import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	age: integer('age'),
	sex: text('sex').$defaultFn(() => "M"),
	email: text('email'),
	phone: text('phonnumber')
});

export const todo = sqliteTable('todo', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description'),
	done: integer('done').$defaultFn(() => 0),
	createdAt: integer('created_at').$defaultFn(() => Date.now()),
	userId: text('user_id').references(() => user.id) 
});