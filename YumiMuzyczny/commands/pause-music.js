// Calling the required packages <--Start-->
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
// Calling the required packages <--End-->

// Main Module <--Start-->
module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);

    if (queue && queue.playing) {
        queue.playing = false;
        queue.connection.dispatcher.pause();
        return message.channel.send("⏸ Muzyka została zastopowana.");
    }

}
// Main Module <--End-->

// Command Module <--Start-->
module.exports.help = {
    name: "Pauza" // Command Name | Usage: {yourprefix}pause
}
// Command Module <--End-->