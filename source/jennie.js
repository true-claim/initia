import {balanceXP, jennieStat, mintNFT} from '../module/request.js'
import { Wallet, LCDClient, MnemonicKey, MsgSend, MsgExecute, bcs, MsgDelegate, MsgWithdrawDelegatorReward } from '@initia/initia.js';

import { makeLogger } from '../utils/logger.js';
import {random_MinutesDelay} from '../utils/random.js';

const lcd = new LCDClient('https://lcd.initiation-1.initia.xyz/', {
    chainId: 'initiation-1',
    gasPrices: '0.40uinit', // default gas prices
    gasAdjustment: '3',  // default gas adjustment for fee estimation
})

async function drawFood(mnemonic, address){

    let logger = makeLogger('drawFood')
    //await random_MinutesDelay(1, 5) 

    try {

        let Jennieeady = await mintNFT(address);
        console.log(Jennieeady)
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
        logger.error(`Error drawFood ${error}`) //_redirectable
        await random_MinutesDelay(5, 20) 
        await drawFood(mnemonic, address)
    }
}

async function feedJennie(mnemonic, address){

    let logger = makeLogger('feedJennie')
    await random_MinutesDelay(10, 20) 

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
            'feed_jennie',
            [],["AQ=="])]

            const signedTx = await wallet.createAndSignTx({ msgs });
            let broadcastResult = await lcd.tx.broadcastSync(signedTx).then(res => {
                if(res.code === 400) {
                    throw res.raw_log
                }
                logger.info(`Наелась и спит: https://scan.testnet.initia.xyz/initiation-1/txs/${res.txhash}`)
            })
            


    } catch (error) {
        logger.error(`Error feedJennie ${error}`) //_redirectable
        await random_MinutesDelay(5, 20) 
        await feedJennie(mnemonic, address)
    }
}

export {drawFood, feedJennie}
