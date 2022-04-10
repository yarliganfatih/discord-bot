const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const config = require("../config.json");
const ytSearch = require('youtube-search-without-api-key');

let prefix = config.prefix;

exports.run = (client, message) => {
  var args = message.content.slice(prefix.length).split(" ");
  var command = args.shift();
  var subcommands = {
    "loop": 1,
    "select": 1,
    "list": 0
  }
  while(args[0].search("--")==0){
    var subcommand = args[0].substr(2, 10);
    subcommands[subcommand] = args.shift();
    subcommands[subcommand] = args.shift();
  }
  console.log(subcommands);
  let voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply('Öncelikle sesli kanala girmelisin.');
  } else {
    const msg = args.join("");
    var urlx = "";
    if (msg.search("youtube.com")!=-1 || msg.search("youtu.be")!=-1) {
      urlx = ytdl(msg, { filter: 'audioonly' });
      voiceChannel.join().then(connection => {
        message.reply(
          'Ses Çalınıyor : **' + args.join(" ") + '**'
        );
        play(connection, urlx, 3);
      });
    } else if (!msg.search("http")!=-1) { // Search on Youtube and Get First Result
      ytSearch.search(msg).then( response => {
        if(subcommands["list"]){
          var listedVideos = "";
          console.log(response);
          for(var i=1;i<response.length;i++){
            listedVideos += "**"+ i + ".** " + response[i]["title"] + "  ***(" + response[i]["duration_raw"] + ")***\n";
          }
          message.reply(
              'Liste : **' + args.join(" ") + '** \n' + listedVideos + '\n Seçmek için **--select 1** ekleyin.'
            );
        }else{
          var msgx = response[subcommands["select"]-1]["url"];
          urlx = ytdl(msgx, { filter: 'audioonly' });
          voiceChannel.join().then(connection => {
            message.reply(
              'Ses Çalınıyor : **' + args.join(" ") + ' => ' + msgx + '**'
            );
            play(connection, urlx, 3);
          });
        }
      });
    } else {
      urlx = msg; // TODO urlx = 'http://' + msg;
      voiceChannel.join().then(connection => {
        message.reply(
          'Ses Çalınıyor : **' + args.join(" ") + '**'
        );
        play(connection, urlx, 3);
      });
    }
  }

};

function play(connection, urlx, loop = 1) {
  connection.play(urlx).on('start', () => {
    //loop
  }).on('finish', () => {
    if (loop > 1) {
      play(connection, urlx, loop - 1);
    } else {
      //dispatcher.destroy();
    }
  }).on('error', e => {
    console.log(e)
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};
exports.help = {
  name: "play",
  description: "Müzik Botu görevi görür.",
  usage: "play "
};
