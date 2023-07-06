const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, formatEmoji } = require('discord.js');
const getLogsThread = require('../tools/get-logs-thread.js');
const suggestionGuidelines = require('../data/suggestion-guidelines.json');
const { botLogsChannelId, serverLogsThreadId, suggestionsChannelId } = require('../config/channels.json');
const { blue, green } = require('../config/colours.json');
const { downvoteEmojiId, hashtagEmojiId, infoEmojiId } = require('../config/emojis.json');
const { newMessageEmojiId, pinEmojiId, upvoteEmojiId } = require('../config/emojis.json');
const { stripIndents } = require('common-tags');
const chalk = require('chalk');

/*
eslint-disable no-console
-- A console log is needed to log when a suggestion is posted.
*/

const closeSuggestionRow = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('close-suggestion')
			.setLabel('Close Suggestion')
			.setStyle(ButtonStyle.Secondary),
	);

const name = Events.ThreadCreate;

async function execute(thread, newlyCreated) {
	if (thread.parentId !== suggestionsChannelId) return;
	if (!newlyCreated) return;

	try {
		await thread.join();

		const suggestionForum = thread.parent;
		console.log(`${thread.name} was posted in #${suggestionForum.name}.`);

		const starterMessage = await thread.fetchStarterMessage();
		await starterMessage.react(upvoteEmojiId);
		await starterMessage.react(downvoteEmojiId);
		await starterMessage.pin('To pin the starter message.');

		/*
		Gets the name of the first tag applied to the post since thread.appliedTags is just an array of
		tag IDs.
		*/
		const { name: tagName } = suggestionForum.availableTags.find(tag => thread.appliedTags.includes(tag.id));

		// Gets the guidelines for this tag (if they exist) and formats them into an unordered list.
		const guidelines = suggestionGuidelines[tagName]?.map(tag => `- ${tag}`).join('\n')
			?? '\nUnable to retrieve more guidelines for this tag.';

		const threadOwnerId = thread.ownerId;

		await thread.send({
			content: `<@${threadOwnerId}>`,
			embeds: [
				{
					title: `${formatEmoji(pinEmojiId)} Suggestion Guidelines`,
					description: stripIndents`
						Thanks for posting a suggestion, <@${threadOwnerId}>!

						Please make sure you follow these guidelines:
						- Elaborate on your suggestion!
						${guidelines}
					`,
					color: green,
				},
			],
			allowedMentions: { users: [threadOwnerId] },
			components: [closeSuggestionRow],
		});

		const serverLogsThread = getLogsThread(thread.client, botLogsChannelId, serverLogsThreadId);
		await serverLogsThread.send({
			embeds: [
				{
					title: `${formatEmoji(newMessageEmojiId)} Suggestion posted!`,
					description: `<@${threadOwnerId}> posted a suggestion.`,
					fields: [
						{
							name: `${formatEmoji(hashtagEmojiId)} Suggestion Thread`,
							value: `<#${thread.id}>`,
							inline: true,
						},
						{
							name: `${formatEmoji(infoEmojiId)} Suggestion Tag`,
							value: tagName,
							inline: true,
						},
					],
					color: blue,
					footer: { text: `User ID: ${threadOwnerId}` },
				},
			],
		});
	}
	catch (error) {
		console.log(chalk.redBright('[ERROR]'), error);
	}
}

module.exports = { name, execute };
