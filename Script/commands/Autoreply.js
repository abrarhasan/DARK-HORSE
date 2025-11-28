const fs = global.nodemodule["fs-extra"];
const path = global.nodemodule["path"];

module.exports.config = {
  name: "autoreplybot",
  version: "6.0.2",
  hasPermssion: 0,
  credits: "Abrar",
  description: "Auto-response bot with specified triggers",
  commandCategory: "No Prefix",
  usages: "[any trigger]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return; 
  const name = await Users.getNameUser(senderID);
  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "Miss uh too baby😶👻😘",
    "kiss": "Dont kiss me, uh are having bad smell in ur mouth🤬",
    "👍": "Why only thumb, say something..!🐸🤣👍⛏️",
    "help": "Please type +helpall",
    "hi": "Hello DEAR..!😜🫵",
    "fuck": "SAME TO YOU😊",
    "pro": "Khud k0o KYa LeGend SmJhTi Hai 😂",
    "good morning": "GOOD MORNING too baby, brush ur teeth😚",
    "bot": "~ Yes hi dear, say say??😘☺️🤖",
    "abrar": "Boss is busy now, uh can tell me..!😘",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ABRAR HASAN☜\nFacebook: https://www.facebook.com/abrar.hasan.125760550",
    "admin": "He is ABRAR HASAN, He is known as worldwide trusthworthy GOODBOY😘☺️",
    "baby": "Hello babuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu, Mowaaaaaaaah😍.",
    "chup": "You chup chup, shut up🫵",
    "assalamualaikum": "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ💖",
    "shut": "Uh shut up, hate uhhhhhhh🫵",
    "kiss me": "Uh bad, i wont kiss uh🫵🤭",
    "thanks": "My pleasue dear.!🐸🥵",
    "i love you": "I love uh toooooooooo🫢😻",
    "bye": "Stay a little😔",
    "im abrar": "Yes Boss, how are uh..?☺️",
    "bot er baccha": "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "who are you": "MY NAME IS Mehrima─꯭─⃝‌‌ Im a robot created by ABRAR HASAN💖",
    "ok i stay": "Thanks babuuuuuuuu🥰",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚",
    "bal": "dont be mad baby 🥰",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "@varsha singh": "Dont disturb her..!🌚",
    "love you": "HOW MUCH DEAR?😘",
    "varsha": "She is busy, Tell me what do uh wannta say? Im her assistant.",
    "oi bot": "han shuna, Say say😘😽🙈",
    "@mehrimä Súltâñ Mehrîñ" : "Yes Baby, Hi hi, I'm here.😁😘",
    "good night everyone" : " Goodnight Dear! Have a good horror mix dream 🤪🤪.",
   "good evening" : "Good Evening too dear!, How was your day?",
    "good afternoon" : "Good Afternoon too dear! How's your days are going on?",
    "good morning" : "Good morning too 💖🥰, Have a nice day dear!"
  };

  if (responses[msg]) {
    return api.sendMessage(responses[msg], threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  return this.handleEvent({ api, event, Users });
};
