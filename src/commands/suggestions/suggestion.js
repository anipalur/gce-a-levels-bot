const { SlashCommandBuilder } = require('discord.js');
const { Reply } = require('../../tools/common-replies.js');
const suggestionDecisions = require('../../data/suggestion-decisions.json');
const { suggestionTagExecute } = require('./suggestion-tag.js');
const { suggestionUntagExecute } = require('./suggestion-untag.js');
const { suggestionsChannelId } = require('../../config/channels.json');

/*
Generates an array of slash command choices ({ name: CHOICE_NAME, value: CHOICE_VALUE }) based on
the decisions in ../../data/suggestion-decisions.json
*/
const decisionChoices = Object.keys(suggestionDecisions).map(decision => ({ name: decision, value: decision }));

const data = new SlashCommandBuilder()
	.setName('suggestion')
	.setDescription('Manage suggestions.')
	.addSubcommand(subcommand => subcommand
		.setName('tag')
		.setDescription('Tag a suggestion.')
		.addStringOption(option => option
			.setName('tag')
			.setDescription('The tag to add.')
			.addChoices(...decisionChoices)
			.setRequired(true)))
	.addSubcommand(subcommand => subcommand
		.setName('untag')
		.setDescription('Untag a suggestion.')
		.addStringOption(option => option
			.setName('tag')
			.setDescription('The tag to remove.')
			.addChoices(...decisionChoices)
			.setRequired(true)));

async function execute(interaction, client, user) {
	const isSuggestion = interaction.channel?.parentId === suggestionsChannelId;
	if (!isSuggestion) {
		await interaction.reply({
			...new Reply().unavailable(
				'No suggestions to manage here!',
				`Use this command to manage suggestions in <#${suggestionsChannelId}>.`,
			),
			ephemeral: true,
		});
		return false;
	}

	const subcommand = interaction.options.getSubcommand();
	const tag = interaction.options.getString('tag');
	if (subcommand === 'tag') {
		await suggestionTagExecute(interaction, client, user, tag);
	}
	else if (subcommand === 'untag') {
		await suggestionUntagExecute(interaction, client, user, tag);
	}
}

module.exports = { data, execute };
