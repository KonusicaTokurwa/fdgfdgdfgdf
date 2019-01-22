// Calling the required packages <--Start-->
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
// Calling the required packages <--End-->

// Main Module <--Start-->
module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    if (!queue) return message.channel.send("❎ Aktualnie nic nie jest odtwarzane.");

    if (!args[0]) return message.channel.send(`🎵 Aktualna głośność **${queue.volume}/100**`);
    if (isNaN(args[0])) return message.channel.send("❎ Wprowadź głośność od 0 do 100");
    if (args[0] < 0 || args[0] > 100) return message.channel.send("❎ Podaj liczbę od 0 do 100");

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return message.channel.send(`🎵 Głośność została zmieniona na **${queue.volume}/100**`);

}
// Main Module <--End-->

// Command Module <--Start-->
module.exports.help = {
    name: "Głośność" // Command Name | Usage: {yourprefix}volume <choose 1-100>
}
// Command Module <--End-->