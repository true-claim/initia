import { Wallet, LCDClient, MnemonicKey, MsgSend, MsgExecute, bcs } from '@initia/initia.js';
import { makeLogger } from '../utils/logger.js';


const lcd = new LCDClient('https://lcd.initiation-1.initia.xyz/', {
    chainId: 'initiation-1',
    gasPrices: '0.15uinit', // default gas prices
    gasAdjustment: '1.75',  // default gas adjustment for fee estimation
})

async function getAddress(mnemonic) {
    let logger = new makeLogger('address');
    try {
        const key = new MnemonicKey({
            mnemonic, // (optional) if null, generate a new Mnemonic key
            account: 0, // (optional) BIP44 account number. default = 0
            index: 0, // (optional) BIP44 index number. defualt = 0
            coinType: 118, // (optional) BIP44 coinType. default = 118
        })
        let address = key.accAddress
        return address
    } catch (error) {
        logger.warn(error)
        logger.warn('Error Step: checking address...')
        return;
    }
}

async function getBalance(mnemonic) {
    let logger = new makeLogger('balance');
    try {
        const address = await getAddress(mnemonic)
        const b = await lcd.bank.balance(address)
        let balances = (b[0]?._coins?.uinit?.amount) / 1000000
        logger.info(balances, `$INIT to address ${address.slice(4, 16)}...`)
    } catch (error) {
        logger.warn(error)
        logger.warn('Error Step: checking balance...')
        return;
    }
}



export { getBalance, getAddress }
