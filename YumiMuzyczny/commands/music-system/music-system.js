// Calling the required packages <--Start-->
const fs = require('fs');
// Calling the required packages <--End-->

// Exports Module <--Start-->
module.exports = (bot, ytdl) => {

    // Queue system & youtube search system <--Start-->
    bot.musicSystem = async (video, message, voiceConnection, playlist = false) => {
        let queue = bot.queue.get(message.guild.id);
        let music = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };

        if (!queue) {
            let queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceConnection,
                connection: null,
                musics: [],
                volume: 50,
                playing: true
            };

            bot.queue.set(message.guild.id, queueConstruct);
            queueConstruct.musics.push(music);

            try {
                var connection = await voiceConnection.join();
                queueConstruct.connection = connection;
                bot.play(message.guild, queueConstruct.musics[0]);
            } catch (err) {
                bot.queue.delete(message.guild.id);
                console.error(err);
            }
        } else {
            queue.musics.push(music);
            if (playlist) return;
            else return message.channel.send(`🎵 **${music.title}** został dodany do Kolejki`);
        }
        return;
    }
    // Queue system & youtube search system <--End-->

    // Play music system <--Start-->
    bot.play = (guild, music) => {
        let queue = bot.queue.get(guild.id);
        if (!music) {
            queue.voiceChannel.leave();
            bot.queue.delete(guild.id);
            return queue.textChannel.send("🎵 Odtwarzanie muzyki zostało zakończone.");
        }

        let dispatcher = queue.connection.playStream(ytdl(music.url))
            .on('end', () => {
                queue.musics.shift();
                setTimeout(() => {
                    bot.play(guild, queue.musics[0]);
                }, 250);
            })
            .on('error', err => console.error(err));
        dispatcher.setVolumeLogarithmic(queue.volume / 100);

        queue.textChannel.send(`🎵 **${music.title}** aktualnie Gra`);
    }
    // Play music system <--End-->
}
// Exports Module <--End-->