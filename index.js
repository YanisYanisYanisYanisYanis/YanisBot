// Loads everything necessary for the bot to work properly
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");



// Logs the bot's tag and the number of server he's on
client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag} on ${client.guilds.size} servers!`);
 client.user.setActivity(`${client.guilds.size} servers!`, {type: "WATCHING"});
 });

// Logs when the bot joins a server and sends a message to the server owner
client.on(`guildCreate`, guild => {
    console.log(`I just got added to "${guild.name}" ${guild.id}! Owner: ${guild.owner.user.tag}/${guild.owner.id}`)
    guild.owner.send(`Hey! Thank you for adding me to your server!
For now I'm still being developped, so I don't have a lot of commands available, but I will be able to do more things in the future :D
If you'd like a list of all the commands available, you just need to send me __??help__ !
Any questions ? Send a DM to my creator <@284699100945842176> !`);
	client.user.setActivity(`${client.guilds.size} servers!`, {type: "WATCHING"});
});

// Logs when the bot leaves a server and sends a message to the server owner
client.on(`guildDelete`, guild => {
    console.log(`I just got removed from "${guild.name}" ${guild.id}`)
    guild.owner.send(`Hey, I noticed that you removed me from your server. If you didn't find me useful, that's okay!
But if it's because you encountered a problem, then you can send a DM to my creator <@284699100945842176>
He will probably know how to resolve the issue you had.`);
    client.user.setActivity(`${client.guilds.size} servers!`, {type: "WATCHING"});
});




client.on(`message`, async (message) => {

    // Ignore any message by a bot, or doesn't start with our prefix
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    // To clean it up, and add a bit better validation.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();




    // Lists all the servers the bot is in
    if (command === `servers`) {

        // Checks if I'm the one performing the command
        let owner = message.author.id === config.yanis
        if (owner) {

            // Creates two variables that will  be used in the command
            var guildNames;
            var server = `Here are all the servers I'm in!\n`
            // For every guild the bot's on, adds the guild's name to the server variable
            client.guilds.forEach((guild) => {
                guildNames = (' - ' + guild.name + `\n`);
                server = server + (guildNames)
            })
            // Sends the final message
            message.channel.send(server);
        }

    };




    // Help command! :3
    if (command === 'help') {

    	if (message.channel.type != `dm`) {
        await message.channel.send('Check your DMs! 🙃');
    	}

        // Added return to prevent the bot checking for any other command.
        return message.author.send(`Here is a list of all the commands available!\n__??help__ : displays all the available commands for the bots\n__??status__ : displays the status of the bot! (it's useless but I did it so I'm proud :D)`);
    };




    // To prevent reading processing DMs.
    if (message.channel.type === `dm`) return message.author.send(`You can only perform this command on a server!`);

    if (command === `status`) {
        // Detects "status" and grabs the role from the sender
        let isAdmin = message.member.permissions.has(`ADMINISTRATOR`) || message.member.id != config.yanis;

        // If the sender doesn't have the role
        if (!isAdmin) {
            console.log(`${message.member.user.tag}/${message.author} has issued ??status and failed!`);
            return message.channel.send(`You do not have the right role!`);
        }
        // If the sender has the role
        console.log(`${message.member.user.tag}/${message.author} has issued ??status and succeeded!`);
        return message.channel.send(`Working.`);
    }
});




// The bot's token (here, in an external config file)
client.login(config.token);

