import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { eq } from 'drizzle-orm';
import { user, todo } from './schema.js';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({ url: process.env.DATABASE_URL });
export const db = drizzle(client);

async function main() {
  try {
    const userData = {
      name: 'Максим',
      age: 21,
      sex: 'M',
      email: 'test@test.tt',
      phone: "89734438913"
    };

    // Создаём пользователя
    // const [newUser] = await db.insert(user).values(userData).returning();
    // console.log('✅ Пользователь создан!', newUser);

    // Создаём тудушку для этого пользователя
    const todoData = {
      title: 'Сделать домашку',
      description: 'Закончить проект по SvelteKit',
      done: 0,
      userId: user.id
    };

  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

main();