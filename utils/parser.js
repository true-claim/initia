import fs from 'fs/promises';
import { makeLogger } from './/logger.js';

async function wallet_parser() {
    let logger = makeLogger('parser')
    const file = await fs.readFile('data/wallet.txt', 'utf8');
    const lines = file.split('\n').filter((key) => key !== '');
    let accounts = []
    lines.forEach((key) => {
        let [seed, token] = key.split('|');
        if(token === undefined) {
            accounts.push({ seed });
            return
        }
        accounts.push({ seed, token });
    })
    logger.info(`Wallet parsed: `, accounts.length)
    return accounts //@return [{seed, token}, {seed, token}] OR [{seed}, {seed, token}]
}

//await wallet_parser()

export { wallet_parser }
