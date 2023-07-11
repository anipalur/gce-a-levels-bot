const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, formatEmoji } = require('discord.js');
const getLogsThread = require('../tools/get-logs-thread.js');
const { botLogsChannelId, serverLogsThreadId, suggestionsChannelId } = require('../config/channels.json');
const { blue, green } = require('../config/colours.json');
const { downvoteEmojiId, hashtagEmojiId } = require('../config/emojis.json');
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

		const threadOwnerId = thread.ownerId;
		await thread.send({
			content: `<@${threadOwnerId}>`,
			embeds: [
				{
					title: `${formatEmoji(pinEmojiId)} Suggestion Guidelines`,
					description: stripIndents`
						Thanks for posting a suggestion, <@${threadOwnerId}>!

						Please address these points in your suggestion:
						- Elaborate on your suggestion!
						- How do you want us to improve on this?
						- Why do you want to make this change?
						- How might this change influence the server?
						- What steps can the moderator team take to make this change? 
						- Is there anything else you would like to suggest?

						Try to keep all suggestions on-topic and relevant!
						Any abuse of this suggestion system will result in moderation actions being taken against you, so watch out!
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
							name: `${formatEmoji(hashtagEmojiId)} Suggestion Post`,
							value: `<#${thread.id}>`,
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
