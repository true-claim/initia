import { Wallet, LCDClient, MnemonicKey, MsgSend, MsgExecute, bcs, MsgDelegate, MsgWithdrawDelegatorReward } from '@initia/initia.js';
import { makeLogger } from '../../utils/logger.js';
import {createDomainName, random_MinutesDelay, random_SecondsDelay} from '../../utils/random.js';

const lcd = new LCDClient('https://lcd.initiation-1.initia.xyz/', {
    chainId: 'initiation-1',
    gasPrices: '0.40uinit', // default gas prices
    gasAdjustment: '3',  // default gas adjustment for fee estimation
})

async function randomProvide() {
    let providers = ['initvaloper1x7j4d9ccds889yxecuylp803d0h6lrfnv30k9y',
        'initvaloper1jdg7s6m49376p878u92j4c64nxpcvsev2shngz',
        'initvaloper1dntcr3jpuwdkx74s4tnw8a0gp2mugum7j37ppv',
        'initvaloper1kvzzw2x563nmau0agawx2m9teg536nk2fsez4z',
        'initvaloper18gtqadftw9pfqv6x2svwdqkfsw7hjptdj6xp0h',
        'initvaloper1u4kpmwn653h0kpwu43zywcfjxqvkqey0ndh7zq',
        'initvaloper1m07fvq8flvc3ltjlgk30nznfdjf4hx9nwcpdy9',
        'initvaloper15d79aryy92yjf4pz5cxfrmarf5ykz2d0gdcg5n',
        'initvaloper12ygz083ccaxl0y8870yukdg53tyql922pzlvss'
    ]
    return providers[Math.floor(Math.random() * providers.length)];
}

//console.log(bcs.address().serialize("init1mlfx4qe90wzv45k9rp9vyn0jh5h3wjqjtg2cfr").toBase64())

  //AAAAAAAAAAAAAAAA39JqgyV7hMrSxRhKwk3yvS8XSBI
//faucet
async function task0() {
    try {

    } catch (error) {

    }
}
//faucet

//usernames
async function task1(mnemonic, address) {
    let logger = makeLogger('Username Buy')
    await random_SecondsDelay(1, 600)
    try {
        const key = new MnemonicKey({
            mnemonic, 
            account: 0, 
            index: 0, 
            coinType: 118, 
        })
        const wallet = new Wallet(lcd, key)

        let randomName = await createDomainName()
        let nameCode = bcs
            .string() // type
            .serialize(randomName.toString()) // value 
            .toBase64()
            let type2 = '4IfhAQAAAAA='
        logger.info('Регистрирую домайн', randomName)

        const buyDomain = async () => {
            try {
                const sendMsg = new MsgExecute(
                    address,
                    '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
                    'usernames',
                    'register_domain',
                    [],
                    [nameCode, type2]
                );
                const signedTx = await wallet.createAndSignTx({ msgs: [sendMsg] });
                const broadcastResult = await lcd.tx.broadcast(signedTx).then((result) => {
                    if(result.code === 400) {
                    throw res.raw_log
                }
                    logger.info(`Successfully bought domain! ${result?.txhash}`);
                })
                
            } catch (error) {
                logger.error(`Failed to buy domain: ${error?.response?.data?.message}`, error?.response?.data?.code);
                await random_SecondsDelay(5, 120)
                await buyDomain();
            }
        };


        const setDomain = async () => {
            try {
                const setMsg = new MsgExecute(
                    address,
                    '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
                    'usernames',                                        
                    'set_name',                                 
                    [], [nameCode])
                const signedTxset = await wallet.createAndSignTx({msgs: [setMsg]})
                const broadcastResult2 = await lcd.tx.broadcast(signedTxset).then((result) => {
                    if(res.code === 400) throw res.raw_log
            
                logger.info(`Successfully set name!`);

                })
            } catch (error) {
                logger.error(`Failed to set name: ${error?.response?.data?.message}`, error?.response?.data?.code);
                await random_SecondsDelay(5, 120)
                await setDomain();
            }
        };
        await buyDomain();
        await random_SecondsDelay(300, 1200)
        await setDomain();


    } catch (error) {
        logger.error(`Error Username Buy: ${error}`, error?.response?.data?.code) 
        await random_SecondsDelay(5, 120)
        await task1(mnemonic, address)
    }
}

