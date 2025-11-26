module.exports.config = {
 name: "birthday",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "Abrar",
 description: "মেনশন করলে শুভেচ্ছা জানাবে",
 commandCategory: "group",
 usages: "[@মেনশন]",
 cooldowns: 5,
 dependencies: {
 "fs-extra": "",
 "axios": ""
 }
};

module.exports.run = async function ({ api, event, args }) {
 try {
 if (Object.keys(event.mentions).length === 0) {
 return api.sendMessage("Please mention the one that uh want me to wish😘", event.threadID);
 }

 const mention = Object.keys(event.mentions)[0];
 const name = event.mentions[mention].replace("@", "");
 const arraytag = [{ id: mention, tag: name }];

 const sendMessage = (msg) => {
 api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);
 };

 
 sendMessage(`HAPPY BIRTHDAY ON BEHALFOF MY BOSS ABRAR HASAN, Dear @${name}!\n🎉HAPPY BIRTHDAY🎉`);
 const messages = [
 { delay: 3000, msg: `If you continue for one more year, you will achieve it.Stay healthy and stay well — this is my heartfelt wish for you again and again.🥰 Happy Birthday 🥰🥰 @${name}` },
 { delay: 6000, msg: `Wishing you a wonderful year filled with love, joy, and new achievements—.!\n🥰Happy Birthday😍 @${name}` },
 { delay: 10000, msg: `May your special day bring peace, happiness, and countless blessings that stay with you always—.!\n🌼Happy Birthday🌼 @${name}` },
 { delay: 14000, msg: `May every chapter of your life guide you toward success, wisdom, and brighter days.Happy Birthday @${name}` },
 { delay: 18000, msg: `Wishing you good health, inner peace, and the courage to follow your dreams fearlessly.\n❦~Happy Birthday~❦ @${name}` },
 { delay: 22000, msg: `May the coming year bring meaningful experiences, loving connections, and beautiful opportunities—\nশুভ জন্মদিন @${name}` },
 { delay: 26000, msg: `May your life be filled with positivity, strength, and moments that make your heart smile—, Happy Birthday☺️ @${name}` },
 { delay: 30000, msg: `DEAR @${name}!🎂\nWishing you a day where your heart finds peace, your soul feels loved, and your dreams begin to grow।Happy Birthday` },
 { delay: 34000, msg: `many many happy returns of the day 🥰😘\n Happy Birthday🎂 @${name}` },
 { delay: 38000, msg: `May this day remind you how special you are and how many wonderful things await you ahead— 🥰 \nHappy Birthday @${name}!` },
 { delay: 42000, msg: `May happiness surround you, success follow you, and every step bring you closer to your goals—. Happy Birthday🥰😘 @${name}` }
 ];

 messages.forEach(({delay, msg}) => {
 setTimeout(() => sendMessage(msg), delay);
 });

 } catch (error) {
 console.error(error);
 api.sendMessage("Something went wrong, I couldnot wish!\nPlease try again!", event.threadID);
 }
};
