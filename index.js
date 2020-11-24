const BootBot = require('bootbot');
const config = require('config');

var port = process.env.PORT || config.get('PORT');

const bot = new BootBot({
  accessToken: config.get('ACCESS_TOKEN'),
  verifyToken: config.get('VERIFY_TOKEN'),
  appSecret: config.get('APP_SECRET')
});

let greetings = ['Dobrý deň', 'Zdravím', 'Ahoj', 'Pozdravujem', 'Serus', 'Nazdar', 'dobry den', 'zdravim', 'dobry vecer', 'Dobrý večer']
const buttons = [
  { type: 'postback', title: 'Áno', payload: 'YES' },
  { type: 'postback', title: 'Nie', payload: 'NO' }];


const welcome = (zaplata) => {
  zaplata.ask("Dobrý deň ! Vitajte na našej FB stránke. Prosím zadajte Váš email alebo telefónne číslo, aby sme Vás vedeli spätne kontaktovať : ", (payload, zaplata, data) => {
    zaplata.sendTypingIndicator(1500).then(() => zaplata.ask("Ďakujeme ! S čím Vám môžeme pomôcť ?", (payload, zaplata, data) => {
      zaplata.sendTypingIndicator(1500).then(() => zaplata.ask((zaplata) => {
        zaplata.sendButtonTemplate("Ďakujeme ! Želáte si poslať nejaké fotky alebo screeny závady ?", buttons);
      }, (payload, zaplata, data) => {
        const answer = payload.postback.payload;
        if(answer === "YES") zaplata.say("Pošlite nám teda fotky formou správy. Ďakujeme");
        if(answer === "NO") zaplata.say("Ďakujeme, čoskoro Vás budeme kontaktovať.");
      }))
    }))
  });
}

bot.hear(greetings, (payload, chat) => {
  chat.conversation((zaplata) => {
    zaplata.sendTypingIndicator(1500).then(() => welcome(zaplata))
  })
});


bot.start(port);