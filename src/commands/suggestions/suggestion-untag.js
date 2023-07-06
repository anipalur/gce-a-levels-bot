const { formatEmoji } = require('discord.js');
const getLogsThread = require('../../tools/get-logs-thread.js');
const watchConfirmation = require('../../tools/watch-confirmation.js');
const { Reply } = require('../../tools/common-replies.js');
const decisionMessages = require('../../data/suggestion-decisions.json');
const { botLogsChannelId, serverLogsThreadId } = require('../../config/channels.json');
const { blue } = require('../../config/colours.json');
const { editMessageEmojiId, hashtagEmojiId } = require('../../config/emojis.json');

const subcommand = true;

async function suggestionUntagExecute(interaction, client, user, tag) {
	const suggestionPost = interaction.channel;
	const appliedTags = suggestionPost.appliedTags;
	const availableTags = suggestionPost.parent.availableTags;

	// Gets the ID of the tag matching the decision.
	const { id: decisionTagId } = availableTags.find(availableTag => availableTag.name === tag);

	const canUntag = appliedTags.includes(decisionTagId);
	if (!canUntag) {
		await interaction.reply({
			...new Reply().unavailable(
				'You cannot untag this suggestion!',
				`This suggestion has not been tagged as '${tag}' in the first place.`,
			),
			ephemeral: true,
		});
		return false;
	}

	const untagSuggestionReply = await interaction.reply({
		...new Reply().lowConfirmation(
			`Are you sure you want to remove '${tag}' from this suggestion?`,
			'untag-suggestion',
			'Untag Suggestion',
		),
		ephemeral: true,
		fetchReply: true,
	});

	const hasConfirmed = await watchConfirmation(untagSuggestionReply, interaction);
	if (!hasConfirmed) return;

	await interaction.editReply(new Reply().working('Untagging this suggestion...'));

	// Gets an array of IDs of non-decision tags applied to the suggestion.
	const tagsToApply = appliedTags.filter(appliedTagId => {
		const { name: appliedTagName } = availableTags.find(availableTag => availableTag.id === appliedTagId);
		return !(appliedTagName in decisionMessages);
	});
	await suggestionPost.setAppliedTags(tagsToApply, `${user.username} removed '${tag}' from this suggestion.`);

	const decisionMessage = decisionMessages[tag].untag;

	// Sends a public update message that a tag has been removed.
	await suggestionPost.send({
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
				description: `<@${user.id}> removed '${tag}' from a suggestion.`,
				fields: [
					{
						name: `${formatEmoji(hashtagEmojiId)} Suggestion Post`,
						value: `<#${suggestionPost.id}>`,
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

module.exports = { subcommand, suggestionUntagExecute };