//swap
async function task2(mnemonic, address) {
    let logger = makeLogger('Swap')
            await random_SecondsDelay(300, 1200)

    try {
        const key = new MnemonicKey({
            mnemonic, 
            account: 0, 
            index: 0, 
            coinType: 118, 
        })
        const wallet = new Wallet(lcd, key)

        //Сколько токенов отправляем  (1 аргумент)
       let countToken = bcs.u64().serialize(2200000).toBase64()
        
        const msgs = [
            new MsgExecute(
            address,
            '0x1',
            'dex',
            'swap_script',
            [],["2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=",
                "jkczvavPfUr8PRTw3UbJv1L7D86eS5lsk54ZW4vIkdk=",
                countToken, // offer amount
                'Af4VDgAAAAAA', // min return amount
             ]
            )
        ]

            const signedTx = await wallet.createAndSignTx({ msgs });
            let broadcastResult = await lcd.tx.broadcastSync(signedTx).then(res => {
                if(res.code === 400) throw res.raw_log
                logger.info(`Успешый свапнул: https://scan.testnet.initia.xyz/initiation-1/txs/${res.txhash}`)
            })
            


    } catch (error) {
        logger.error(`Error Swap ${error?.response?.data?.message}`, error?.response?.data?.code) //_redirectable
        await random_SecondsDelay(5, 120)
        await task2(mnemonic, address)
    }
}

//stake
async function task3(mnemonic, address) {
            await random_SecondsDelay(300, 1200)

    let logger = makeLogger('Stake')
    try {
        const key = new MnemonicKey({
            mnemonic, // (optional) if null, generate a new Mnemonic key
            account: 0, // (optional) BIP44 account number. default = 0
            index: 0, // (optional) BIP44 index number. defualt = 0
            coinType: 118, // (optional) BIP44 coinType. default = 118
        })
        const wallet = new Wallet(lcd, key)

        


                const msgs = [new MsgDelegate(
                address, // delegator address
                'initvaloper1lprlgfdwaz0lyawv2muz29uypj42jcy5vumr2n',
                '100000uinit'
            )]




            const signedTx = await wallet.createAndSignTx({ msgs });
            let broadcastResult = await lcd.tx.broadcastSync(signedTx).then(res => {
                if(res.raw_log === 'failed to insert tx into auction index: pool reached max tx capacity') {
                    async function retryStake() {
                        await random_SecondsDelay(10, 30)
                        logger.info('Пул INIT заполнен. Жду...')
                        await task3(mnemonic, address)
                    }
                    retryStake()
                }
                if(res.code === 400) throw res.raw_log

                logger.info('Успешный стейкинг стейкинг: https://scan.testnet.initia.xyz/initiation-1/txs/' + res.txhash)
            });
            //Иногда then присылает такое 
            /* 
            {
                height: 0,
                txhash: 'FB6DADCB882368D4A571A9A82BF5611987572CCA83813A360D43CC291B023FAA',
                raw_log: 'failed to insert tx into auction index: pool reached max tx capacity',
                code: 1,
                codespace: 'undefined'
            }
            */

    } catch (error) {
        logger.error(`Error Stake ${error?.response?.data?.message}`, error?.response?.data?.code) //_redirectable
        await random_SecondsDelay(5, 120)
        await task3(mnemonic, address)
    }
}

//lp provide
async function task4(mnemonic, address) {
            await random_SecondsDelay(300, 1200)

    let logger = makeLogger('LP Provide')
    try {
        const key = new MnemonicKey({
            mnemonic, // (optional) if null, generate a new Mnemonic key
            account: 0, // (optional) BIP44 account number. default = 0
            index: 0, // (optional) BIP44 index number. defualt = 0
            coinType: 118, // (optional) BIP44 coinType. default = 118
        })
        const wallet = new Wallet(lcd, key)

                const msgs = [new MsgExecute(
                address, // delegator address
                '0x42cd8467b1c86e59bf319e5664a09b6b5840bb3fac64f5ce690b5041c530565a',
                'dex_utils',
                'single_asset_provide_stake',
                [],
                [
                "2/BsSK85hOxtmuipqn27C7HnhKqbjEpWga9mDPhVjX0=",
                "KYJNlS4DVJD651Z97qXxW1BKaPpzYQBjwWCrH6h91gk=",
                "QEIPAAAAAAA=",
                "AQnvDAAAAAAA",
                bcs.string().serialize(await randomProvide()).toBase64(), //OPERATOR ADRESS STRING
            ]
                 
            )]




            const signedTx = await wallet.createAndSignTx({ msgs });
            let broadcastResult = await lcd.tx.broadcastSync(signedTx).then((res) => {
                                    if(res.code === 400) throw res.raw_log

                logger.info(`Успешый lp provide: https://scan.testnet.initia.xyz/initiation-1/txs/${res.txhash}`)
            })
            

            

    } catch (error) {
        logger.error(`Error LP Provide ${error?.response?.data?.message}`, error?.response?.data?.code ) //_redirectable
        await random_SecondsDelay(5, 120)
        await task4(mnemonic, address)
    }
}



