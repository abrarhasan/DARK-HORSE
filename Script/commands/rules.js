module.exports.config = {
 name: "rules",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "ABRAR",
 description: "Send group rules",
 commandCategory: "information",
 usages: "rules2",
 cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
 const message = `❐ Assalamu Alaikum, 🖤🌺
❐ There are some GROUP RULES. Many of you may not know them, so those who don’t know, please read carefully. ⬅️
<------------------------------------------------->
1. No nonsense or bad language is allowed! ⚠️
2. You cannot insult or abuse anyone! ⚠️
3. No unnecessary tagging or repeatedly mentioning everyone! 🚫
4. If anyone tries to send requests or inbox messages to girls, they will be removed immediately. ✅
5. Sharing obscene photos/videos/memes will result in a ban. ⚡
6. Spamming with your own YouTube/Page links will lead to a KICK. 🦵
7. You must respect the admins. 🛡️
8. No mocking any religion or community. ❌
9. Spreading fake news/rumors will result in report + block. 🚨
10. Only polite fun is allowed—no vulgarity. 😌
<------------------------------------------------->�
𝙱𝙾𝚃 𝙰𝙳𝙼𝙸𝙽: ABRAR HASAN
𝙵𝙱 𝙻𝙸𝙽𝙺: https://www.facebook.com/abrar.hasan.125760550
_THANKS FOR USING 🌺─꯭─⃝‌‌ABRAR 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭🌸_

💖...........LOVE UH ALL...........💖`;

 return api.sendMessage(message, event.threadID);
};
