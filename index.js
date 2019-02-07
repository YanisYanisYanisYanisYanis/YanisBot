 // Loads everything necessary for the bot to work properly
 const Discord = require('discord.js');
 const client = new Discord.Client();
 const config = require("./config.json");



// Logs the bot's tag and the number of server he's on
client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag} on ${client.guilds.size} servers!`);
 });
// Make the bot says in it's status how many server's it's on
client.on(`ready`, () => {
    client.user.setActivity(`${client.guilds.size} servers!`, {type: "WATCHING"})
})

// Logs when the bot joins a server and sends a message to the server owner
client.on(`guildCreate`, guild => {
    console.log(`I just got added to "${guild.name}" ${guild.id}! Owner: ${guild.owner.user.tag}/${guild.owner.id}`)
    guild.owner.send(`Hey! Thank you for adding me to your server!
For now I'm still being developped, so I don't have a lot of commands available, but I will be able to do more things in the future :D
If you'd like a list of all the commands available, you just need to send me **??help** !
Any questions ? Send a DM to my creator <@284699100945842176> !`)
});

// Logs when the bot leaves a server and sends a message to the server owner
client.on(`guildDelete`, guild => {
  guild.owner.send(`Hey, I noticed that you removed me from your server. If you didn't find me useful, that's okay!
But if it's because you encountered a problem, then you can send a DM to my creator <@284699100945842176>
He will probably know how to resolve the issue you had.`)
    console.log(`I just got removed from "${guild.name}" ${guild.id}`)
})








// Status command (pretty useless, but it's working, mostly), might need to shorten it
client.on(`message`, (message) => {

    // 1/2 Tells the user he needs to use the command on a server in order for it to work
    if (message.channel.type === `dm`)
    message.author.send(`You can only perform this command on a server!`);

    // 2/2 Exits and stops if the command was sent in DM (Those 2 get triggered by the other commands, I still need to fix that)
    if (message.channel.type === `dm`) return;

    // Exits and stops if the message's author is a bot
    if(message.author.bot) return;

    // Exits and stops if the prefix's not there
    if (!message.content.startsWith(config.prefix)) return;

    // Exits and stops if this command isn't used (to avoid the bot confusing another command with this one)
    if (!message.content.startsWith(config.prefix + `status`)) return;

    // Detects "status" and grabs the role from the sender
    let myRole = null;
    if (message.content.startsWith(config.prefix + `status`)) {
        message.guild.roles.get(config.botaccess);
        myRole = message.member.roles.has(config.botaccess)
    }
       
    // If the sender doesn't have the role
    if (!myRole) {
        message.channel.send(`You do not have the right role!`);
        console.log(`${message.member.user.tag}/${message.author} has issued ??status and failed!`)
    }
    else 
    {
        // If the sender has the role
        message.channel.send(`Working.`);
        console.log(`${message.member.user.tag}/${message.author} has issued ??status and succeeded!`);
    }        
});








// Help command
// There might be a way to shorten this bit, I'll get back to it later
client.on(`message`, (message) => {

    // Exits and stops if the prefix's not there
    if (!message.content.startsWith(config.prefix)) return;

    // Exits and stops if the message's author is a bot
    if(message.author.bot) return;

    // Exits and stops if this command isn't used (to avoid the bot confusing another command with this one)
    if (!message.content.startsWith(config.prefix + `help`)) return;

    // Detects "help"
    if (message.content.startsWith(config.prefix + `help`))

    // If the command was sent in a server
    if (message.channel.type === `text`) {
      message.channel.send(`Check your DMs!`)
      message.author.send(`Here is a list of all the commands available!
**??help** : displays all the available commands for the bots
**??status** : displays the status of the bot! (it's useless but I did so I'm proud :D)`)
    }
    else
    {
      // If the command was sent in DM to the bot
      message.author.send(`Here is a list of all the commands available!
**??help** : displays all the available commands for the bots
**??status** : displays the status of the bot! (it's useless but I did so I'm proud :D)`)
    }
});



// The bot's token (here, in an external config file)
client.login(config.token);
