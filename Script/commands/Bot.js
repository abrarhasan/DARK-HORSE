module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermission: 0,
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  description: "Random fun reply when someone says Bot",
  commandCategory: "Fun",
  usages: "[Bot]",
  cooldowns: 2,
};

const botReplies = ["Say, baby 💬","Hmm? Say 😺","Yes darling 😚","I am listening baby 😘","Do not call me so much,I might fall in love 🙈","Say boss, boss 😼","If you call me, I will kiss you 😘","Go away, you have no work, you just bot bot all the time 😉😋🤣","Will you cause trouble 😒😬","come to the corner baby🙈😘","-Gayes-🤗-swore on youth and blackmailed me-🥲🤦‍♂️🤧","In my story, your grandpa is the best 🙊🙆‍♂️","Dont bot bot 😑","Instead of calling so much, mix weed with puffed rice, eat it and die","A beautiful girl means-🥱my boss Abrar°s wife-😽🫶and the rest are my sisters-in-law 🙈🐸","-I LOVE YOU-😽-aww you think I m proposing-🥴-I will slap you and lock your kidney-😒-I will beat the wrong thoughts out-🤭🐸","I m in the group for nothing-🥺🐸-no one knocks in inbox and says darling I love you-🥺🤧","From today I will not care for anyone-!😏-because I bought fairness cream-!🙂🐸","Go away, you have no work at all, you just bot bot 😉😋🤣","If you gave permission, I would have called on YouTube..!😒","I see only uncles and aunties in the group 🤦🏼🍼","Listening to heartbreak songs with a friend-🤧-now I also miss ex of my friend  a lot-🤕","A man is hurt the most by the woman he admires...!🥺💔","I will meet you again-😌-in the corner of some unknown alley..!😛🤣","Hey🫵 you guys are in love..😐🐸•get me one too-🥺","Dear-🥺-if I do not get you-😪-I will be forced-😼-to flirt with someone else-😑🤧","Can you not see I am busy with boss Abrar😒","If you are a girl give my boss Abrar an Ummmmha 😒","Your crush pees in bed..!🙃🥴","You keep disturbing 😾, I am busy with boss 😋","I do not talk to poor people 😼","Hey buffalo why do you call so much 🐸, does the devil hit you??"
 ];

module.exports.run = async function ({ api, event }) {
  const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
  api.sendMessage(reply, event.threadID, event.messageID);
};
