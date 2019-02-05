const Discord = require('discord.js');
 const client = new Discord.Client();
 const prefix = "??";

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });
// Set the bot's "Playing: " status (must be in an event!)
client.on("ready", () => {
    client.user.setActivity("pewdiepie", { type: "WATCHING"})
})


client.on("message", (message) => {

  // Exit and stop if the prefix's not there
  if (!message.content.startsWith(prefix)) return;

  // Detects "status" and grabs the role from the sender
  if (message.content.startsWith(prefix + "status")) {
  	 let myRole = message.guild.roles.get("541685253006295055");

  // If the sender doesn't have the role
  if (!message.member.roles.has("541685253006295055")) {
  	  message.channel.send("You do not have the right role!")
  	  console.log(`${message.member.user.tag} has issued ??status and failed!`)};

  // If the sender has the role
  if (message.member.roles.has("541685253006295055")) {
     message.channel.send("```Working.```")
     console.log(`${message.member.user.tag} has issued ??status and succeded!`)};
  }
});

client.login('your precious token right here');