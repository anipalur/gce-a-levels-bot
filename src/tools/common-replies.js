const { ActionRowBuilder, ButtonBuilder, ButtonStyle, formatEmoji } = require('discord.js');
const { blue, green, grey, red } = require('../config/colours.json');
const { checkMarkEmojiId, highImportanceEmojiId } = require('../config/emojis.json');
const { lowImportanceEmojiId, timeEmojiId, unavailableEmojiId } = require('../config/emojis.json');

function getActionRow(mainButtonId, mainButtonLabel, mainButtonStyle) {
	return new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId(mainButtonId)
				.setLabel(mainButtonLabel)
				.setStyle(ButtonStyle[mainButtonStyle]),
			new ButtonBuilder()
				.setCustomId('cancel')
				.setLabel('Cancel')
				.setStyle(ButtonStyle.Secondary),
		);
}

/**
 * Creates a new reply embed object.
 */
class Reply {
	constructor() {
		this.content = '';
		this.components = [];
	}

	/**
	 * Creates a 'high confirmation' reply.
	 * @param {string} confirmationDescription - The description of the confirmation.
	 * @param {string} mainButtonId - The main button custom ID.
	 * @param {string} mainButtonLabel - The main button label.
	 * @returns {Object} - A reply embed object.
	 */
	highConfirmation(confirmationDescription, mainButtonId, mainButtonLabel) {
		this.embeds = [
			{
				title: `${formatEmoji(highImportanceEmojiId)} Are you sure?`,
				description: confirmationDescription,
				color: red,
			},
		];
		this.components = [getActionRow(mainButtonId, mainButtonLabel, 'Danger')];
		return this;
	}

	/**
	 * Creates a 'low confirmation' reply.
	 * @param {string} confirmationDescription - The description of the confirmation.
	 * @param {string} mainButtonId - The main button custom ID.
	 * @param {string} mainButtonLabel - The main button label.
	 * @returns {Object} - A reply embed object.
	 */
	lowConfirmation(confirmationDescription, mainButtonId, mainButtonLabel) {
		this.embeds = [
			{
				title: `${formatEmoji(lowImportanceEmojiId)} Are you sure?`,
				description: confirmationDescription,
				color: blue,
			},
		];
		this.components = [getActionRow(mainButtonId, mainButtonLabel, 'Primary')];
		return this;
	}

	/**
	 * Creates a 'success' reply.
	 * @param {string} successTitle - The title of the success event.
	 * @param {string} successDescription - The description of the success event.
	 * @returns {Object} - A reply embed object.
	 */
	success(successTitle, successDescription) {
		this.embeds = [
			{
				title: `${formatEmoji(checkMarkEmojiId)} ${successTitle}`,
				description: successDescription,
				color: green,
			},
		];
		return this;
	}

	/**
	 * Creates a 'working' reply.
	 * @param {string} workingDescription - The description of the working event.
	 * @returns {Object} A reply embed object.
	 */
	working(workingDescription) {
		this.embeds = [
			{
				title: `${formatEmoji(timeEmojiId)} Give us a moment...`,
				description: workingDescription,
				color: grey,
			},
		];
		return this;
	}

	/**
	 * Creates an 'unavailable' reply.
	 * @param {string} successTitle - The title of the unavailable event.
	 * @param {string} successDescription - The description of the unavailable event.
	 * @returns {Object} - A reply embed object.
	 */
	unavailable(unavailableTitle, unavailableDescription) {
		this.embeds = [
			{
				title: `${formatEmoji(unavailableEmojiId)} ${unavailableTitle}`,
				description: unavailableDescription,
				color: red,
			},
		];
		return this;
	}
}

module.exports = { Reply };
