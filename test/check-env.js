const fs = require('node:fs');
const path = require('node:path');

// Comment out this dotenv import if you have configured your environment variables elsewhere.
require('dotenv').config();

const { stripIndents } = require('common-tags');
const chalk = require('chalk');

/*
eslint-disable no-console
-- Console logs are needed to log check messages.
*/

(() => {
	console.log(`${chalk.yellow('[WORKING]')} Checking your environment...`);

	// Minimum Node.js version required is v16.9.x
	const minNodeJSVersion = [16, 9];

	// Generates an array of the system's Node.js version in the form [major, minor].
	const splitVersion = process.version.slice(1).split('.')
		.slice(0, 2);

	// Checks if the system's Node.js version meets the minimum requirement.
	const validNodeJSVersion = splitVersion.every((number, index) => {
		// To avoid lexicographic comparison, parseInt is used.
		return parseInt(number) >= minNodeJSVersion[index];
	});

	if (!validNodeJSVersion) {
		console.log(stripIndents`
			${chalk.redBright('[ERROR]')} Invalid Node.js version!
			The minimum version required is ${chalk.white('v16.9.x')}
			Download the latest version of Node.js from https://nodejs.org
		`);
		return;
	}

	if (!process.env.DISCORD_BOT_TOKEN) {
		console.log(stripIndents`
			${chalk.redBright('[ERROR]')} Missing Discord bot token!
			Rename .env.example to .env and set your bot token accordingly.
			See README.md for more.
		`);
		return;
	}

	if (!process.env.MONGODB_CONNECTION_STRING) {
		console.log(stripIndents`
			${chalk.redBright('[ERROR]')} Missing MongoDB connection string!
			Rename .env.example to .env and set your connection string accordingly.
			See README.md for more.
		`);
		return;
	}

	// Checks if each config file exists.
	for (const configFile of ['bot', 'channels', 'roles']) {
		if (!fs.existsSync(path.join(__dirname, `/../src/config/${configFile}.json`))) {
			console.log(stripIndents`
				${chalk.redBright('[ERROR]')} Missing ${chalk.white(`${configFile}.json`)} file!
				Rename ${configFile}-example.json to ${configFile}.json and set your IDs accordingly.
				See README.md for more.
			`);
			return;
		}
	}

	console.log(`${chalk.greenBright('[SUCCESS]')} Environment configured correctly!`);
})();
