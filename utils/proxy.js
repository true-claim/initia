import fs from 'fs';
let proxyIndexGlobal = 0;

export async function getProxy() {
    const proxyFile = fs
        .readFileSync('data/proxy.txt', 'utf8')
        .split('\n')
        .filter((key) => key !== '');
    //филтер убирает пустые строки

    proxyIndexGlobal = proxyIndexGlobal % proxyFile.length;
    const proxy = proxyFile[proxyIndexGlobal];
    proxyIndexGlobal++;
    //для каждого нового вызова функции одается 1 прокси по порядку
    //если прокси вего 1шт то используется всегда он
    return proxy;
}
