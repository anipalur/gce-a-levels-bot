/**
 * Checks whether a member has certain roles.
 * @param {import('discord.js').Collection} memberRoles - The roles the member has.
 * @param {import('discord.js').Snowflake[]} rolesToCheck - An array of roles to check.
 * @param {string} [type='any'] - The type of check - either any (default) or all.
 * @returns {boolean} - Whether the member has the specified roles or not.
 */
function checkRoles(memberRoles, rolesToCheck, type = 'any') {
	if (type === 'all') {
		return rolesToCheck.every(role => memberRoles.has(role));
	}
	else if (type === 'any') {
		return rolesToCheck.find(role => memberRoles.has(role));
	}
}

module.exports = checkRoles;
