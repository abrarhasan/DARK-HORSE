const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Show Owner Info with styled box & random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  
  const info = `
╔═════════════════════ ✿
║ ✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨
╠═════════════════════ ✿
║ 👑 𝗡𝗮𝗺𝗲 : ABRAR HASAN 
║ 🧸 𝗡𝗶𝗰𝗸 𝗡𝗮𝗺𝗲 : GOODBOY🫣
║ 🎂 𝗔𝗴𝗲 : 22
║ 💘 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 : 𝗦𝗶𝗻𝗴𝗹𝗲
║ 🎓 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻 : 𝗦𝘁𝘂𝗱𝗲𝗻𝘁
║ 📚 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 : .......
║ 🏡 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡
╠═════════════════════ ✿
║ 🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
╠═════════════════════ ✿
║ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 :
║ https://www.facebook.com/abrar.hasan.125760550
║ 💬 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 :
║ https://m.me/abrar.hasan.125760550
║ 📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 :
║ ...........
║ ✈️ Instagram : 
║ abrar.hasan.125760
╚═════════════════════ ✿
`;

  const images = [
   "https://i.imgur.com/Lf028tD.jpeg","https://i.imgur.com/mAifBNb.jpeg","https://i.imgur.com/L5fGnYX.jpeg","https://i.imgur.com/CdzNRud.jpeg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/owner.jpg")
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(__dirname + "/cache/owner.jpg"))
    .on("close", () => callback());
};
