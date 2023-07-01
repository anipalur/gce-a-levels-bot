# Contributing Guidelines

Firstly, thanks for considering contributing to the GCE A Levels Discord bot!

Development is primarily supported by our bot developers, but we love to receive contributions from the community!
There are many ways to contribute, from submitting bug reports and feature requests to writing code to incorporate into the bot itself.
Following these guidelines helps to communicate that you respect the time of the bot developers maintaining and developing this project.

> **Note**  
> By participating in our community, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md "View the Code of Conduct.").

## ✨ First Steps

A contribution can be as small as fixing a spelling mistake or as big as rewriting the entire codebase (remember when slash commands were released?).

Here are a few ways to get started.
Make sure to install the project locally using the [quickstart guide](./README.md#-quickstart "View the quickstart guide.")!

- **Leave feedback!**  
  Let others know your thoughts about [new features][new-feature] or [enhancements][enhancement].
  Your opinions help us move this project forward!
- **Find bugs.**  
  Review [new features][new-feature] or [enhancements][enhancement] for bugs.
  [File a bug report][file-bug-report] if you find any!
- **Review bugs.**  
  Try reproducing bugs from [unassigned issues](https://github.com/anipalur/gce-a-levels-bot/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee "View unassigned issues."). If valid, leave a comment to let others know.
- **Review patches.**  
  Look through the changes a patch makes, and check if they meet these guidelines. Leave feedback where necessary!
- **Fix bugs.**  
  Issues labelled as [`good-first-issue`](https://github.com/anipalur/gce-a-levels-bot/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22 "View 'good first issue' issues.") are great for beginners.  

## 🐛 Reporting Bugs

**See [SECURITY.md](./.github/SECURITY.md "View the SECURITY.md file.") if you've found a security vulnerability.**

[File a bug report][file-bug-report] using GitHub Issues.  
See [SUPPORT.md][support] for more information.

## 💡 Feature or Enhancement Requests

[Request a feature](https://github.com/anipalur/gce-a-levels-bot/issues/new?assignees=&labels=new+feature&projects=&template=feature-request.yml "Request a feature.")
or [enhancement](https://github.com/anipalur/gce-a-levels-bot/issues/new?assignees=&labels=enhancement&projects=&template=enhancement-request.yml "Request an enhancement.") using GitHub Issues.  
See [SUPPORT.md][support] for more information.

## 🔀 Development Workflow

This project follows [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow "Learn more about GitHub flow.").
All contributions must be submitted through a [pull request](https://github.com/anipalur/gce-a-levels-bot/pulls "View all pull requests.").

## 🔍 Code Review Process

All bot developers are requested for review when a new pull request is created.
Pull requests are only merged into the [`main`](https://github.com/anipalur/gce-a-levels-bot/tree/main "View the main branch.") branch
after all bot developers approve the changes and all tests pass.

We'll try our best to respond within 1 week.
If you don't receive a response within 1 week, mention @anipalur in a comment.

## 📜 Code Style

Some settings regarding code style for Visual Studio Code (e.g. indentation) are applied from [settings.json](./.vscode/settings.json "View the settings.json file.").

### 🔧 JavaScript

[ESLint](https://github.com/eslint/eslint "Learn more about ESLint.") is used to lint JavaScript.
The rules specified in [.eslintrc.json](./.eslintrc.json "View the .eslintrc.json file.") apply,
but you may disable rules for short segments of code if necessary.  
Don't forget to install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint "View the ESLint extension.")
for Visual Studio Code!

Lint all `.js` files in the `src` folder using this npm script:

```bash
npm run lint:js
```

### 📃 Markdown

[markdownlint](https://github.com/DavidAnson/markdownlint "Learn more about markdownlint.") is used to lint Markdown.
The rules specified in [.markdownlint.json](./.markdownlint.json "View the .markdownlint.json file.") apply,
but you may disable rules for short segments of Markdown if necessary.  
Don't forget to install the [markdownlint extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint "View the markdownlint extension.")
for Visual Studio Code!

Lint all `.md` files using this npm script:

```bash
npm run lint:md
```

### 🔡 Naming Conventions

camelCase should be used for most variables.  
SCREAMING_SNAKE_CASE should be used for constants.  
kebab-case should be used for file and folder names.

### 💬 Comments

Use comments only where necessary! Avoid redundant comments.  
Comments should be used to *explain* code, not *describe* what it does.  
A full stop (<kbd> . </kbd>) must be used at the end of a comment,
but should not be used if it introduces confusion (e.g. after a version number).

### 🤷 Other Guidelines

- Follow this structure for command and button files:  
  Imports > Functions > Command or Button Data > Command or Button Configuration > Execute Function
- Group related lines of code together.
- Use newlines to separate different different groups of code.
- Sort imports, object properties, etc. by importance or alphabetically otherwise.
- Prioritise readability over short code. Use descriptive variable names and methods.
- Pull out reusable code into separate functions.
- Avoid [magic numbers](https://en.wikipedia.org/wiki/Magic_number_(programming) "Learn more about magic numbers.").
  Instead, use constants from [constants.json](./src/data/constants.json "View the constants.json file.") or [Discord API Types](https://discord-api-types.dev "Visit Discord API Types.").

## 📝 Commit Message Guidelines

Follow these [commit message guidelines](https://gist.github.com/robertpainsi/b632364184e70900af4ab688decf6f53 "View our commit message guidelines.").

## 👥 Community

Check out [our Discord server][discord-link] and say hello!

## 📖 Helpful Resources

Here are some helpful resources to get started contributing:

- discord.js Resources:
  - [discord.js Documentation](https://old.discordjs.dev/#/docs "Visit the discord.js documentation.")
  - [discord.js Guide](https://discordjs.guide "Visit the discord.js guide.")
  - [discord.js server](<https://discord.gg/djs> "Join the discord.js server.")
- Discord Developer Resources:
  - [Discord Developer documentation](https://discord.com/developers/docs/intro "Visit the Discord Developer documentation.")
  - [Discord Developers server](<https://discord.gg/discord-developers> "Join the Discord Developers server.")
  - [Discord API server](<https://discord.gg/discord-api> "Join the Discord API server.")
- Git and GitHub Resources:
  - [GitHub Training Manual](https://githubtraining.github.io/training-manual/book.pdf "View the GitHub Training Manual.")
  - [Git Cheat Sheet](https://training.github.com/downloads/github-git-cheat-sheet.pdf "View the Git Cheat Sheet.")
  - [GitHub Flavoured Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax "Learn more about writing on GitHub.")
  - [GitHub Skills](https://skills.github.com "Learn how to use GitHub with GitHub Skills courses.")
- Other Resources:
  - [MDN's JavaScript documentation](https://developer.mozilla.org/docs/Web/JavaScript "Visit MDN's JavaScript documentation.")
  - [regex101](https://regex101.com "Visit regex101.")
  - [Stack Overflow](https://stackoverflow.com/tags/discord.js "View Stack Overflow posts tagged with discord.js!")

## ⚡ Tips

Here are some final tips to make your contributions more useful:

- **Ask for help!**    
  Don't be afraid to ask for help in [our Discord server][discord-link].
- **Before committing, make sure your idea has support.**  
  Get feedback on a potential patch or new feature before implementing it.
- **Focus on quality, not quantity.**  
  Focus on a few issues or features at a time and see them through from start to end.
- **Respond to feedback!**  
  Don't be afraid to engage in a discussion.
- **Be patient.**  
  We're all human and have many commitments, so your contribution might not be reviewed quickly.

[discord-link]: https://discord.gg/eFpRcRzcf7 "Join the GCE A Levels Discord server!"
[new-feature]: https://github.com/anipalur/gce-a-levels-bot/issues?q=is%3Aopen+is%3Aissue+label%3A%22new+feature%22 "View 'new feature' issues."
[enhancement]: https://github.com/anipalur/gce-a-levels-bot/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement "View 'enhancement' issues."
[file-bug-report]: https://github.com/anipalur/gce-a-levels-bot/issues/new?assignees=&labels=bug&projects=&template=bug-report.yml "File a bug report."
[support]: ./.github/SUPPORT.md "View the SUPPORT.md file."
