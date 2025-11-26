const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const jimp = require("jimp");

module.exports.config = {
 name: "hug2",
 version: "3.1.2",
 hasPermssion: 0,
 credits: "Abrar",
 description: "hug frame generat",
 commandCategory: "img",
 usages: "[@mention]",
 cooldowns: 5
};

module.exports.onLoad = async () => {
 const dir = path.join(__dirname, "cache", "canvas");
 const filePath = path.join(dir, "hugv2.png");
 if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
 if (!fs.existsSync(filePath)) {
 const imgURL = "https://i.ibb.co/zRdZJzG/1626342271-28-kartinkin-com-p-anime-obnimashki-v-posteli-anime-krasivo-30.jpg";
 const imgData = (await axios.get(imgURL, { responseType: "arraybuffer" })).data;
 fs.writeFileSync(filePath, Buffer.from(imgData));
 }
};

async function circle(imagePath) {
 const img = await jimp.read(imagePath);
 img.circle();
 return await img.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
 const dir = path.join(__dirname, "cache", "canvas");
 const bg = await jimp.read(path.join(dir, "hugv2.png"));
 const pathImg = path.join(dir, `hug2_${one}_${two}.png`);
 const avatarOnePath = path.join(dir, `avt_${one}.png`);
 const avatarTwoPath = path.join(dir, `avt_${two}.png`);

 const getAvatar = async (uid, filePath) => {
 const url = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;
 const avatarData = (await axios.get(url, { responseType: 'arraybuffer' })).data;
 fs.writeFileSync(filePath, Buffer.from(avatarData));
 };

 await getAvatar(one, avatarOnePath);
 await getAvatar(two, avatarTwoPath);

 const circleOne = await jimp.read(await circle(avatarOnePath));
 const circleTwo = await jimp.read(await circle(avatarTwoPath));

 bg.composite(circleOne.resize(100, 100), 370, 40)
 .composite(circleTwo.resize(100, 100), 330, 150);

 const finalBuffer = await bg.getBufferAsync("image/png");
 fs.writeFileSync(pathImg, finalBuffer);
 fs.unlinkSync(avatarOnePath);
 fs.unlinkSync(avatarTwoPath);

 return pathImg;
}

module.exports.run = async function ({ event, api }) {
 const { threadID, messageID, senderID, mentions } = event;
 const mention = Object.keys(mentions);
 if (!mention[0]) {
 return api.sendMessage("please mention 1 paeson!", threadID, messageID);
 }

 const one = senderID, two = mention[0];

 const captions = [
"If love is a feeling, then my feelings for you are the best feeling in the world!🌺",
"You are the best chapter of my life, the chapter I want to read again and again!😘",
"I don’t know how to repay the value of your love, I only know that I will keep loving you💜 just the way I loved you from the beginning!🫶",
"Before falling in love, I was already wrapped in your affection—an affection like an addiction, one I can never overcome even if I try!💞",
"I wanted you, and I still want only you. You are my love🖤 you are the reason I live!🥰",
"I have no definition for loving you; continuing to love you is my silent feeling!😍",
"You are that story of my life where I discover something new every time I read it!🌻",
"Princess who lives deep inside my heart, I love you so much.❤️‍🩹",
"I feel complete in my life, যখন ভাবি a precious person like you is my life partner!🌺",
"Never let go of someone whose thoughts match yours 🤗 such people don’t come into everyone’s life!😘",
"I can spend my whole life with just a little bit of your love!💜",
"It feels as if my whole world stops when you smile!😊",
"You’re not just a person; you are my feeling, my heart!🖤",
"You are my everything—my today, my tomorrow!❤️‍🔥",
"When I look into your eyes, I forget all my pain!😘"
 ];

 const caption = captions[Math.floor(Math.random() * captions.length)];

 try {
 const imagePath = await makeImage({ one, two });
 return api.sendMessage({
 body: caption,
 attachment: fs.createReadStream(imagePath)
 }, threadID, () => fs.unlinkSync(imagePath), messageID);
 } catch (e) {
 console.error(e);
 return api.sendMessage("❌ Something went wrong while generating the image!", threadID, messageID);
 }
};
