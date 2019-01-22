// Calling the required packages <--Start-->
const discord = require("discord.js");
const ytdl = require("ytdl-core");
// Calling the required packages <--End-->

// Main Module <--Start-->
module.exports.run = async (bot, message, args) => {

    let voiceConnection = message.member.voiceChannel;
    if (!voiceConnection) return message.channel.send("❎ Wejdz na kanał głosowy.");

    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    let list = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/

    let musicName = args.join(' ');
    if (!url || !musicName) return message.channel.send("❎ Wprowadź nazwę Muzyki lub URL!");

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
                var videos = await bot.youtube.searchVideos(musicName, 10);
                let index = 0;

                let embed = new discord.RichEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(bot.user.avatarURL)
                    .setDescription(`**Wyszukiwanie muzyki:**\n${videos.map(video => 
                        `**${++index} -** ${video.title}`).join('\n\n')}\n\n🎵 Wybierz muzykę z góry pomiędzy ** 1 ** i ** 10 ** w ciągu ** 1 minuty **`);

                message.channel.send(embed);

                try {
                    var response = await message.channel.awaitMessages(msg => msg.content > 0 && msg.content < 11, {
                        maxMatches: 1,
                        time: 100000,
                        errors: ['time']
                    });
                } catch (err) {
                    if (err) undefined
                    return message.channel.send('❎ Przekroczyłeś 1 minutę czasu selekcji', `Wyszukaj ponownie za pomocą tej metody: ${prefix}youtube <music>`);
                }
                const videoIndex = parseInt(response.first().content);
                var video = await bot.youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                console.error(err);
                return message.channel.send("❎ Nie znaleziono Filmów o takim tytule.");
            }
        }
        return bot.musicSystem(video, message, voiceConnection);
    }
}
// Main Module <--End-->

// Command Module <--Start-->
module.exports.help = {
    name: "Youtube" // Command Name | Usage: {yourprefix}youtube <song name> then choose a option within mentioned time.
}
// Command Module <--End-->