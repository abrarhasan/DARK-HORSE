const moment = require("moment-timezone");

module.exports.config = {
  name: "caption",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "ABRAR",
  description: "random caption",
  commandCategory: "caption",
  usages: "caption",
  cooldowns: 5
};

const tl = [
  "Many have found new people in their lives, may they stay well and may my sudden death remain unknown to them🥹😭",
"The story was truly beautiful......! When you were a stranger🙂💔 and I was confined within my own self🙂🙂......!",
"You gave me sadness‚ not love‚‚!🌸 You made me cry perfectly and said dont cry anymore‚‚!!😅❤️‍🩹",
"When affection brings no benefit, you must learn to cut it off _-⎯⃝😅",
"There is no anger or complaint, may that person stay well𑁍❀☹️",
"Being fine has now become just the definition of a fake smile🙂💔",
"A smiling face hides thousands of pains 🥀🙂",
"When your value is gone, your presence will no longer matter to anyone🙂💔",
"The more affection you give, the more pain you receive 🖤",
"The fewer the expectations, the lesser the sorrow🙂",
"People only give words, not the promise to stay🙂💔",
"One day I will leave silently, no one will even notice🙂🥀",
"It is not love but habit that keeps people together🙂💔",
"The one you do everything for becomes the reason for pain someday🙂",
"Too much expectation always breaks🙂🥀",
"Tears never bring anyone back🙂💔",
"The less you speak, the less you get hurt🙂",
"One day all the resentment will fade away🙂🥀",
"The one you try to forget keeps coming back to your mind🙂💔",
"One day people change, but memories remain🙂",
"Excessive love returns as pain someday🙂🥀",
"False love is the most painful🙂💔",
"The more you expect, the more you break🙂",
"Behind every smile lies hidden pain🙂🥀",
"Stay well, even from afar🙂💔",
"When resentment piles up, love slowly fades🙂",
"The one you suffer for is the one who never understands🙂🥀",
"A relationship survives only without expectations🙂💔",
"The less the attachment, the lesser the sorrow🙂",
"After getting hurt repeatedly, one day I will become strong🙂🥀"
];
// নতুন ক্যাপশন যোগ করার নিয়ম:
// ক্যাপশন এড করতে চাইলে প্রথমে "+ক্যাপশন+"+, এভাবে ক্যাপশন এড করবেন!
// শেষ লাইনটি কখনো "+ক্যাপশন+" দিয়ে শেষ করবেন, নইলে ফাইলটি কাজ করবে না!

function getRandomCaption() {
  return tl[Math.floor(Math.random() * tl.length)];
}

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

 
  if (body.trim().toLowerCase() === module.exports.config.name) {
    const rand = getRandomCaption();
    return api.sendMessage({ body: rand }, threadID, messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;
  const rand = getRandomCaption();
  return api.sendMessage({ body: rand }, threadID, messageID);
};
