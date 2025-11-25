module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`Sorry icould not add ${name} back. Maybe that user blocked me🥺
\n──────꯭─⃝‌‌ABRAR 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭─────`, event.threadID)
   } else api.sendMessage(`Listen, ${name}, this group isa gang!
Uh cant leave without permission from the administrators!
Uh didnt take permission, And so I added uh back!\n\n....WELCOME BACK DEAR.... 
\n──────꯭─⃝‌‌ABRAR 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭─────`, event.threadID);
  })
 }
}
