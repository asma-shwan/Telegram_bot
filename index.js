const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const { Telegraf } = require('telegraf');
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'sql12.freesqldatabase.com',
        port: 3306,
        user: 'sql12674680',
        password: 'gEexpyHe2m',
        database: 'sql12674680'
    }
});



const token = '6593628238:AAFLhehn4qrtPc6i7piFaE9a_uyxgZNIZtI';
const bot2 = new Telegraf(token);
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const UserId = msg.from.id;
    const messageText = msg.text;
    if (messageText === '/start') {
        await knex('Users')
        .insert({Id:UserId})
        .then((data)=>{
          bot.sendMessage(UserId, 'Salam you are registered every 8Am , 5pm and 10pm you recieved Azkars dont forget pray to me , to end my bot please type /end command');  
        })
        .catch((err)=>{
            console.log(err)

        })
    }

  });

  bot.on('message', async (msg) => {
    const UserId = msg.from.id;
    const messageText = msg.text;
    if (messageText === '/end') {
        await knex('Users')
        .del()
        .where({Id:UserId})
        .then((data)=>{
          bot.sendMessage(UserId, 'may Allah bless You');  
        })
        .catch((err)=>{
            console.log(err)

        })
    }
  })

  cron.schedule('3 1 * * * ', () => {
     knex('Users')
    .select("Id")
    .then((users) => {
        users.forEach( user=>{
          fetchazkarsabah(user.Id)            
        })
    })
    .catch((err) => {
      console.error(err);
    }) 
  });
cron.schedule('57 17 * * * ', () => {
    knex('Users')
   .select("Id")
   .then((users) => {
       users.forEach( user=>{
        fetchazkarmassa(user.Id)            
       })
   })
   .catch((err) => {
     console.error(err);
   }) 
 });


async function fetchazkarsabah(id) {
  let azkars=""
    knex.select('*')
    .from('Azkar_sabah')
    .then((data)=>{
     for(let i=0;i<data.length;i++){
      azkars=`زکـــر: ${data[i].Azkars} \n دووبارەکردنەوە : ${data[i].repeat_azkars}`
      bot.sendMessage(id,azkars)
     }
    })
    .catch((err)=>{console.log(err)})
}
async function fetchazkarmassa(id) {
  let azkars=""
    knex.select('*')
    .from('Azkar_Massa')
    .then((data)=>{
     for(let i=0;i<data.length;i++){
      azkars=`زکـــر: ${data[i].Azkars} \n دووبارەکردنەوە : ${data[i].repeat_azkars}`
      bot.sendMessage(id,azkars)
     }
    })
    .catch((err)=>{console.log(err)})
}
