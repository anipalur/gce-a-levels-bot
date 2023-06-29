const { formatEmoji, SlashCommandBuilder } = require('discord.js');
const { Reply } = require('../tools/common-replies.js');
const { BYTES_IN_MB, MS_IN_ONE_S } = require('../data/constants.json');
const { botCommandsChannelId } = require('../config/channels.json');
const { blue } = require('../config/colours.json');
const { barChartEmojiId, chatbotEmojiId, memorySlotEmojiId, pingPongEmojiId } = require('../config/emojis.json');
const { signalEmojiId, timeEmojiId, wifiExcellentEmojiId, wifiFairEmojiId } = require('../config/emojis.json');
const { wifiGoodEmojiId, wifiWeakEmojiId } = require('../config/emojis.json');
const { stripIndents } = require('common-tags');

function getConnectionStrength(latency) {
	if (latency < 100) {
		return { emoji: wifiExcellentEmojiId, rating: 2 };
	}
	else if (latency < 250) {
		return { emoji: wifiGoodEmojiId, rating: 1.5 };
	}
	else if (latency < 500) {
		return { emoji: wifiFairEmojiId, rating: 1 };
	}
	return { emoji: wifiWeakEmojiId, rating: 0.5 };
}

const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription("Get the bot's ping and connection status.");

const global = true;

async function execute(interaction, client) {
	const workingReply = {
		...new Reply().working('Pinging...'),
		fetchReply: true,
	};

	if (interaction.channelId !== botCommandsChannelId) workingReply.ephemeral = true;
	const sentReply = await interaction.reply(workingReply);

	// Gets the round trip latency - the time taken from sending the command to receiving a response.
	const roundTripLatency = Math.abs(sentReply.createdTimestamp - interaction.createdTimestamp);
	const { emoji: roundTripLatencyEmoji, rating: roundTripLatencyRating } = getConnectionStrength(roundTripLatency);

	// Gets the websocket heartbeat - the average interval of a regularly sent signal.
	const wsHeartbeat = Math.abs(client.ws.ping);
	const { emoji: wsHeartbeatEmoji, rating: wsHeartbeatRating } = getConnectionStrength(wsHeartbeat);

	const lastRestartTimestamp = Math.round((Date.now() - client.uptime) / MS_IN_ONE_S);

	const memoryInUse = Math.round(process.memoryUsage().heapUsed / BYTES_IN_MB);
	const totalMemory = Math.round(process.memoryUsage().heapTotal / BYTES_IN_MB);

	let status = 'Bot is functioning normally!';
	const connectionRating = roundTripLatencyRating + wsHeartbeatRating;

	// If the combined rating is too low, i.e. the connection is poor.
	if (connectionRating < 3) status += ' However, responses may be delayed.';

	await interaction.editReply({
		embeds: [
			{
				title: `${formatEmoji(pingPongEmojiId)} Pong!`,
				fields: [
					{
						name: `${formatEmoji(signalEmojiId)} Connection`,
						value: stripIndents`
							${formatEmoji(roundTripLatencyEmoji)} Round Trip Latency: \`${roundTripLatency}\` ms
							${formatEmoji(wsHeartbeatEmoji)} Websocket Heartbeat: \`${wsHeartbeat}\` ms
						`,
						inline: true,
					},
					{
						name: `${formatEmoji(barChartEmojiId)} Statistics`,
						value: stripIndents`
							${formatEmoji(timeEmojiId)} Last Restart: <t:${lastRestartTimestamp}:R>
							${formatEmoji(memorySlotEmojiId)} Memory: \`${memoryInUse}\`/\`${totalMemory}\` MB
						`,
						inline: true,
					},
					{
						name: `${formatEmoji(chatbotEmojiId)} Bot Status`,
						value: status,
					},
				],
				color: blue,
			},
		],
	});
}

module.exports = { data, global, execute };
