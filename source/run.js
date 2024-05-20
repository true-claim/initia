import {addUsers, getUsers, usersStatusWeeks} from '../module/prisma.js';
import {getBalance} from '../module/initiation-1.js';
import {balanceXP, mintNFT, jennieStat}  from '../module/request.js';
import {mintTaskNFT, allTasks, buildJennie} from '../source/week/week1_pashka.js';

import {random_MinutesDelay} from '../utils/random.js';
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

async function statsHP() {
    let users = await getUsers()
    for (let user of users) {
        await jennieStat(user.address)
    }
}

async function week01() {

    let users = await usersStatusWeeks('week_01', false) //получить всех у кого статус week01 false, или проверить
    //logger.info('Не прошли первую неделю: ', users.length, ' аккаунтов \n')
    
    await Promise.all(users.map(async (user) => {
        let logger = makeLogger(`${user.address.slice(0, 22)}`)
        logger.info('Аккаунт в работе \n')
        await random_MinutesDelay(2, 10)
        let stages = await mintNFT(user.address)
        let jennieStatus = stages.is_minted //@return false or true
        let tasks = stages.jennie_part_progresses //@return {}

        if(jennieStatus) {
            logger.info('Jennie NFT Done. Skip account... \n')
            return
        }

        for(let task of tasks) {
            if (task.is_approved && !task.is_minted) {
                logger.info('Таск ', task.task, ' выполнен, но еще нет NFT. \n')
                await mintTaskNFT(user.seed_phrase, user.address, task.task)
                logger.info('Таск ', task.task, ' выполнен полностью. \n')
                continue
            }

            if (!task.is_approved) {
                logger.info('Таск ', task.task, ' еще не выполнен. Делаю... \n')
                await allTasks(task.task, user.seed_phrase, user.address)
                await random_MinutesDelay(10, 15)
                await mintTaskNFT(user.seed_phrase, user.address, task.task)
                continue
            }
        }

        await random_MinutesDelay(0, 15)
        let stages2 = await mintNFT(user.address)
        let tasks2 = stages.jennie_part_progresses
        let Jenny = tasks2.every(task => task.is_minted);

        if(Jenny) {
            await random_MinutesDelay(5, 35)
            logger.info('Jennie NFT Minted... \n')
            await buildJennie(user.seed_phrase, user.address)
        }

        // for (let i = 1; i < 6; i++) {
        //     await allTasks(i, user.seed_phrase, user.address)
        // }
        // await random_MinutesDelay(20, 40)

        // for (let i = 1; i < 6; i++) {
        //     await mintTaskNFT(user.seed_phrase, user.address, i)
        // }

    }))
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
        case 'feed':
            await statsHP()
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
