/**
 * @typedef {import('discord.js').GuildForumTag} GuildForumTag
 */

/**
 * Gets the full GuildForumTag of the first tag applied to a forum post.
 * @param {import('discord.js').Snowflake[]} appliedTags - The post's applied tags.
 * @param {GuildForumTag[]} availableTags - The parent forum channel's available tags.
 * @returns {GuildForumTag} - The full GuildForumTag of the first tag applied to the post.
 */
function getForumTag(appliedTags, availableTags) {
	const firstTag = availableTags.find(tag => appliedTags.includes(tag.id));
	return firstTag;
}

module.exports = getForumTag;
