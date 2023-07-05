const { formatEmoji } = require('discord.js');
const getLogsThread = require('../../tools/get-logs-thread.js');
const watchConfirmation = require('../../tools/watch-confirmation.js');
const { Reply } = require('../../tools/common-replies.js');
const decisionMessages = require('../../data/suggestion-decisions.json');
const { botLogsChannelId, serverLogsThreadId } = require('../../config/channels.json');
const { blue } = require('../../config/colours.json');
const { editMessageEmojiId, hashtagEmojiId } = require('../../config/emojis.json');
const { stripIndents } = require('common-tags');

const subcommand = true;

async function suggestionTagExecute(interaction, client, user, tag) {
	const appliedTags = interaction.channel.appliedTags;
	const availableTags = interaction.channel.parent.availableTags;

	// Gets the ID of the tag matching the decision.
	const { id: decisionTagId } = availableTags.find(availableTag => availableTag.name === tag);

	const canTag = !appliedTags.includes(decisionTagId);
	if (!canTag) {
		await interaction.reply({
			...new Reply().unavailable(
				'You cannot tag this suggestion!',
				`This suggestion has already been tagged as '${tag}'.`,
			),
			ephemeral: true,
		});
		return false;
	}

	const tagSuggestionReply = await interaction.reply({
		...new Reply().lowConfirmation(
			stripIndents`
				Are you sure you want to add '${tag}' to this suggestion?
				This will also remove other decision tags added to this suggestion.
			`,
			'tag-suggestion',
			'Tag Suggestion',
		),
		ephemeral: true,
		fetchReply: true,
	});

	const hasConfirmed = await watchConfirmation(tagSuggestionReply, interaction);
	if (!hasConfirmed) return;

	await interaction.editReply(new Reply().working('Tagging this suggestion...'));

	// Gets an array of IDs of non-decision tags applied to the suggestion.
	const nonDecisionTagIds = appliedTags.filter(appliedTagId => {
		const { name: appliedTagName } = availableTags.find(availableTag => availableTag.id === appliedTagId);
		return !(appliedTagName in decisionMessages);
	});
	const tagsToApply = [...nonDecisionTagIds, decisionTagId];

	const suggestionThread = interaction.channel;
	await suggestionThread.setAppliedTags(tagsToApply, `${user.username} added '${tag}' to this suggestion.`);

	const decisionMessage = decisionMessages[tag].tag;

	// Sends a public update message that a tag has been added.
	await suggestionThread.send({
		embeds: [
			{
				title: `${formatEmoji(editMessageEmojiId)} Suggestion updated!`,
				description: decisionMessage,
				color: blue,
			},
		],
	});

	const serverLogsThread = getLogsThread(client, botLogsChannelId, serverLogsThreadId);
	await serverLogsThread.send({
		embeds: [
			{
				title: `${formatEmoji(editMessageEmojiId)} Suggestion updated!`,
				description: `<@${user.id}> added '${tag}' to a suggestion.`,
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
			'Suggestion updated!',
			decisionMessage,
		),
	);
}

module.exports = { subcommand, suggestionTagExecute };
