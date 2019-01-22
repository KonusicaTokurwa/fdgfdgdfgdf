// Calling the required packages <--Start-->
const Discord = require('discord.js');
const ytdl = require("ytdl-core");
// Calling the required packages <--End-->

// Main Module <--Start-->
module.exports.run = async (bot, message, args) => {

    let voiceConnection = message.member.voiceChannel;
    if (!voiceConnection) return message.reply("❎ Wejdz na kanał głosowy.");

    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    let list = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/

    let musicName = args.join(' ');
    if (!url || !musicName) return message.reply("❎ Wprowadź nazwę Muzyki lub URL!");

    if (!message.member.hasPermission('CONNECT')) return message.reply("❎ Nie mam uprawnień, aby wejść na kanał głosowy");
    if (!message.member.hasPermission('SPEAK')) return message.reply("❎ Nie mam uprawnień, aby mówić na kanale.");

    if (url.match(list)) {
        let playlist = await bot.youtube.getPlaylist(url);
        let videos = await playlist.getVideos();

        for (const vid of Object.values(videos)) {
            let video = await bot.youtube.getVideoByID(vid.id)
            await bot.musicSystem(video, message, voiceConnection, true)
        }

        return message.channel.send(`🎵 **${playlist.title}** został dodany do Kolejki.`);
    } else {

        try {
            var video = await bot.youtube.getVideo(url);
        } catch (err) {
            if (err) undefined;
            try {
                var vid = await bot.youtube.searchVideos(musicName, 1);
                var video = await bot.youtube.getVideoByID(vid[0].id);
            } catch (err) {
                console.error(err);
                return message.reply("❎ Nie znaleziono Filmów o takim tytule.");
            }
        }
        return bot.musicSystem(video, message, voiceConnection);
    }
};
// Main Module <--End-->

// Command Module <--Start-->
module.exports.help = {
    name: "Graj" // Command Name | Usage: {yourprefix}play <url or song name>
}
// Command Module <--End-->