import inquirer from 'inquirer';
export const entryPoint = async () => {
    const questions = [
        {
            name: 'choice',
            type: 'list',
            message: 'Действие:',
            choices: [
                {
                    name: 'UPDATE WALLETS',
                    value: 'update',
                },
                {
                    name: 'Check Balance $INIT',
                    value: 'balance',
                },
                {
                    name: 'XP Check',
                    value: 'xp',
                },
                // {
                //     name: 'XP Farm',
                //     value: 'farm',
                // },
                {
                    name: 'Feed Jennie',
                    value: 'feed',
                },
                {
                    name: 'Week 01',
                    value: '01',
                },
                {
                    name: 'Week 02',
                    value: '02',
                },
                // {
                //     name: 'Week 03',
                //     value: '03',
                // },
                // {
                //     name: 'Week 04',
                //     value: '04',
                // },
                // {
                //     name: 'Week 05',
                //     value: '05',
                // },
                // {
                //     name: 'Week 06',
                //     value: '06',
                // },
                // {
                //     name: 'Week 07',
                //     value: '07',
                // },
                // {
                //     name: 'Week 08',
                //     value: '08',
                // },
            ],
            loop: false,
        },
    ];

    const answers = await inquirer.prompt(questions);
    return answers.choice;
};
