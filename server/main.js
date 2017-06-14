import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (!Categories.findOne()) {
    Categories.insert({
      name: 'Электрика',
    });
    Categories.insert({
      name: 'Сантехника',
    });
    Categories.insert({
      name: 'Оргтехника',
    });
    Categories.insert({
      name: 'Бухгалтерия',
    });
  }
  // code to run on server at startup
  if (!Orders.findOne()) {
    Orders.insert({
      num: 1,
      createdAt: moment().add(-1, 'months'),
      description: 'Замените, пожалуйста, лампочку на 8 этаже',
      category: {
        id: Categories.findOne({name: 'Электрика'})._id,
        name: 'Электрика',
      },
    });

    Orders.insert({
      num: 2,
      createdAt: moment().add(-5, 'days'),
      description: 'На 5 этаже во всех кофейнях отключились холодильники. Уже второй день не работают. Еда тухнет и воняет',
      category: {
        id: Categories.findOne({name: 'Электрика'})._id,
        name: 'Электрика',
      },
    });

    Orders.insert({
      num: 3,
      createdAt: moment().add(-15, 'hours'),
      description: 'Подвал затопило нечистотами. Говорят, там где-то остался дядя Ваня. Он не успел выбраться. Мы пускаем ему кораблики с едой',
      category: {
        id: Categories.findOne({name: 'Сантехника'})._id,
        name: 'Сантехника',
      },
    });

    Orders.insert({
      num: 4,
      createdAt: moment().add(-1, 'hours'),
      description: 'Сломался принер. Кашляет чернилами прямо в лицо. Закрылась в чулане, пишу с телефона. Недеюсь он не услышит и я смогу остаться в живых. Спасите меня, пожалуйста!!!!!',
      category: {
        id: Categories.findOne({name: 'Оргтехника'})._id,
        name: 'Оргтехника',
      },
    });

    Orders.insert({
      num: 5,
      createdAt: new Date(),
      description: 'Необходима справка 2НДФЛ',
      category: {
        id: Categories.findOne({name: 'Бухгалтерия'})._id,
        name: 'Бухгалтерия',
      },
    });
    console.log('fixtures loaded in db');
  }
});
