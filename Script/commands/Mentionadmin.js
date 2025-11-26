module.exports.config = {
 name: "adminmention",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "Abrar ",
 description: "Bot will reply when someone tags any of the admins",
 commandCategory: "Other",
 usages: "@",
 cooldowns: 1
};

module.exports.handleEvent = function({ api, event }) {
 const adminIDs = ["100065524890378"].map(String);
 
 if (adminIDs.includes(String(event.senderID))) return;

 const mentionedIDs = event.mentions ? Object.keys(event.mentions).map(String) : [];
 const isMentioningBoss = adminIDs.some(adminID => mentionedIDs.includes(adminID));

 if (isMentioningBoss) {
 const replies = [
 "Boss is busy, temme😒😌",
 "Bosssssssssssss, a pagal is mentioning uh 😑🌚😁",
 "The way uh are mentioning boss as if he escaped with ur partner 🫥😒"
 ];
 return api.sendMessage(replies[Math.floor(Math.random() * replies.length)], event.threadID, event.messageID);
 }
};

module.exports.run = async function() {};
