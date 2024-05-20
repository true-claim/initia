import UserAgent from 'user-agents';

export async function userAgent() {
    // Генерация случайного User-Agent
    const userAgent = new UserAgent();
    let userRandom = userAgent.toString();
    return userRandom;
}
