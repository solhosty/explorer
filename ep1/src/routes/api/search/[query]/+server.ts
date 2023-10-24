import { json, type RequestEvent } from "@sveltejs/kit";
import { Connection } from '@solana/web3.js';
import { search } from "$lib/utils/search";

const { API_KEY } = import.meta.env

export async function GET({params}: RequestEvent) { 
    const conn = new Connection(`https://rpc.helius.xyz/?api-key=9136c01a-ccca-46b1-8d55-d170f0bfe47d`);
    const result = await search(params?.query || "", conn)
    return json(result)
} 