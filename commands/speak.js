const googleTTS = require('google-tts-api');
const Discord = require("discord.js");
const config = require("../config.json");
let prefix = config.prefix;
exports.run = (client, message) => {
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  let voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply('Öncelikle sesli kanala girmelisin.');
  } else {
    // get audio URL
    const msg = args.join(" "); //`${args.slice(" ")}`
    const url = googleTTS.getAudioUrl(msg, {
      lang: 'tr',
      slow: false,
      client: 'tr',
      host: 'https://translate.google.com'
      //splitPunct: ',.?',
    });
    console.log(url);
    voiceChannel.join().then(connection => { //voiceChannel.join();
      message.reply(
        `Sesli Mesaj : **${msg}**`
      );
      connection.play(url);
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};
exports.help = {
  name: "speak",
  description: "Bota yazdığınız şeyi sesli mesaj olarak söyletir",
  usage: "speak "
};
