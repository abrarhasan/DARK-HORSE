module.exports.config = {
 name: "married",
 version: "3.1.1",
 hasPermssion: 0,
 credits: "abrar",
 description: "married",
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

module.exports.onLoad = async () => {
 const { resolve } = global.nodemodule["path"];
 const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
 const { downloadFile } = global.utils;
 const dirMaterial = __dirname + "/cache/canvas/";
 const path = resolve(__dirname, 'cache/canvas', 'marriedv02.png');

 if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
 if (!existsSync(path)) await downloadFile("https://i.ibb.co/mc9KNm1/1619885987-21-pibig-info-p-anime-romantika-svadba-anime-krasivo-24.jpg", path);
};

async function makeImage({ one, two }) {
 const fs = global.nodemodule["fs-extra"];
 const path = global.nodemodule["path"];
 const axios = global.nodemodule["axios"];
 const jimp = global.nodemodule["jimp"];
 const __root = path.resolve(__dirname, "cache", "canvas");

 let batgiam_img = await jimp.read(__root + "/marriedv02.png");
 let pathImg = __root + `/married_${one}_${two}.png`;
 let avatarOne = __root + `/avt_${one}.png`;
 let avatarTwo = __root + `/avt_${two}.png`;

 let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
 fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

 let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
 fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

 let circleOne = await jimp.read(await circle(avatarOne));
 let circleTwo = await jimp.read(await circle(avatarTwo));
 batgiam_img.composite(circleOne.resize(100, 100), 55, 48)
 .composite(circleTwo.resize(100, 100), 190, 40);

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

 if (!mention[0]) {
 return api.sendMessage("Please mention 1 person.", threadID, messageID);
 } else {
 const one = senderID, two = mention[0];

 const captions = [
"💟ღــ💘 Your love is the greatest gift of my life. 💘ღــ💟",
"When I look into your eyes, I forget everything—because I feel like I have my whole world there! 💚❤️‍🩹💞",
"You are that story of my life, the story I never want to finish! 🥰😘🌻",
"I am so lucky person! To have someone loving like you as my life partner! ❤️‍🩹💞🌺",
"I feel complete in my life, যখন ভাবি someone as precious as you is my life partner! 💝",
"My beginning is you and my ending is you; if you are not there, our story ends right here! 🌺",
"I was, I am, and I will always be — only for you! 💞",
"❥💙══ღ══❥ The happiness of holding you in my arms cannot be bought with anything in this world, my beloved. ══ღ══❥💙❥",
"🌻•━ I love you so much, I want you so deeply… it feels like you're not even close to me! 🌻•━",
"🌼══ღ══❥ On the path of life, place your hand inside mine; if I stumble while walking, please hold me and keep me steady. 🌼══ღ══❥",
"💠✦💟✦💠 It feels like inside the softest part of my heart, there is a place where only you live. 💠✦💟✦💠",
"I don’t need happiness or peace in life, I just need you! 🌼"
 ];

 const caption = captions[Math.floor(Math.random() * captions.length)];

 return makeImage({ one, two }).then(path =>
 api.sendMessage(
 {
 body: caption,
 attachment: fs.createReadStream(path)
 },
 threadID,
 () => fs.unlinkSync(path),
 messageID
 )
 );
 }
};
