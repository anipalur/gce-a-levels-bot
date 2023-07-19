const { ComponentType, formatEmoji } = require('discord.js');
const { MS_IN_FIFTEEN_MINUTES } = require('../data/constants.json');
const { grey } = require('../config/colours.json');
const { timeEmojiId } = require('../config/emojis.json');
const { stripIndents } = require('common-tags');

/**
 * Creates a Promise-based collector on a confirmation message.
 * @param {import('discord.js').Message} replyMessage - The confirmation message.
 * @param {import('discord.js').Interaction} interaction - The confirmation interaction.
 * @returns {boolean} Whether the user confirmed the action or not.
 */
async function watchConfirmation(replyMessage, interaction) {
	try {
		/*
		Creates a Promise-based collector on the confirmation message that rejects if no interaction
		is received within fifteen minutes.
		*/
		const componentInteraction = await replyMessage.awaitMessageComponent({
			componentType: ComponentType.Button,
			idle: MS_IN_FIFTEEN_MINUTES,
		});

		/*
		Returns false if the user cancels the action. Updating the confirmation message is then handled
		by ../buttons/cancel.js
		*/
		const notCancel = componentInteraction.customId !== 'cancel';

		const isSameUser = componentInteraction.user.id === interaction.user.id;
		return notCancel && isSameUser;
	}
	catch {
		await interaction.editReply({
			content: '',
			embeds: [
				{
					title: `${formatEmoji(timeEmojiId)} Timed out!`,
					description: stripIndents`
						You did not respond in time!
						Use the command or button again.
					`,
					color: grey,
				},
			],
			components: [],
		});
		return false;
	}
}

module.exports = watchConfirmation;
