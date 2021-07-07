const Discord = require('discord.js');
const express = require('express');
const config = require('./config.json');
const prefix = config.prefix;
const ownerID = "YOUR TOKEN HERE";
const bot = new Discord.Client();

var perms = new Discord.RichEmbed() 
	.setColor(0x03c2fc)
	.addField('Not Enough Permissions', "You do not have enough permissions for that command.");

var notTheOwner = new Discord.RichEmbed()
		.setColor(0x03c2fc)
		.addField('Not the Owner', "You are not the owner of the bot and don\'t have the permissions to use this command.")


bot.on("ready", () => {
  console.log(`Bot signed in: ${bot.user.tag}`);
bot.user.setStatus('dnd')
})

bot.on('ready', () =>{
  bot.user.setActivity('Cheesecake Advertising' , {type: "WATCHING"})
  console.log("logged into: " + bot.user.tag)
})

bot.on("message", async message => {
  
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;
  
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "eval") {
if (message.author.id == ownerID) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        message.channel.send(evaled)
      }catch (err) {
        console.log(err)
      }}}; 
  
  if(command === "ping") {
    message.channel.send(":ping_pong: Pong! " + Math.round(bot.ping) + "ms!")
  }
  
  if(command === "servers") {
  message.channel.send(`Serving ${bot.guilds.size} servers`)
  message.channel.send(bot.guilds.map(g=>g.name).join('\n'))
  }
  
  if(command === "uptime") {
let totalSeconds = (bot.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
  let uptime = `${days} days, ${hours} hours, and ${minutes} minutes`;
   message.channel.send(uptime)
  }
  
  if(command == "ht")
{
      function doRandHT() {
var rand = ['HEADS!','TAILS!'];

return rand[Math.floor(Math.random()*rand.length)];
}

 const embed = {
"title": `Here is the winner!`,
"description": doRandHT(),
"color": 7584788,
};
message.channel.send({ embed });
};
  
  
  if (command === 'kick') {
 if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(perms)
    var member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send('Error: Missing Arguments You Need to either ' + "`mention`" + " Or give a member " + "`ID`")
    
    if (!member.kickable)//check if the bot can kick the member
    return message.channel.send(`Error: I cannot kick ${member.user.tag}`);//return if fasle.
    
    let reason = args.slice(1).join(" ");//make the message string
    if (!reason) reason = "no reason given"//if no reason was given, reason just means no reason given
    
    member.kick(reason)//kick the member
    message.channel.send(`Successfully kicked ${member.user.tag}\nFor: ${reason}`)//send a message indacting the member had been banned.
    }
  
  if (command === 'ban') {
    if (!message.member.hasPermission('BAN_MEMBERS'))
    var member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send('Error: Missing Arguments You Need to either ' + "`mention`" + " Or give a member " + "`ID`")
    
    if (!member.bannable)//check if the bot can ban the member
    return message.channel.send(`Error: I cannot ban ${member.user.tag}`);//return if fasle.
    
    let reason = args.slice(1).join(" ");//make the message string
    if (!reason) reason = "no reason given"//if no reason was given, reason just means no reason given
    
    member.ban(reason)//ban the member
    message.channel.send(`Successfully banned ${member.user.tag}\nFor: ${reason}`)//send a message indacting the member had been banned.
    //done! //and the say command //to lazy LMAO //plzzzzz //its simple it just uses args //I need help with the perms.has part why do you even use that lmao
  }
  
  if (command === 'say') {
    if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send('You don\'t have permissions to use this command.')//done, they need the 'BAN_MEMBERS' permission to use the command.
    let saymessage = args.join(" ");//
    if (!saymessage) return message.channel.send('Please Give Text');//return a message if they don't provide text.
    message.channel.send(saymessage);//send the message.
    message.delete()
  }
  
  
   if(command === "purge") {
     
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(perms)//lmao
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  
   
  if (command ==='help'){
   let embed = new Discord.RichEmbed()
.setTitle("Help Menu")
.setColor("#ec3eff")
.setDescription("Here are my commands!")
.addField("c?say", "This command can be ran by people who has `BAN_MEMBERS` permission")
.addField("c?eval", "This Command can only be accessed by the `Bot Owner`")
.addField("c?ban", "This command can be accessed by members with `BAN_MEMBERS`")
.addField("c?kick", "This command can be accessed by members with `KICK_MEMBERS`")
.addField("c?purge", "This command can be accessed by members with `MANAGE_MESSAGES`")
.addField("c?servers","This command shows how many servers the bot is in!")
.addField("c?uptime", "This command shows how long the bot has been online!")
.addField("c?help", "shows this message")
.addField("**NOTE**", "This bot is still being developed. We might add some more commands going along! Thanks! -Cheesecake404")
message.channel.send(embed)
  }
  
});

bot.login(process.env.TOKEN)