//claim reward stake
async function task5(mnemonic, address) {
            await random_SecondsDelay(600, 1200)

    let logger = makeLogger('Claim Stake Reward')
    await random_MinutesDelay(1, 2)
    try {
        const key = new MnemonicKey({
            mnemonic, // (optional) if null, generate a new Mnemonic key
            account: 0, // (optional) BIP44 account number. default = 0
            index: 0, // (optional) BIP44 index number. defualt = 0
            coinType: 118, // (optional) BIP44 coinType. default = 118
        })
        const wallet = new Wallet(lcd, key)

        const msgs = [new MsgWithdrawDelegatorReward(
        address, // delegator address
        'initvaloper1lprlgfdwaz0lyawv2muz29uypj42jcy5vumr2n' //validator adress
        )]

        const signedTx = await wallet.createAndSignTx({ msgs });
        let broadcastResult = await lcd.tx.broadcastSync(signedTx).then(res => {
                                if(res.code === 400) throw res.raw_log

            logger.info(`Успешый минт реварда: https://scan.testnet.initia.xyz/initiation-1/txs/${res.txhash}`)
        });
        

        

    } catch (error) {
        logger.error(`Error Claim Stake Reward ${error?.response?.data?.message}`) 
        await random_SecondsDelay(5, 120)
        await task5(mnemonic, address)
    }
}

async function allTasks(task, mnemonicm, address) {
    switch (task) {
        case 0:
            await task0(mnemonicm, address)
            break
        case 1:
            await task1(mnemonicm, address)
            break
        case 2:
            await task2(mnemonicm, address)
            break
        case 3:
            await task3(mnemonicm, address)
            break
        case 4:
            await task4(mnemonicm, address)
            break
        case 5:
            await task5(mnemonicm, address)
            break
        default:
            break
    }
}

async function mintTaskNFT(mnemonic, address, numberNFT) {
    let logger = makeLogger('mintTaskNFT')
    await random_SecondsDelay(600, 1500)
    try {
        const key = new MnemonicKey({
            mnemonic,
            account: 0,
            index: 0,
            coinType: 118,
        })
        const wallet = new Wallet(lcd, key)
            let id = numberNFT; //numberNFT
            let id_serealize = bcs
                .u8()
                .serialize(id)
                .toBase64()
        logger.info(`Минтим NFT за таск ${numberNFT}`)

        const sendMsg = new MsgExecute(
            address,
            '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',   
            'jennie',                                         
            'mint_part',                                 
            [],                                            
            [
                id_serealize
            ], 
        )
    
    const signedTx = await wallet.createAndSignTx({
        msgs: [sendMsg]
    })
    
    const broadcastResult = await lcd.tx.broadcast(signedTx).then(res => {
                          if(res.code === 400) throw res.raw_log

        logger.info(`Успешый минт NFT! https://scan.testnet.initia.xyz/initiation-1/txs/${res.txhash} \n`)  
    })
    
            

    } catch (error) {
        logger.error(`Error minttask NFT ${error?.response?.data?.message}`, error?.response?.data?.code)
        await random_SecondsDelay(600, 1200)
        await mintTaskNFT(mnemonic, address, numberNFT)
    }
}

async function buildJennie(mnemonic, address) {
        let logger = makeLogger('Jennie MINT')

    try {
        const key = new MnemonicKey({
            mnemonic, // (optional) if null, generate a new Mnemonic key
            account: 0, // (optional) BIP44 account number. default = 0
            index: 0, // (optional) BIP44 index number. defualt = 0
            coinType: 118, // (optional) BIP44 coinType. default = 118
        })
        const wallet = new Wallet(lcd, key)

        
    const sendMsg = new MsgExecute(
        address,
        '0x9065fda28f52bb14ade545411f02e8e07a9cb4ba',                               
        'jennie',                                     
        'mint_jennie',                            
        [],                                           
        [])
    
    const signedTx = await wallet.createAndSignTx({
        msgs: [sendMsg]
    })
    
    const broadcastResult = await lcd.tx.broadcast(signedTx).then(res => {
                         if(res.code === 400) throw res.raw_log

        logger.info(`Успешный минт Jennie! https://scan.testnet.initia.xyz/initiation-1/txs/${res.txhash} \n`)
    })
            

    } catch (error) {
        logger.error(`Error Jennie mint NFT: ${error?.response?.data?.message}`, error?.response?.data)
        await random_SecondsDelay(600, 1200)
        await mintTaskNFT(mnemonic, address)
    }
}


export {allTasks, mintTaskNFT, buildJennie}
