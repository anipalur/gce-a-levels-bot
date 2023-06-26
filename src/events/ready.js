const { ActivityType, Events } = require('discord.js');
const chalk = require('chalk');

/*
eslint-disable no-console
-- A console log is needed to log the bot login message.
*/

const name = Events.ClientReady;
const once = true;

function execute(client) {
	console.log(`${chalk.greenBright('[SUCCESS]')} Logged in as ${client.user.tag}.`);

	client.user.setPresence({
		// Sets the bot's custom status to 'Watching the server...'.
		activities: [
			{
				name: 'the server...',
				type: ActivityType.Watching,
			},
		],
		status: 'online',
	});
}

module.exports = { name, once, execute };
