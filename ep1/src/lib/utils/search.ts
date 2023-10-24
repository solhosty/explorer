import type { Connection } from '@solana/web3.js';
import { isValidPublicKey } from './valid-pubkey';
import { PublicKey } from '@solana/web3.js';

export interface Result {
	url: string;
	address: string;
	type: ResultType;
	valid: boolean;
	search: string;
}

export type ResultType = 'token' | 'account' | 'transaction' | null;
 
const searchDefaults: Result = {
	address: '',
	search: '',
	type: null,
	url: `/`,
	valid: false
};

export const search = async (query: string, connection: Connection): Promise<Result> => {
	const transaction = query.length > 50;

	if (isValidPublicKey(query)) {
		const pubkey = new PublicKey(query);
		const account = await connection.getParsedAccountInfo(pubkey);
		console.log(account);
		const token =
			//@ts-ignore

			account.value?.data?.program === 'spl-token' ||
			//@ts-ignore

			account.value?.data?.program === 'spl-token-2022' ||
			account.value === null;

            const address = token ? "token" : "account";

            return {
                address: query,
                search: query,
                type: address,
                url: `/${address}/${query}`,
                valid: true,
            };
        } else if (transaction) {
            return {
                address: query,
                search: query,
                type: "transaction",
                url: `/transaction/${query}`,
                valid: true,
            };
        } 
        return searchDefaults;
};
