const { formatEmoji } = require('discord.js');
const { checkMarkEmojiId } = require('../config/emojis.json');

const id = 'cancel';

async function execute(interaction) {
	await interaction.update({
		content: `${formatEmoji(checkMarkEmojiId)} Cancelled!`,
		embeds: [],
		components: [],
	});
}

module.exports = { id, execute };
