import { Logger } from 'tslog';
import { appendFileSync } from 'fs';

export function makeLogger(name) {
    const logger = new Logger({
        hideLogPositionForProduction: true,
        name: name,
        prettyLogTimeZone: 'GMT',
        prettyLogTemplate:
            '{{hh}}:{{MM}}:{{ss}}:{{mm}} {{logLevelName}}   {{name}}:  ',
        prettyLogStyles: {
            logLevelName: {
                '*': ['bold', 'black', 'bgWhiteBright', 'dim'],
                SILLY: ['bold', 'white'],
                TRACE: ['bold', 'whiteBright'],
                DEBUG: ['bold', 'whiteBright'],
                INFO: ['bold', 'green'],
                WARN: ['bold', 'yellow'],
                ERROR: ['bold', 'red'],
                FATAL: ['bold', 'redBright'],
            },
        },
    });

    logger.attachTransport((logObj) => {
        appendFileSync('./log.txt', JSON.stringify(logObj) + '\n');
    });

    return logger;
}
