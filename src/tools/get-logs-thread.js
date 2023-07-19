/**
 * @typedef {import('discord.js').Snowflake} Snowflake
 */

/**
 * Gets the full ThreadChannel of a logs thread.
 * @param {import('discord.js').Client} client - The bot client.
 * @param {Snowflake} botLogsChannelId - The channel ID of the logs channel.
 * @param {Snowflake} logsThreadId - The thread ID of a logs thread.
 * @returns {import('discord.js').ThreadChannel} - The full ThreadChannel of a logs thread.
 */
function getLogsThread(client, botLogsChannelId, logsThreadId) {
	const botLogsChannel = client.channels.cache.get(botLogsChannelId);
	const logsThread = botLogsChannel.threads.cache.get(logsThreadId);
	return logsThread;
}

module.exports = getLogsThread;
