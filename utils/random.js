import { faker } from '@faker-js/faker';
import delay from 'delay';
import { makeLogger } from './logger.js';

let logger = makeLogger('random')
async function createDomainName() {
    let userName = faker.number.int({min: 10000000, max: 999999999999});
    return userName
  }

async function random_MinutesDelay(min, max) {
    let random_min = faker.number.int({min, max})
    let minInMs = random_min * 60000
    logger.info(`Sleeping for ${random_min} min.`)
    const result = await delay(minInMs);
    logger.info(`Ended sleeping ${random_min} min`)

} 

async function random_SecondsDelay(min, max) {
    let random_sec = faker.number.int({min, max})
    let minInSec = random_sec * 1000
    logger.info(`Sleeping for ${random_sec} sec.`)
    const result = await delay(minInSec);
    logger.info(`Ended sleeping ${random_sec} sec`)

} 

export { createDomainName, random_MinutesDelay, random_SecondsDelay }
