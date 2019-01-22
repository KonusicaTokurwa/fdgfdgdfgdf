// Calling all the packages for [discord.js] <--Start-->
const Discord = require('discord.js');
const botconfig = require('./configuration/botconfig.js');
const ytdl = require('ytdl-core');
const weather = require('weather-js');
const YouTube = require('simple-youtube-api');
const moment = require("moment-timezone");
const fs = require('fs');
const bot = new Discord.Client({
    disableEveryone: true
});
// Calling all the packages for [discord.js] <--End-->

// Music objects <--Start-->
require('./commands/music-system/music-system.js')(bot, ytdl);
bot.youtube = new YouTube('AIzaSyBxgvoeClP_0DCJqaMQJwtZ3RsbPvTVS2o');
bot.queue = new Map();
// Music objects <--End-->

// Command Handler Initialization. <--Start-->
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() == "js")
    if (jsfile.length <= 0) {
        console.log("Coudn't found the command");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded`);
        bot.commands.set(props.help.name, props);
    });

});
// Command Handler Initialization. <--End-->

// Bot setting's <--Start-->
  function changing_status() {
    let status = ['Bot stworzony przez Art#4929', 'Komendy - !Pomoc | Werjsa Bota 1.5.2', 'POwP Discord']
    let random = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(random, {type: "Streaming", url: "https://www.twitch.tv/frekayne"});
}

bot.on("ready", () => {
    console.log( /*Whatever you want to say*/ );
    setInterval(changing_status, 5000);
});
// Bot setting's <--End-->

// Normal Command's <--Start-->
bot.on('message', async message => {

    // Message Initialization <--Start-->
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    // Message Initialization <--End-->

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    // Custom-Preffix variables, arguments[],etc <--Start-->
    let prefixes = JSON.parse(fs.readFileSync('./configuration/prefixes.json', 'utf8'));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    // Custom-Preffix variables, arguments[],etc <--End-->

    if (!cmd.startsWith(prefix)) return;

    // CommandFile initialization for command handler. <--Start-->
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if (commandFile) commandFile.run(bot, message, args, prefix);
    // CommandFile initialization for command handler. <--End-->

});


bot.login("NDcxNjIzNzI5NzY4ODI0ODMz.DqZZlw.haIHYdXgctY658oapl2KYr1PJks");
