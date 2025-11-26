module.exports.config = {
 name: "hug",
 version: "7.3.1",
 hasPermssion: 0,
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "hug frame create",
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
 const dirMaterial = __dirname + `/cache/canvas/`;
 const path = resolve(__dirname, 'cache/canvas', 'hugv3.png');
 if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
 if (!existsSync(path)) await downloadFile("https://i.imgur.com/7lPqHjw.jpg", path);
};

async function circle(image) {
 const jimp = require("jimp");
 image = await jimp.read(image);
 image.circle();
 return await image.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
 const fs = global.nodemodule["fs-extra"];
 const path = global.nodemodule["path"];
 const axios = global.nodemodule["axios"];
 const jimp = global.nodemodule["jimp"];
 const __root = path.resolve(__dirname, "cache", "canvas");
 const bgPath = __root + "/hugv3.png";
 const pathImg = __root + `/hug_${one}_${two}.png`;
 const avatarOne = __root + `/avt_${one}.png`;
 const avatarTwo = __root + `/avt_${two}.png`;

 const getAvatar = async (id, path) => {
 const response = await axios.get(
 `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
 { responseType: 'arraybuffer' }
 );
 fs.writeFileSync(path, Buffer.from(response.data, 'utf-8'));
 };

 await getAvatar(one, avatarOne);
 await getAvatar(two, avatarTwo);

 const baseImg = await jimp.read(bgPath);
 const circleOne = await jimp.read(await circle(avatarOne));
 const circleTwo = await jimp.read(await circle(avatarTwo));

 baseImg.composite(circleOne.resize(220, 220), 200, 50);
 baseImg.composite(circleTwo.resize(220, 220), 490, 200);

 const raw = await baseImg.getBufferAsync("image/png");
 fs.writeFileSync(pathImg, raw);
 fs.unlinkSync(avatarOne);
 fs.unlinkSync(avatarTwo);
 return pathImg;
}

module.exports.run = async function ({ event, api, args }) {
 const fs = global.nodemodule["fs-extra"];
 const { threadID, messageID, senderID } = event;
 const mention = Object.keys(event.mentions);

 if (mention.length !== 1)
 return api.sendMessage("Please mention someone that uh want to hug🤧🤣", threadID, messageID);

 const captions = [
 "❝ If you ever feel anything, then know that my feelings for you are the best feeling in the world!🌻",
"❝ You are the best chapter of my life, the one I want to read again and again!💝",
"❝ I don’t know how to repay the value of your love, I only know that I will keep loving you💜 just the way I loved you from the beginning!🥰",
"❝ Before falling in love, I was already wrapped in your affection—an affection like a sweet addiction, one I can never get rid of even if I try!💝",
"❝ I wanted you, and I still want only you—you are my love🖤 you are the reason I live!💞",
"❝ I have no definition for loving you; continuing to love you is the silent feeling of my heart!❤️",
"❝ You are that story of my life where I discover something new every time I read it!💚",
"❝ Princess who lives deep inside my heart, I love you so much.❤️‍🩹",
"❝ I feel complete in my life, যখন ভাবি someone as precious as you is my life partner!🌺"
 ];

 try {
 const path = await makeImage({ one: senderID, two: mention[0] });
 const caption = captions[Math.floor(Math.random() * captions.length)];
 return api.sendMessage(
 {
 body: caption,
 attachment: fs.createReadStream(path)
 },
 threadID,
 () => fs.unlinkSync(path),
 messageID
 );
 } catch (e) {
 console.error(e);
 return api.sendMessage("❌ Failed to generate hug image.", threadID, messageID);
 }
};
