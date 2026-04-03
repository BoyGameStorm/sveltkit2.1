import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';

export const load = (async () => {
       try {
        // аналогично SELECT * FROM user
        const users = await db.select().from(schema.user);
        //db.select().from() возвращает типизированный результат!!!

        return {
            users: users  // TypeScript знает, что это user[]
        };
    } catch (error) {
        console.error('ошибка:', error);
        return {
            users: []
        };
    }
}) satisfies PageServerLoad;