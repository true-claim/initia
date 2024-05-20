import {balanceXP, jennieStat, mintNFT} from '../module/request.js'
import { Wallet, LCDClient, MnemonicKey, MsgSend, MsgExecute, bcs, MsgDelegate, MsgWithdrawDelegatorReward } from '@initia/initia.js';

import { makeLogger } from '../utils/logger.js';
import {random_MinutesDelay} from '../utils/random.js';

const lcd = new LCDClient('https://lcd.initiation-1.initia.xyz/', {
    chainId: 'initiation-1',
    gasPrices: '0.40uinit', // default gas prices
    gasAdjustment: '3',  // default gas adjustment for fee estimation
})

async function JennieBuyEat(mnemonic, address){

    let logger = makeLogger('JennieBuyEat')
    //await random_MinutesDelay(1, 10) 

    try {

        let Jennieeady = await mintNFT(address);
        if(!Jennieeady.is_minted) {
            logger.info('Jennie NFT Null. Skip account... \n')
            return false;
        }

        const key = new MnemonicKey({
            mnemonic, 
            account: 0, 
            index: 0, 
            coinType: 118, 
        })
        const wallet = new Wallet(lcd, key)

       let countToken = bcs.u64().serialize(2200000).toBase64()
        
        const msgs = [
            new MsgExecute(
            address,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
            'jennie',
            'draw_food',
            [],["AQ=="])]

            const signedTx = await wallet.createAndSignTx({ msgs });
            let broadcastResult = await lcd.tx.broadcastSync(signedTx).then(res => {
                if(res.code === 400) {
                    throw res.raw_log
                }
                logger.info(`Успешый купил Common ХАВЧИК: https://scan.testnet.initia.xyz/initiation-1/txs/${res.txhash}`)
            })
            


    } catch (error) {
        logger.error(`Error JennieBuyEat ${error}`) //_redirectable
        await random_MinutesDelay(5, 20) 
        await JennieBuyEat(mnemonic, address)
    }
}

async function JennieEat(mnemonic, address){

    let logger = makeLogger('JennieEat')
    //await random_MinutesDelay(1, 10) 

    try {

        let Jennieeady = await mintNFT(address);
        if(!Jennieeady.is_minted) {
            logger.info('Jennie NFT Null. Skip account... \n')
            return false;
        }

        const key = new MnemonicKey({
            mnemonic, 
            account: 0, 
            index: 0, 
            coinType: 118, 
        })
        const wallet = new Wallet(lcd, key)

       let countToken = bcs.u64().serialize(2200000).toBase64()
        
        const msgs = [
            new MsgExecute(
            address,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',
            'jennie',
            'draw_food',
            [],["AQ=="])]

            const signedTx = await wallet.createAndSignTx({ msgs });
            let broadcastResult = await lcd.tx.broadcastSync(signedTx).then(res => {
                if(res.code === 400) {
                    throw res.raw_log
                }
                logger.info(`Успешый купил Common ХАВЧИК: https://scan.testnet.initia.xyz/initiation-1/txs/${res.txhash}`)
            })
            


    } catch (error) {
        logger.error(`Error JennieBuyEat ${error}`) //_redirectable
        await random_MinutesDelay(5, 20) 
        await JennieEat(mnemonic, address)
    }
}
await JennieBuyEat('hedgehog hour canoe wedding salmon crisp empower black actual napkin three nominee','init1rxn7n76q8g4lsg8yseun64vh60ke960jts2jvt')
