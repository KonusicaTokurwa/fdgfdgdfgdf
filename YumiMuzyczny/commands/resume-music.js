// Calling the required packages <--Start-->
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
// Calling the required packages <--End-->

// Main Module <--Start-->
module.exports.run = async (bot, message, args) => {
    let queue = bot.queue.get(message.guild.id);

    if (queue && !queue.playing) {
        queue.playing = true;
        queue.connection.dispatcher.resume();
        return message.channel.send("⏯ Muzyka została wznowiona.");
    }
}
// Main Module <--End-->

// Command Module <--Start-->
module.exports.help = {
    name: "Wznów" // Command Name | Usage: {yourprefix}resume
}
// Command Module <--End-->