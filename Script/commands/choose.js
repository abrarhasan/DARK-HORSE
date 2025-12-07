module.exports.config = {
	name: "choose",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
	description: "Thanks to the bot cho cho helped one of the things you need to do below",
	commandCategory: "Utilities",
	usages: "[Option 1] | [Option 2]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"return": "%1 𝐩𝐡𝐮̀ 𝐡𝐨̛̣𝐩 𝐯𝐨̛́𝐢 𝐛𝐚̣𝐧 𝐡𝐨̛𝐧, 𝐭𝐡𝐞𝐨 𝐛𝐨𝐭 𝐜𝐮𝐭𝐞 𝐧𝐠𝐡𝐢̃ 𝐥𝐚̀ 𝐯𝐚̣̂𝐲 𝐚́"
	},
	"en": {
		"return": "%1 is more suitable with you, I think so :thinking:"
	}
}

module.exports.run = async ({ api, event, args, getText }) => {
	const { threadID, messageID } = event;

	var input = args.join(" ").trim();
	if (!input) return global.utils.throwError(this.config.name, threadID, messageID);
	var array = input.split(" | ");
	return api.sendMessag
