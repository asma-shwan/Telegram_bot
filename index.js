const TelegramBot = require('node-telegram-bot-api');
const { message } = require('statuses');
const keep_alive=require("./keep_alive")
var cron = require('node-cron');
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'sql12.freesqldatabase.com',
      port : 3306,
      user : 'sql12646778',
      password : 'Dq3iWNQWgw',
      database :'sql12646778'
    }
  });
// replace the value below with the Telegram token you receive from @BotFather
const token = '6593628238:AAFLhehn4qrtPc6i7piFaE9a_uyxgZNIZtI';


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

  });
  cron.schedule('0 8 * * * ', () => {
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
cron.schedule('0 17 * * * ', () => {
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
  try {
    const response = await fetch('https://ahegazy.github.io/muslimKit/json/azkar_sabah.json');
    const data = await response.json();
    var azkarSabah = " ";
    for (let i = 0; i < data.content.length; i++) {
      azkarSabah = `${data.content[i].zekr}\n(${data.content[i].repeat})\n${data.content[i].bless}`;
  bot.sendMessage(id,azkarSabah)
 }

    
  } catch (err) {
    console.error(err);
  }
}

async function fetchazkarmassa(id) {
  try {
    const response = await fetch('https://ahegazy.github.io/muslimKit/json/azkar_massa.json');
    const data = await response.json();
    var azkarSabah = " ";
    for (let i = 0; i < data.content.length; i++) {
      azkarSabah = `${data.content[i].zekr}\n(${data.content[i].repeat})\n${data.content[i].bless}`;
  bot.sendMessage(id,azkarSabah)
 }

    
  } catch (err) {
    console.error(err);
  }
}



// bot.sendMessage(6219330995, 'Hello, this is a message from your Telegram bot.');
