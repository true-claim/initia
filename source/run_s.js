import {addUsers, getUsers, usersStatusWeeks} from '../module/prisma.js';
import {getBalance} from '../module/initiation-1.js';
import {balanceXP, mintNFT}  from '../module/request.js';
import {mintTaskNFT, allTasks, buildJennie} from '../source/week/week1_pashka.js';

import { entryPoint } from '../utils/menu.js';
import { makeLogger } from '../utils/logger.js';



async function balance() {
        let users = await getUsers()
        for (let user of users) {
            await getBalance(user.seed_phrase)
        }
}

async function xp() {
    let users = await getUsers()
    for (let user of users) {
        await balanceXP(user.address)
    }
}

async function week01() {
    let logger = makeLogger('week01')

    let users = await usersStatusWeeks('week_01', false) //получить всех у кого статус week01 false, или проверить
    logger.info('Не прошли первую неделю: ', users.length, ' аккаунтов \n')
    
    for (let user of users) {
        logger.info('Аккаунт ', user.address.slice(0, 22),' в работе')
        let stages = await mintNFT(user.address)

        let jennieStatus = stages.is_minted //@return false or true
        let tasks = stages.parts //@return {}

        if(jennieStatus) {
            logger.info('Jennie NFT Done. Skip account... \n')
            continue
        }

        for(let task of tasks) {
            if (task.is_finished && !task.is_minted) {
                logger.info('Таск ', task.task_id, ' выполнен, но еще нет NFT.')
                await mintTaskNFT(user.seed_phrase, user.address, task.task_id)
                logger.info('Таск ', task.task_id, ' выполнен полностью.')
                continue
            }

            if (!task.is_finished) {
                logger.info('Таск ', task.task_id, ' еще не выполнен. Делаю...')
                await allTasks(task.task_id, user.seed_phrase, user.address)
            }
        }

        let stages2 = await mintNFT(user.address)
        let tasks2 = stages.parts 
        let Jenny = tasks2.every(task => task.is_minted);
        if(Jenny) {
            logger.info('Jennie NFT Minted...')
            await buildJennie(user.seed_phrase, user.address)
        }
        
        
    }
}

async function EXAMPLE() {
    let users = await getUsers()
    for (let user of users) {
        await balanceXP(user.address)
    }
}




async function startMenu() {
    let mode = await entryPoint(); // ожидаем что вернет answers.choice (возвращает
    // только value)
    switch (mode) {
        case 'update':
            await addUsers()
            break;
        case 'balance':
            await balance()
            break;
        case 'xp':
            await xp()
            break;
        case 'farm':
            console.log('😄')
            break;
        case 'balance':
            console.log('😄')
            break;
        case 'feed':
            console.log('😄')
            break;
        case '01':
            await week01()
            break;
        // case '02':
        //     console.log('😄')
        //     break;
        // case '03':
        //     console.log('😄')
        //     break;
        // case '04':
        //     console.log('😄')
        //     break;
        // case '05':
        //     console.log('😄')
        //     break;
        // case '06':
        //     console.log('😄')
        //     break;
        // case '07':
        //     console.log('😄')
        //     break;
        // case '08':
        //     console.log('😄')
        //     break;
        // case '02':
        //     console.log('😄')
        //     break;
    }
}
startMenu();
