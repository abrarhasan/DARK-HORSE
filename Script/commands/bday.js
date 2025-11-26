module.exports.config = {
 name: "bday",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "ABRAR ",
 description: "See admin's birthday",
 usePrefix: false,
 commandCategory: "bday",
 cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
 const axios = global.nodemodule["axios"];
 const fs = global.nodemodule["fs-extra"];
 const path = __dirname + "/cache/1.png";

 const targetDate = new Date("December 16, 2025 00:00:00");
 const now = new Date();

 const diffMs = targetDate - now;
 const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
 const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
 const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
 const diffSeconds = Math.floor((diffMs / 1000) % 60);

 if (diffDays === 1) {
 const tomorrowMessage =
`👉Tomorrow is myboss ABRAR HASAN's birthday!\n\n Dont forget to wish him with a gift...🥰😘
`;
 return api.sendMessage(tomorrowMessage, event.threadID, event.messageID);
 }

 if (diffDays === 0) {
 const happyBirthdayMessage = 
`╔═══ 🎉 𝐇𝐀𝐏𝐏𝐘 𝐁𝐈𝐑𝐓𝐇𝐃𝐀𝐘 🎉 ════╗
║ 𝐎𝐔𝐑 𝐁𝐎𝐒𝐒 - ABRAR HASAN 💖 
╟─────────────────
║ 🎂 Everyone Please Wish Him Today! 
║ 🥳 Its his birth day! 
║ ❤️ Wish him with a gift hehe! 
╟─────────────────
║ 📩 Connect With Him: 
║ ➤ 📘 Facebook : 
║ https://www.facebook.com/abrar.hasan.125760550
║ ➤ 💬 Messenger : 
║ https://m.me/abrar.hasan.125760550
║ ➤ 📱 WhatsApp : 
║.......................... 
╟─────────────────
║ 🫶 WISH, PRAY FOR HIM AND FOR EVERYONE?
║ THANKS IN ADVANCED! ❤️‍🩹 
╚═══════════════════════════╝`;
 return api.sendMessage(happyBirthdayMessage, event.threadID, event.messageID);
 }

 if (diffDays < 0) {
 const leakMessage =
`╔═══════════════════╗
║ 🎂 Admin ABRAR HASAN
║ His birthday has been revealed ❤️‍🩹🤌
╚═══════════════════╝`;
 return api.sendMessage(leakMessage, event.threadID, event.messageID);
 }

 const countdownMessage = 
`╔═══════════════════╗
║ 🎂 Admin ABRAR HASAN
║ His birthday has been revealed ❤️‍🩹�
║═══════════════════
║ 📅 Days : ${diffDays}
║ ⏰ Hours : ${diffHours}
║ 🕰️ Minutes : ${diffMinutes}
║ ⏳ Seconds : ${diffSeconds}
╚════════════════════╝`;

 const url = `https://graph.facebook.com/100065524890378/picture?height=720&width=720`;

 try {
 const response = await axios({
 url,
 method: "GET",
 responseType: "stream",
 });

 const writer = fs.createWriteStream(path);
 response.data.pipe(writer);

 writer.on("finish", () => {
 api.sendMessage(
 {
 body: countdownMessage,
 attachment: fs.createReadStream(path),
 },
 event.threadID,
 () => fs.unlinkSync(path)
 );
 });

 writer.on("error", () => {
 api.sendMessage("❌ Image download failed.", event.threadID, event.messageID);
 });
 } catch {
 api.sendMessage("❌ Error occurred while getting image.", event.threadID, event.messageID);
 }
};
