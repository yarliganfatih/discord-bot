//import * as googleTTS from 'google-tts-api'; // ES6 or TypeScript
const Discord = require("discord.js");
const fs = require('fs');
const url = require('url');
const config = require("../config.json");
let prefix = config.prefix;

const harfler = [
"🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾","🇿"    
];

const sayilar = [
  "0️⃣",
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "🔟"
]

exports.run = (client, message) => {
  const args = message.content.toLowerCase().slice(prefix.length).split(" ");
  const command = args.shift();
  //const voiceChannel = message.member.voiceChannel; //message.member.voice.channel
  const msg = args.join(" ");
  var msgid;
  if(message.reference){
    console.log(message.reference.messageID)
    msgid=message.reference.messageID;
  }else{ 
    msgid=message.id;
  }
  //message.delete();
  message.channel.messages.fetch(msgid)
  .then(ref => {
    //ref.react('<a:banned:804768330081894432>');
    for(var i=0;i<msg.length;i++){
  	  var n = msg.charCodeAt(i);
      if(n>96 && n<123){
        ref.react(harfler[n-97]);
      }else if(n==32){
        ref.react("🟦");
      }else if(n>47 && n<58){
        ref.react(sayilar[n-48]);
      }
    }
  })
  .catch(console.error);
  if(msgid!=message.id){
    message.delete();
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [], 
  permLevel: 1
};
exports.help = {
  name: "react",
  description: "Bota yazdığınız şeyi tekrar yazar",
  usage: "react "
};
 