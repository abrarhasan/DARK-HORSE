module.exports.config = {
  name: "pending",
  version: "1.0.6",
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  hasPermssion: 2,
  description: "Manage bot's pending group requests",
  commandCategory: "system",
  cooldowns: 5
};

module.exports.languages = {
  "en": {
    "invaildNumber": "❌ %1 is not a valid number",
    "cancelSuccess": "✅ Successfully rejected %1 group(s)!",
    "notiBox1": "BOT HAS BEEN CONNECTED SUCCESSFULLY.!😘",
    "notiBox2": `╭•┄┅═══❁🌺❁═══┅┄•╮
     Hi, I'm Mehrima!😘❤️ I'm here to assist you and entertain you providing different kinds of entertaining and beneficial features that you might enjoy a lot 🎉🥳
╰•┄┅═══❁🌺❁═══┅┄•╯
𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐬𝐨 𝐦𝐮𝐜𝐡 𝐟𝐨𝐫 𝐚𝐝𝐝𝐢𝐧𝐠 𝐦𝐞 𝐭𝐨 the-𝐠𝐫𝐨𝐮𝐩-🖤🤗\n\n☄️𝘽𝙊𝙏𝙉𝘼𝙈𝙀☄️ »» ABRAR-BOT💀\n🌸𝙋𝙍𝙀𝙁𝙄𝙓🌸  »» + «« \n🎉 Usage: +command\n💘To see available commands: +help (page number). Example: +help 2, +help 3, +help 16 etc
\n𝐓𝐨 𝐯𝐢𝐞𝐰 𝐚𝐧𝐲 𝐜𝐨𝐦𝐦𝐚𝐧𝐝:
${botPrefix}Help
${botPrefix}Info
${botPrefix}Admin
\n ★ For any help:★
\n\n┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞      : ABRAR HASANッ
┃ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫    : 𝐌𝐚𝐥𝐞
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : SINGLE 
┃ 🎂 𝐀𝐠𝐞       : 22
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : 𝐈𝐬𝐥𝐚𝐦
┃ 🏫 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : ..........
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬  : 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎭 Instagram  : abrar.hasan.125760 
┃ 📢 Messenger : https://m.me/abrar.hasan.125760550
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : https://www.facebook.com/abrar.hasan.125760550
┣━━━━━━━━━━━━━━━━━━━━━┫ 
❖⋆═══════════════════════⋆❖
          𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 ➢ ABRAR HASAN`,
    "approveSuccess": "✅ Successfully approved %1 group(s)!",
    "cantGetPendingList": "❌ Failed to retrieve pending list!",
    "returnListPending": "📝 𝗣𝗘𝗡𝗗𝗜𝗡𝗚 𝗟𝗜𝗦𝗧\n\nTotal groups awaiting approval: %1\n\n%2\n\nReply with the number(s) to approve or 'c' followed by number(s) to reject (e.g., 1 2 3 or c1 c2)",
    "returnListClean": "✅ There are no pending groups at the moment."
  }
};

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
  if (String(event.senderID) !== String(handleReply.author)) return;
  
  const { body, threadID, messageID } = event;
  let count = 0;

  
  if ((isNaN(body) && body.toLowerCase().startsWith("c")) || body.toLowerCase().startsWith("cancel")) {
    const indexes = body.match(/\d+/g) || [];
    
    for (const num of indexes) {
      const index = parseInt(num);
      if (isNaN(index) || index <= 0 || index > handleReply.pending.length) {
        return api.sendMessage(getText("invaildNumber", num), threadID, messageID);
      }
      
      try {
        await api.removeUserFromGroup(api.getCurrentUserID(), handleReply.pending[index - 1].threadID);
        count++;
      } catch (e) {
        console.error("Error rejecting group:", e);
      }
    }
    return api.sendMessage(getText("cancelSuccess", count), threadID, messageID);
  } 
  
  else {
    const indexes = body.match(/\d+/g) || [];
    
    for (const num of indexes) {
      const index = parseInt(num);
      if (isNaN(index) || index <= 0 || index > handleReply.pending.length) {
        return api.sendMessage(getText("invaildNumber", num), threadID, messageID);
      }
      
      try {
        const groupID = handleReply.pending[index - 1].threadID;
        await api.sendMessage(getText("notiBox1"), groupID);
        await api.sendMessage(getText("notiBox2"), groupID);
        count++;
      } catch (e) {
        console.error("Error approving group:", e);
      }
    }
    return api.sendMessage(getText("approveSuccess", count), threadID, messageID);
  }
};

module.exports.run = async function({ api, event, getText }) {
  const { threadID, messageID } = event;
  
  try {
    const [spam, pending] = await Promise.all([
      api.getThreadList(100, null, ["OTHER"]),
      api.getThreadList(100, null, ["PENDING"])
    ]);
    
    const list = [...(spam || []), ...(pending || [])]
      .filter(group => group.isSubscribed && group.isGroup);
    
    if (list.length === 0) {
      return api.sendMessage(getText("returnListClean"), threadID, messageID);
    }
    
    const msg = list.map((group, index) => 
      `${index + 1}. ${group.name || 'Unnamed Group'} (ID: ${group.threadID})`
    ).join('\n');
    
    return api.sendMessage(
      getText("returnListPending", list.length, msg), 
      threadID,
      (error, info) => {
        if (!error) {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
          });
        }
      },
      messageID
    );
  } catch (e) {
    console.error(e);
    return api.sendMessage(getText("cantGetPendingList"), threadID, messageID);
  }
};
