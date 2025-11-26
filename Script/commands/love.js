module.exports.config = {
 name: "love",
 version: "7.3.1",
 hasPermssion: 0,
 credits: "—͟͟͞͞abrar",
 description: "Get Pair From Mention",
 commandCategory: "img",
 usages: "[@mention]",
 cooldowns: 5,
 dependencies: {
 "axios": "",
 "fs-extra": "",
 "path": "",
 "jimp": ""
 }
};

module.exports.onLoad = async() => {
 const { resolve } = global.nodemodule["path"];
 const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
 const { downloadFile } = global.utils;
 const dirMaterial = __dirname + '/cache/canvas/';
 const path = resolve(__dirname, 'cache/canvas', 'arr2.png');
 if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
 if (!existsSync(path)) await downloadFile("https://i.imgur.com/iaOiAXe.jpeg", path);
}

async function makeImage({ one, two }) {
 const fs = global.nodemodule["fs-extra"];
 const path = global.nodemodule["path"];
 const axios = global.nodemodule["axios"];
 const jimp = global.nodemodule["jimp"];
 const __root = path.resolve(__dirname, "cache", "canvas");

 let batgiam_img = await jimp.read(__root + "/arr2.png"); 
 let pathImg = __root + `/batman${one}_${two}.png`; 
 let avatarOne = __root + `/avt_${one}.png`; 
 let avatarTwo = __root + `/avt_${two}.png`; 
 
 let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data; 
 fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8')); 
 
 let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data; 
 fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8')); 
 
 let circleOne = await jimp.read(await circle(avatarOne)); 
 let circleTwo = await jimp.read(await circle(avatarTwo)); 
 batgiam_img.composite(circleOne.resize(200, 200), 70, 110).composite(circleTwo.resize(200, 200), 465, 110); 
 
 let raw = await batgiam_img.getBufferAsync("image/png"); 
 
 fs.writeFileSync(pathImg, raw); 
 fs.unlinkSync(avatarOne); 
 fs.unlinkSync(avatarTwo); 
 
 return pathImg;
}

async function circle(image) {
 const jimp = require("jimp");
 image = await jimp.read(image);
 image.circle();
 return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args }) {
 const fs = global.nodemodule["fs-extra"];
 const { threadID, messageID, senderID } = event;
 const mention = Object.keys(event.mentions);
 
 
 const captions = [
 "💖 ⎯͢⎯⃝🩷😽 You are the metaphor of innocence in my eyes ⎯͢⎯⃝🩷🐰🍒",
"💖 🥺❤️ Dear.....! 😊\nSometimes you make me cry, sometimes you make me smile,\nAnd sometimes you give such love,\nThat it feels like I find all the happiness of the world in you...! 💔❤️",
"Keeping contact even after separation is called affection ____💖 💗🌺",
"𝐏𝐞𝐨𝐩𝐥𝐞'𝐬 𝐦𝐞𝐦𝐨𝐫𝐢𝐞𝐬 𝐚𝐫𝐞 𝐦𝐨𝐫𝐞 𝐩𝐞𝐫𝐬𝐨𝐧𝐚𝐥 𝐭𝐡𝐚𝐧 𝐩𝐞𝐨𝐩𝐥𝐞'𝐬...\nMemories of people become closer than people themselves,\nPeople leave, but memories never do-!!",
"Wishes are wordless...!!\nThoughts appear every day..!\nThe colors of imagination may be deep,\nBut reality is unbearably harsh....!! 🌸💔",
"Love doesn’t just mean romance,\nIt means someone — whose smile starts your morning, and whose tears end your night!💖 💌🩵",
"The relationship that cannot be seen with eyes,\nYet stays deep in the heart — that is the truest form of love!💖 🌙🥺",
 "You may be far away,\nBut you are still the address of every feeling I have!💖 💞🕊️",
 "The one who understands the language of your eyes is the dearest person.\nBecause love is expressed not in words, but in glances!💖 🌸✨",
 "You are not just a person,\nYou are a sweet habit — one I cannot live without!💖 🐻🌈"
 ];
 
 
 const randomCaption = captions[Math.floor(Math.random() * captions.length)];

 if (!mention[0]) return api.sendMessage("Please mention 1 person.", threadID, messageID);
 else {
 const one = senderID, two = mention[0];
 return makeImage({ one, two }).then(path => api.sendMessage({ 
 body: randomCaption, 
 attachment: fs.createReadStream(path) 
 }, threadID, () => fs.unlinkSync(path), messageID));
 }
}
