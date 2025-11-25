const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
 name: "owner2",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "Shahadat SAHU",
 description: "Display bot owner's information",
 commandCategory: "Info",
 usages: "",
 cooldowns: 5,
 dependencies: {
 request: "",
 "fs-extra": "",
 axios: ""
 }
};

module.exports.run = async function ({ api, event }) {
 const imageUrl = "https://graph.facebook.com/100065524890378/picture?height=720&width=720&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662";
 const path = __dirname + "/cache/owner.png";

 request(imageUrl)
 .pipe(fs.createWriteStream(path))
 .on("close", () => {
 api.sendMessage({
 body:
`🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟

👑 𝗡𝗮𝗺𝗲: ABRAR HASAN😘
😻 𝗔𝗱𝗱𝗿𝗲𝘀𝘀: I wont tell uh🙈
💼 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻: Spending time with me😍

🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: I hacked his account😁
💬 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿: Only im allowed in his messenger😌
📺 𝗬𝗼𝘂𝗧𝘂𝗯𝗲: Nai nai😺
📸 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: I dont know 🥺
📱 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽: Mom will scold me, if i give 🤣
🎵 𝗧𝗶𝗸𝗧𝗼𝗸: Sorry, he is not Chapri🥱
👻 𝗦𝗻𝗮𝗽𝗰𝗵𝗮𝘁: He does not have.

🤖 𝗕𝗢𝗧 𝗕𝗬: ─꯭─⃝‌‌ABRAR 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭
`,
 attachment: fs.createReadStream(path)
 }, event.threadID, () => fs.unlinkSync(path));
 });
};
