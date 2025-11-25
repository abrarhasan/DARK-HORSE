const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
    name: 'autosent',
    version: '10.0.1',
    hasPermssion: 0,
    credits: 'Shahadat Islam',
    description: 'Automatically sends messages at scheduled times (BD Time)',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

const messages = [
    { time: '12:00 AM', message: 'Its 12:00 AM BD time.⏳\nYou are late,sleep Bby sleep Good Night 😴💤❤️', special: null },
    { time: '1:00 AM', message: 'Its 1:00 AM  BD time⏳\nOi, why didnt uh sleep yet? sleep fast fast!😾😴🛌', special: null },
    { time: '2:00 AM', message: 'Its 2:00 AM  BD time⏳\nsleeeeeeep sleeeeep! why are uh still awake?😤👊💤', special: null },
    { time: '3:00 AM', message: 'Its 3:00 AM  BD time⏳\nHope All are sleeeping now🌃🛌', special: null },
    { time: '4:00 AM', message: 'Its 4:00 AM  BD time⏳\nIts about to announce ajaan 🕌🕋🕓', special: null },
    { time: '5:00 AM', message: 'Its 5:00 AM  BD time⏳\nMuslim brothers and sisters, Pray ur fazr.~ 🕌✨🤲💖', special: null },
    { time: '6:00 AM', message: 'Its6:00 AM  BD time⏳\n Good Morning Dearies!🌅💖😳', special: null },
    { time: '7:00 AM', message: 'Its 7:00 AM  BD time⏳\nWake up oi! brush ur teeth🛌➡️📱', special: null },
    { time: '8:00 AM', message: 'Its 8:00 AM  BD time⏳\nHave ur braekfast!📱🪥🍽️', special: null },
    { time: '9:00 AM', message: 'Its 9:00 AM  BD time⏳\nBby, Have uh have ur Breakfast?🍳🥞💖', special: null },
    { time: '10:00 AM', message: 'Its 10:00 AM  BD time⏳\nOi, why did not uh go to class 😜📚🙄', special: null },
    { time: '11:00 AM', message: 'Its 11:00 AM  BD time⏳\nAnyone alive here?!🙄📱💼', special: null },
    { time: '12:00 PM', message: 'Its 12:00 PM  BD time⏳\nGood Noon! 🌞🙌🌸', special: null },
    { time: '1:00 PM', message: 'Its 1:00 PM  BD time⏳\nPray ur Zohr salat😻❣️🥰', special: null },
    { time: '2:00 PM', message: 'Its 2:00 PM  BD time⏳\ntake a bath and have ur Lunch🔪🛁🍽️', special: null },
    { time: '3:00 PM', message: 'Its 3:00 PM  BD time⏳\nJan, withou uh I cant sleep in the afternoon….!😴💔🌙', special: null },
    { time: '4:00 PM', message: 'Its 4:00 PM  BD time⏳\nHows the weather in ur place 🥵🌞💦', special: null },
    { time: '5:00 PM', message: 'Its 5:00 PM  BD time⏳\nKeep smilling always! 😅🕒🙂', special: null },
    { time: '6:00 PM', message: 'Its 6:00 PM  BD time⏳\nGood Evening Everyone! 🌆👐💦', special: null },
    { time: '7:00 PM', message: 'Its 7:00 PM  BD time⏳\n Focus on ur study?😏📚🤔', special: null },
    { time: '8:00 PM', message: 'Its 8:00 PM  BD time⏳\nWhat are uh doing...!🫰😎🔥', special: null },
    { time: '9:00 PM', message: 'Its 9:00 PM  BD time⏳\nBaby, have uh had ur dinner?...!😘🍽️❤️', special: null },
    { time: '10:00 PM', message: 'Its 10:00 PM  BD time⏳\n whats ur thoughts..!😜📱😾', special: null },
    { time: '11:00 PM', message: 'Its 11:00 PM  BD time⏳\nDont miss ur ex😔 Forget ur ex🙂 Flirt with me instead...!🙈🐸🤗', special: null }
];

module.exports.onLoad = ({ api }) => {
    console.log(chalk.bold.hex("#00c300")("============ AUTOSENT COMMAND LOADED (BD TIME) ============"));

    messages.forEach(({ time, message }) => {
        const [hour, minute, period] = time.split(/[: ]/);
        let hour24 = parseInt(hour, 10);
        if (period === 'PM' && hour !== '12') {
            hour24 += 12;
        } else if (period === 'AM' && hour === '12') {
            hour24 = 0;
        }

        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Dhaka';
        rule.hour = hour24;
        rule.minute = parseInt(minute, 10);

        schedule.scheduleJob(rule, () => {
            if (!global.data?.allThreadID) return;
            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(message, threadID, (error) => {
                    if (error) {
                        console.error(`Failed to send message to ${threadID}:`, error);
                    }
                });
            });
        });

        console.log(chalk.hex("#00FFFF")(`Scheduled (BDT): ${time} => ${message}`));
    });
};

module.exports.run = () => {
    // Main logic is in onLoad
};
