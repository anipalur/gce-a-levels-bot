const { Events } = require('discord.js');
const { formatEmoji } = require('@discordjs/builders');
const { S_IN_TEN_MINUTES, MS_IN_ONE_S } = require('../data/constants.json');
const { grey, yellow } = require('../config/colours.json');
const { puzzledEmojiId, timeEmojiId } = require('../config/emojis.json');
const { stripIndents } = require('common-tags');
const chalk = require('chalk');

/*
eslint-disable no-console
-- Console logs are needed to log command usage and errors.
*/

const name = Events.InteractionCreate;

const DEFAULT_COOLDOWN_DURATION = S_IN_TEN_MINUTES;

async function handleError(interaction, error) {
	const errorReply = {
		embeds: [
			{
				title: `${formatEmoji(puzzledEmojiId)} Whoops!`,
				description: stripIndents`
					Something went wrong!
					Please contact staff for help.
				`,
				color: yellow,
			},
		],
		ephemeral: true,
	};

	if (interaction.replied || interaction.deferred) {
		await interaction.editReply(errorReply);
	}
	else {
		await interaction.reply(errorReply);
	}

	console.log(chalk.redBright('[ERROR]'), error);
}

async function execute(interaction) {
	const client = interaction.client;
	const user = interaction.user;

	const isChatInputCommand = interaction.isChatInputCommand();
	const isMessageContextMenuCommand = interaction.isMessageContextMenuCommand();
	const isUserContextMenuCommand = interaction.isUserContextMenuCommand();

	if (isChatInputCommand || isMessageContextMenuCommand || isUserContextMenuCommand) {
		try {
			const commandName = interaction.commandName;

			// Retrieves the command's data and execute function using its name.
			const command = client.commands.get(commandName);
			if (!command) return;

			// Retrieves a collection of user IDs of users that used the command recently.
			const timestamps = client.cooldowns.get(commandName);

			// Gets the cooldown duration in milliseconds.
			const cooldownDuration = (command.cooldown ?? DEFAULT_COOLDOWN_DURATION) * MS_IN_ONE_S;
			const userId = user.id;

			/*
			Checks if the user ID is in the collection, i.e. whether the user has used the command
			recently.
			*/
			if (timestamps.has(userId)) {
				/*
				Gets the timestamp of when the user used the command and calculates when the
				cooldown will expire.
				*/
				const expirationTimestamp = timestamps.get(userId) + cooldownDuration;

				/*
				Converts the timestamp to seconds to display to the user. Math.ceil is used to show
				a slightly longer countdown as there is a small delay from the countdown ending to
				the cooldown reply being deleted.
				*/
				const expiredTimestampInSeconds = Math.ceil(expirationTimestamp / MS_IN_ONE_S);

				await interaction.reply({
					embeds: [
						{
							title: `${formatEmoji(timeEmojiId)} You are on cooldown!`,
							description: `Use this command <t:${expiredTimestampInSeconds}:R>.`,
							color: grey,
						},
					],
					ephemeral: true,
				});

				/*
				Deletes the cooldown reply after the cooldown expires. expirationTimestamp -
				Date.now() is used instead of cooldownDuration as there is a small delay from the
				cooldown reply being posted to this timeout starting.
				*/
				setTimeout(() => interaction.deleteReply(), expirationTimestamp - Date.now());
			}
			else {
				/*
				Adds the user's ID to the timestamps collection, along with a timestamp of when
				they used the command, and deletes their entry after the cooldown expires.
				*/
				timestamps.set(userId, Date.now());
				setTimeout(() => timestamps.delete(userId), cooldownDuration);

				/*
				Deletes a user's entry early, i.e. removes the cooldown if the command terminates
				(e.g. when the user passes an invalid option).
				*/
				const applyCooldown = await command.execute(interaction, client, user);
				if (applyCooldown === false) timestamps.delete(userId);

				let fullCommandName = interaction.commandName;
				// eslint-disable-next-line no-underscore-dangle
				if (interaction.options._subcommand) fullCommandName += ` ${interaction.options._subcommand}`;
				const channelName = interaction.channel.isDMBased() ? 'a DM channel' : `#${interaction.channel.name}`;

				console.log(`${user.tag} used /${fullCommandName} in ${channelName}.`);
			}
		}
		catch (error) {
			handleError(interaction, error);
		}
	}
	else if (interaction.isButton()) {
		try {
			// Retrieves the button's data and execute function using its custom ID.
			const button = client.buttons.get(interaction.customId);
			if (!button) return;

			await button.execute(interaction, client, user);

			const channelName = interaction.channel.isDMBased() ? 'a DM channel' : `#${interaction.channel.name}`;
			console.log(`${user.tag} used the ${button.id} button in ${channelName}.`);
		}
		catch (error) {
			handleError(interaction, error);
		}
	}
	else if (interaction.isAutocomplete()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.autocomplete(interaction);
		}
		catch (error) {
			console.log(chalk.redBright('[ERROR]'), error);
		}
	}
}

module.exports = { name, execute };
