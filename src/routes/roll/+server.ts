// import {json} from '@sveltejs/kit';

// export function GET(){
//     const number = Math.floor(Math.random() * 6) + 1;
    
//     return json({value: number});
// }

import type { RequestHandler } from '../$types';

import { json } from '@sveltejs/kit'

export type RollType = {
    val: number,
    tex: text
}

export const GET: RequestHandler = async () => {
    const tex = 'але улю'; 
    const num = Math.floor(Math.random() * 6) + 1
    const result: RollType = { val: num, tex: tex }
    return json(result);
};