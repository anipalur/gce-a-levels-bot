const fs = require('node:fs');

/**
 * Gets an array of .js file paths in a folder (including all subfolders).
 * @param {string} folder - The folder to get files from.
 * @param {string[]} [filePaths=[]] - An array of additional file paths to include.
 * @returns {string[]} - An array of .js file paths in the folder.
 */
function getFiles(folder, filePaths = []) {
	// Gets all files and subfolders in a folder.
	const files = fs.readdirSync(folder);

	for (const file of files) {
		const filePath = `${folder}\\${file}`;
		if (fs.statSync(filePath).isDirectory()) {
			// Recursively calls the function if a subfolder is found.
			getFiles(filePath, filePaths);
		}
		else if (filePath.endsWith('.js')) {
			filePaths.push(filePath);
		}
	}

	return filePaths;
}

module.exports = getFiles;
