// Calling the required packages <--Start-->
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
// Calling the required packages <--End-->

// Main Module <--Start-->
module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);

    if (!queue) return message.channel.send("❎ Aktualnie nic nie jest odtwarzane.");

    // Music Queue Embed <--Start-->
    let musicQueueEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`**Kolejny utwór**\n${queue.musics.map(music => 
            `**>>** ${music.title}`).join('\n')}\n\n🎵 **Aktualnie odtwarzane:** ${queue.musics[0].title}`);

    message.channel.send(musicQueueEmbed);
    // Music Queue Embed <--End-->

}
// Main Module <--End-->

// Command Module <--Start-->
module.exports.help = {
    name: "Queve" // Command Name | Usage: {yourprefix}queue
}
// Command Module <--End-->