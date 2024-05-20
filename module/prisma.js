import { makeLogger } from '../utils/logger.js';
import {wallet_parser} from '../utils/parser.js';
import { userAgent } from '../utils/user-agent.js';

import { PrismaClient } from '@prisma/client'
import {getAddress} from './initiation-1.js';

let logger = makeLogger('prisma')
const prisma = new PrismaClient()

async function addUsers() {
    let users = await wallet_parser()
    let count = 0

    for (let user of users) {
        try {
            let address  
            await prisma.jennie.create({
                data: {
                    seed_phrase: user.seed,
                    discord_token: user.token,
                    userAgent: await userAgent(),
                    address: await getAddress(user.seed),
                    status: {
                        create: 
                        {
                            week_01: false,    
                            week_02: false,    
                            week_03: false,    
                            week_04: false,    
                            week_05: false,    
                            week_06: false,    
                            week_07: false,    
                            week_08: false,
                        }
                    }
                },
            })
            count++
        } catch (error) {
            if(error.code === 'P2002') {
                logger.warn('Account already exists', error.meta.target[0])
                logger.warn(`Skipping... ${user.seed.slice(0, 30)} \n`)
                continue;
            }
            logger.error('Error creating user', error)
            continue
        }
    
    }
    logger.info('Добавленно ' + count + ' аккаунтов из ' + users.length)
}

async function getUsers() {
    return await prisma.jennie.findMany()
}

async function usersStatusWeeks(week, statuses) {
    return await prisma.jennie.findMany({
        where: {
            status: {
                some: {
                    [week]: statuses
                }
                
            }
        }
    })
}


async function updateXP(address, xp) {
    try {
        const updateUser = await prisma.jennie.update({
            where: {
                address: address,
            },
            data: {
                xp: xp
            },
            })
    } catch (error) {
        console.log(error)
    }
}


export { addUsers, getUsers, updateXP, usersStatusWeeks }
