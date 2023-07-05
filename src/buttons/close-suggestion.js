const { formatEmoji } = require('discord.js');
const checkRoles = require('../tools/check-roles.js');
const getLogsThread = require('../tools/get-logs-thread.js');
const watchConfirmation = require('../tools/watch-confirmation.js');
const { Reply } = require('../tools/common-replies.js');
const { botLogsChannelId, serverLogsThreadId } = require('../config/channels.json');
const { blue } = require('../config/colours.json');
const { deleteMessageEmojiId, hashtagEmojiId } = require('../config/emojis.json');
const { adminRoleId, modRoleId } = require('../config/roles.json');
const { stripIndents } = require('common-tags');

const id = 'close-suggestion';

async function execute(interaction, client, user) {
	const memberRoles = interaction.member.roles.cache;
	const isStaff = checkRoles(memberRoles, [adminRoleId, modRoleId]);
	if (!isStaff) {
		await interaction.reply({
			...new Reply().unavailable(
				'You cannot close this suggestion!',
				'Only staff can close suggestions.',
			),
			ephemeral: true,
		});
		return;
	}

	const closeSuggestionReply = await interaction.reply({
		...new Reply().lowConfirmation(
			'Are you sure you want to close this suggestion?',
			'close-suggestion-confirm',
			'Close Suggestion',
		),
		ephemeral: true,
		fetchReply: true,
	});

	const hasConfirmed = await watchConfirmation(closeSuggestionReply, interaction);
	if (!hasConfirmed) return;

	const suggestionThread = interaction.channel;
	await interaction.editReply(new Reply().working('Closing this suggestion...'));

	// Sends a public update message once a suggestion is closed.
	await suggestionThread.send({
		embeds: [
			{
				title: `${formatEmoji(deleteMessageEmojiId)} Suggestion closed!`,
				description: stripIndents`
					This suggestion has been closed.
					Thanks for helping our community grow!
				`,
				color: blue,
			},
		],
	});

	// Archives AND locks the suggestion thread (only possible with ThreadChannel.edit()).
	await suggestionThread.edit({
		archived: true,
		locked: true,
		reason: `${user.username} closed this suggestion.`,
	});

	const serverLogsThread = getLogsThread(client, botLogsChannelId, serverLogsThreadId);
	await serverLogsThread.send({
		embeds: [
			{
				title: `${formatEmoji(deleteMessageEmojiId)} Suggestion closed!`,
				description: `<@${user.id}> closed a suggestion.`,
				fields: [
					{
						name: `${formatEmoji(hashtagEmojiId)} Suggestion Thread`,
						value: `<#${suggestionThread.id}>`,
					},
				],
				color: blue,
				footer: { text: `User ID: ${user.id}` },
			},
		],
	});

	await interaction.editReply(
		new Reply().success(
			'Suggestion closed!',
			'This suggestion has been closed.',
		),
	);
}

module.exports = { id, execute };
