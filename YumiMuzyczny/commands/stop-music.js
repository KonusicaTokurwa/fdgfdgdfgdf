// Calling the required packages <--Start-->
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
// Calling the required packages <--End-->

// Main Module <--Start-->
module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    if (!message.member.voiceChannel) return message.channel.send("❎ Musisz być na kanale głosowym.");
    if (!queue) return message.channel.send("❎ Aktualnie nic nie jest odtwarzane.");

    queue.connection.dispatcher.end();
    message.channel.send("⏹ Muzyka została pomyślnie zatrzymana.");

};
// Main Module <--End-->

// Command Module <--Start-->
module.exports.help = {
    name: "Stop" // Command Name | Usage: {yourprefix}beep
}
// Command Module <--End-->