const fs = require("fs");
module.exports.config = {
	name: "gali",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️", 
	description: "no prefix",
	commandCategory: "no prefix",
	usages: "abal",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("stupid abrar")==0 || event.body.indexOf("stupid")==0 || event.body.indexOf("chod")==0 || event.body.indexOf("fuck")==0 || event.body.indexOf("bc")==0 || event.body.indexOf("fuck you")==0 || event.body.indexOf("fuck u")==0 || event.body.indexOf("fuck off")==0 || event.body.indexOf("fuck uh")==0 || event.body.indexOf("fuck your boss")==0 || event.body.indexOf("go to hell")==0 || event.body.indexOf("madarchod")==0) {
		var msg = {
				body: "Stupid, Thanks for revealing ur family background🤣🥱😈",
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
