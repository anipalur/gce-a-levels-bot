const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const path = require('node:path');
const getFiles = require('./tools/get-files.js');

// Comment out this dotenv import if you have configured your environment variables elsewhere.
require('dotenv').config();

const { stripIndents } = require('common-tags');
const chalk = require('chalk');

/*
eslint-disable no-console
-- Console logs are needed to log bot initialisation progress.
*/

/*
Creates a new client instance. GuildPresences receives additional information about a member's
roles and Partials help the bot handle reactions on uncached messages.
*/
const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
		Partials.Reaction,
	],
});

console.log(`${chalk.yellow('[WORKING]')} Loading commands...`);

// Collections on the client can be accessed via the client object.
client.commands = new Collection();
client.cooldowns = new Collection();

/*
Requires all command files from the commands folder, sets their respective command names and execute
functions into the client.commands collection and sets their respective cooldowns, all to be
retrieved when a command is used (see ./events/interaction-create).
*/
const commandFiles = getFiles(path.join(__dirname, 'commands'));
for (const file of commandFiles) {
	const commandCode = require(file);

	/*
	Ignores commands that do not have command data or an execute function, i.e. are empty, unfinished
	or incorrectly configured. Also ignores subcommands.
	Creates a new collection for command cooldowns to store member IDs for members that used a command.
	*/
	if ('data' in commandCode && 'execute' in commandCode) {
		client.commands.set(commandCode.data.name, commandCode);
		client.cooldowns.set(commandCode.data.name, new Collection());
	}
	else if (!('subcommand' in commandCode)) {
		console.log(stripIndents`
			${chalk.yellowBright('[WARNING]')} The following command is missing command data or an execute function:
			${chalk.white(file.replace(__dirname, '.'))}
		`);
	}
}

console.log(`${chalk.yellow('[WORKING]')} Loading buttons...`);

client.buttons = new Collection();
const buttonFiles = getFiles(path.join(__dirname, 'buttons'));
for (const file of buttonFiles) {
	const buttonCode = require(file);

	/*
	Ignores buttons that do not have an ID or an execute function, i.e. are empty, unfinished or
	incorrectly configured.
	*/
	if ('id' in buttonCode && 'execute' in buttonCode) {
		client.buttons.set(buttonCode.id, buttonCode);
	}
	else {
		console.log(stripIndents`
			${chalk.yellowBright('[WARNING]')} The following button is missing a button ID or an execute function:
			${chalk.white(file.replace(__dirname, '.'))}
		`);
	}
}

console.log(`${chalk.yellow('[WORKING]')} Loading events...`);

/*
Requires all event files from the events folder and sets their respective event names, behaviour and
execute functions. The client exposes .once (for the first time an event is triggered) and .on (for
every time an event is triggered) that register event listeners.
*/
const eventFiles = getFiles(path.join(__dirname, 'events'));
for (const file of eventFiles) {
	const event = require(file);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.DISCORD_BOT_TOKEN);
