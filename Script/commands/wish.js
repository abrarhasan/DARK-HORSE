module.exports.config = {
 name: "wish",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "abrar",
 description: "Happy birthday wish for your friends",
 commandCategory: "M H BD",
 usages: "@tag",
 dependencies: {
 axios: "",
 "fs-extra": ""
 },
 cooldowns: 0
};

module.exports.wrapText = (ctx, text, maxWidth) => {
 return new Promise(resolve => {
 if (ctx.measureText(text).width < maxWidth) return resolve([text]);
 if (ctx.measureText("W").width > maxWidth) return resolve(null);

 const words = text.split(" ");
 const lines = [];
 let line = "";

 while (words.length > 0) {
 let split = false;
 while (ctx.measureText(words[0]).width >= maxWidth) {
 const word = words[0];
 words[0] = word.slice(0, -1);
 if (split) {
 words[1] = word.slice(-1) + words[1];
 } else {
 split = true;
 words.splice(1, 0, word.slice(-1));
 }
 }

 if (ctx.measureText(line + words[0]).width < maxWidth) {
 line += words.shift() + " ";
 } else {
 lines.push(line.trim());
 line = "";
 }

 if (words.length === 0) {
 lines.push(line.trim());
 }
 }
 return resolve(lines);
 });
};

module.exports.run = async function ({
 args,
 Users,
 Threads,
 api,
 event,
 Currencies
}) {
 const { loadImage, createCanvas } = require("canvas");
 const fs = require("fs-extra");
 const axios = require("axios");

 let bgPath = __dirname + "/cache/background.png";
 let avtPath = __dirname + "/cache/Avtmot.png";

 const targetID = Object.keys(event.mentions)[0] || event.senderID;
 const targetName = await Users.getNameUser(targetID);
 const wisherName = await Users.getNameUser(event.senderID);

 const bgURLs = ["https://i.postimg.cc/k4RS69d8/20230921-195836.png"];
 const bgURL = bgURLs[Math.floor(Math.random() * bgURLs.length)];

 let avtData = (await axios.get(
 `https://graph.facebook.com/${targetID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
 { responseType: "arraybuffer" }
 )).data;
 fs.writeFileSync(avtPath, Buffer.from(avtData, "utf-8"));

 let bgData = (await axios.get(bgURL, { responseType: "arraybuffer" })).data;
 fs.writeFileSync(bgPath, Buffer.from(bgData, "utf-8"));

 let bgImage = await loadImage(bgPath);
 let avtImage = await loadImage(avtPath);
 let canvas = createCanvas(bgImage.width, bgImage.height);
 let ctx = canvas.getContext("2d");

 ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
 ctx.font = "400 32px Arial";
 ctx.fillStyle = "#1878F3";
 ctx.textAlign = "start";

 const nameLines = await this.wrapText(ctx, targetName, 1160);
 ctx.fillText(nameLines.join("\n"), 120, 727);

 ctx.beginPath();
 ctx.drawImage(avtImage, 70, 270, 400, 400);

 const imageBuffer = canvas.toBuffer();
 fs.writeFileSync(bgPath, imageBuffer);
 fs.removeSync(avtPath);

 return api.sendMessage({
 body:
 "┏┓┏┓\n" +
 "┃┗┛ 𝒂𝒑𝒑𝒚_🎂🎆🎉\n" +
 "┃┏┓┃ 🄱🄸🅁🅃🄷🄳🄰🅈🎉🎆\n" +
 "┗┛┗┛ Birthday Wishes For You..💐💗\n" +
 "🥰 " + targetName + " 😘\n\n" +
 "_𝐇𝐚𝐩𝐩𝐲 𝐛𝐢𝐫𝐭𝐡𝐝𝐚𝐲 🎂_\n" +
 "Lots of best wishes, prayers, and love for you. ❤\n" +
 "I wish every moment of your life be filled with joy...\n" +
 "Happy birthday dear 🎂🎂🎂\n" +
 "🌷🌷\n\n" +
 "_𝐇𝐚𝐩𝐩𝐲 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲 𝐖𝐢𝐬𝐡𝐞𝐬 𝐟𝐨𝐫 𝐔😍_\n" +
 "𝐈 𝐰𝐢𝐬𝐡 𝐮 𝐦𝐚𝐧𝐲 𝐦𝐨𝐫𝐞 𝐡𝐚𝐩𝐩𝐲 𝐫𝐞𝐭𝐮𝐫𝐧𝐬 𝐨𝐟 𝐭𝐡𝐞 𝐝𝐚𝐲 💞\n\n" +
 "🖤I hope you stay like this all your life, and I wish you always stay well. \n" +
 "❤On your birthday, my only wish is that you become very happy in the future.❤\n" +
 "🫂𝐇𝐚𝐩𝐩𝐲 𝐁𝐢𝐫𝐭𝐡𝐝𝐚𝐲 DEAR ❤️‍🩹\n\n" +
 "𝐌𝐚𝐤𝐢𝐧𝐠 𝐭𝐡𝐢𝐬 𝐰𝐢𝐬𝐡:" + wisherName,
 attachment: fs.createReadStream(bgPath)
 }, event.threadID, () => fs.unlinkSync(bgPath), event.messageID);
};
