import {User} from '../model/User';
import {Priority} from '../model/Priority';
import {Task} from '../model/Task';

export class TestData {

    static users: User[] = [
        {id: 1, title: 'Абрахам Берцман'},
        {id: 2, title: 'Рафаэль Санти'},
        {id: 3, title: 'Джованни Бернини'},
        {id: 4, title: 'Антуан-Жан Гро'},
        {id: 5, title: 'Теодор Герцль'},
        {id: 6, title: 'Микеланджело Буонарроти'},
        
    ];

    static priorities: Priority[] = [
        {id: 1, title: 'Низкий', color: '#e5e5e5'},
        {id: 2, title: 'Средний', color: '#85D1B2'},
        {id: 3, title: 'Высокий', color: '#F1828D'},
        {id: 4, title: 'Очень срочно!!', color: '#F1128D'}
    ];

    static tasks: Task[] = [
        {
            id: 1,
            title: 'Запилить приложение для резюме',
            priority: TestData.priorities[2],
            completed: false,
            user: TestData.users[9],
            date: new Date('2021-04-10')
        },
        {
            id: 2,
            title: 'Посчитать доходы своего банка',
            priority: TestData.priorities[0],
            completed: false,
            user: TestData.users[0],
            date: new Date('2021-04-11')
        },
        {
            id: 3,
            title: 'Высечь Аполлона',
            priority: TestData.priorities[2],
            completed: true,
            user: TestData.users[5]
        },
        {
            id: 4,
            title: 'Написать Сикстинскую Мадонну',
            priority: TestData.priorities[1],
            completed: false,
            user: TestData.users[1],
            date: new Date('2021-08-17')
        },
        {
            id: 5,
            title: 'Изваять Аввакума с ангелом ',
            completed: false,
            user: TestData.users[2],
            inactive: true
        },
        {
            id: 6,
            title: 'Сходить на семинар по программированию',
            priority: TestData.priorities[1],
            completed: true,
            date: new Date('2021-06-11')
        },
        {
            id: 7,
            title: 'Изобразить Наполеона на аркольском мосту',
            priority: TestData.priorities[2],
            completed: false,
            user: TestData.users[3],
        },
        {
            id: 8,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            completed: false,
            user: TestData.users[5],
            inactive: true,
            priority: TestData.priorities[3]
        },
        {
            id: 9,
            title: 'Основать сионизм',
            priority: TestData.priorities[2],
            completed: false,
            user: TestData.users[4],
            date: new Date('2021-03-12')
        },
        {
            id: 10,
            title: 'Пробежать 100 м',
            priority: TestData.priorities[0],
            completed: true,
            user: TestData.users[4]
        },

    ];

}

