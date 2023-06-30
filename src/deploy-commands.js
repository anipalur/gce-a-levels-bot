/*
Portions of this code have been adapted from the discord.js guide project and are copyrighted by
Sanctuary, 2017 - 2022 under the terms of the MIT license.
*/

const { REST, Routes } = require('discord.js');
const path = require('node:path');
const getFiles = require('./tools/get-files.js');

// Comment out this dotenv import if you have configured your environment variables elsewhere.
require('dotenv').config();

const { clientId, guildId } = require('./config/bot.json');
const { stripIndents } = require('common-tags');
const chalk = require('chalk');

/*
eslint-disable no-console
-- Console logs are needed to log command deployment progress.
*/

const globalCommands = [];
const guildCommands = [];
const commandFiles = getFiles(path.join(__dirname, 'commands'));

/*
Requires all command files from the commands folder and grabs their respective command data in
JSON format.
*/
for (const file of commandFiles) {
	const command = require(file);

	if ('data' in command && 'execute' in command) {
		// Adds global commands to a separate array for separate deployment.
		if ('global' in command) {
			globalCommands.push(command.data.toJSON());
		}
		else {
			guildCommands.push(command.data.toJSON());
		}
	}
	else if (!('subcommand' in command)) {
		console.log(stripIndents`
			${chalk.yellowBright('[WARNING]')} This command is missing command data or an execute function:
			${chalk.white(file.replace(__dirname, '.'))}
		`);
	}
}

// Constructs and prepares a new instance of the REST module.
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
	try {
		// Updates all commands in the guild, deploying new commands where necessary.
		console.log(`${chalk.yellow('[WORKING]')} Refreshing ${globalCommands.length} global command(s)...`);

		const globalCommandsData = await rest.put(
			Routes.applicationCommands(clientId, guildId),
			{ body: globalCommands },
		);

		console.log(`${chalk.greenBright('[SUCCESS]')} Refreshed ${globalCommandsData.length} global command(s).`);

		console.log(`${chalk.yellow('[WORKING]')} Refreshing ${guildCommands.length} guild command(s)...`);

		const guildCommandsData = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: guildCommands },
		);

		console.log(`${chalk.greenBright('[SUCCESS]')} Refreshed ${guildCommandsData.length} guild command(s).`);
	}
	catch (error) {
		console.log(chalk.redBright('[ERROR]'), error);
	}
})();
