import axios from 'axios';

import { LCDClient, bcs } from '@initia/initia.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie'
import {updateXP} from './prisma.js';

import { makeLogger } from '../utils/logger.js';
import { getProxy } from '../utils/proxy.js';
import { PROXY, COOKIE, MOBILE_PROXY } from '../data/config.js';
import {userAgent} from '../utils/user-agent.js';


async function anonPost(url, data, headers) {
        let logger = makeLogger(`POST:`);
        let agent = await userAgent();
        let proxyAgent = new HttpsProxyAgent(`http://${MOBILE_PROXY}`);
        
        let client = axios.create({});
        //let jar = new CookieJar();
        //let client = COOKIE ? wrapper(axios.create({ jar: this.jar })) : axios.create({});
        try {
            let proxyConfig;
            if (PROXY) {
                proxyConfig = { httpsAgent: proxyAgent };
            }

            let request = await client.post(url, data, {
                headers: {
                    'User-Agent': agent,
                    ...headers,
                },
                ...proxyConfig,
            });
            //console.log(request)
            return request;
        } catch (error) {
            throw error;
        }
    }

//АНОНИМИЗИРОВАТЬ ЗАПРОСЫ

async function balanceXP(address) {
    let logger = makeLogger('XP')
    try {
        let request = await anonPost('https://b545809c-5562-4e60-b5a1-22e83df57748.initiation-1.mesa-rest.ue1-prod.newmetric.xyz/initia/move/v1/accounts/0x9065fda28f52bb14ade545411f02e8e07a9cb4ba/modules/initia_xp/view_functions/get_xp_amount', {
            args: [
                bcs.address().serialize(address).toBase64()
            ]
        }, {})

        let balance = JSON.parse(request.data.data)
        logger.info(balance, ` — (account ${address.slice(4, 24)})`)
        //await updateXP(address, balance)
    } catch (error) {
        logger.error(error)
        logger.error('Error Step: checking balance...')
        return;
    }
}

async function mintNFT(address) {
    let logger = makeLogger('mintNFT')
    try {

        let request = await anonPost('https://b545809c-5562-4e60-b5a1-22e83df57748.initiation-1.mesa-rest.ue1-prod.newmetric.xyz/initia/move/v1/accounts/0x9065fda28f52bb14ade545411f02e8e07a9cb4ba/modules/jennie/view_functions/get_jennie_mint_progress', {
            args: [
                bcs.address().serialize(address).toBase64()
            ]
        }, {})
        return JSON.parse(request.data.data)
    } catch (error) {
        logger.error(error.response)
        logger.error('Error Step: mintNFT...')
    }
}

async function jennieStat(address) {
    let logger = makeLogger('Jennie Stat')
    try {

        let request = await anonPost('https://b545809c-5562-4e60-b5a1-22e83df57748.initiation-1.mesa-rest.ue1-prod.newmetric.xyz/initia/move/v1/accounts/0x9065fda28f52bb14ade545411f02e8e07a9cb4ba/modules/jennie/view_functions/get_jennie_state', {
            args: [
                bcs.address().serialize(address).toBase64()
            ]
        }, {})

        let responseJson = JSON.parse(request.data.data)
        logger.info('Jennie HP => ', responseJson.hp, "HP")
    } catch (error) {
        if(error?.response?.data?.code === 3) {
            logger.warn('Jennie mint? => ', false)
            return
        }
        logger.error('Jennie Stat...', error) 
    }
}



export {balanceXP, mintNFT, jennieStat}
