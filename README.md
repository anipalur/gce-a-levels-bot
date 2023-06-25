# GCE A Levels Discord Bot <br/> [![discord-badge]][discord-link] [![discord-js-badge]][discord-js-link] [![codefactor-badge]][codefactor-link] ![maintenance-badge]

A powerful, multi-purpose Discord bot that manages the [GCE A Levels Discord server][discord-link]!
This bot manages the reputation system, subjects, moderation commands, tickets and more!
This bot also uses the latest Discord API features, including modals, autocomplete, select menus and context menu commands!

> **Note**  
> This project is a work in progress. Expect significant changes in the future as we continue developing!

## ✨ Features

- [ ] Advanced reputation system, including reputation profiles, a global and subject leaderboard, an upvote system and reputation management commands.
- [ ] Subject management, allowing staff to add or modify subject channels and helper roles, enable or disable subjects and manage subject information.
- [ ] Moderation commands with AutoMod integration.
- [ ] Ticket system using private threads.
- [ ] Reddit-style suggestion and feedback system using forum channels.
- [ ] Server management commands.
- [ ] Modular architecture, allowing staff to enable or disable bot features.
- [ ] Past paper search, AI chat, utility commands and more!

## 📖 Quickstart

Follow these steps to get started with running the bot.

### 📦 Prerequisites

- Git:
  - [Git for Windows](https://git-scm.com/download/win "Download Git for Windows.")
  - [Git for macOS](https://git-scm.com/download/mac "Download Git for macOS.")
  - [Git for Linux](https://git-scm.com/download/linux "Download Git for Linux.")
- Node.js (v16.9.0 or higher):
  - [Node.js for Windows](https://nodejs.org "Download Node.js for Windows.")
  - [Node.js for macOS](https://nodejs.org "Download Node.js for macOS.")
  - [Node.js for Linux](https://nodejs.org/en/download/package-manager "Download Node.js for Linux.")
- A [Discord bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot "Learn how to create a Discord bot application.").
  - <a name="copy-your-token">Make sure to [copy your token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-bot-s-token "Learn how to copy your token.")
    under `Bot` > `Build-A-Bot` > `Token`.</a>
  - Make sure to [enable all privileged gateway intents](https://discord.com/developers/docs/topics/gateway#enabling-privileged-intents "Learn how to enable privileged gateway intents.")
    (Presence, Server Members and Message Content) under `Bot` > `Privileged Gateway Intents`.
  - Don't forget to [invite your bot](https://discordjs.guide/preparations/adding-your-bot-to-servers.html "Learn how to invite your bot to a server.") to your server!  
    Need a server to test the bot? Use [our server template](https://discord.new/3xtyZGkv5spR "Create a server using our template.").
- A [MongoDB Atlas cluster](https://www.mongodb.com/docs/atlas/getting-started "Learn how to create a MongoDB Atlas cluster.").
  - If you plan to host your bot elsewhere, make sure to [add `0.0.0.0/0` as an IP address](https://www.mongodb.com/docs/atlas/security/add-ip-address-to-list "Learn how to add an IP address.").
    This will allow access from anywhere.
  - <a name="copy-your-connection-string">Make sure to [copy your connection string](https://www.mongodb.com/docs/guides/atlas/connection-string "Learn how to copy your connection string.").</a>

### 📥 Installation

Follow these steps to install this project on your system.

1. Open a CLI (e.g. Command Prompt).
2. Navigate to a folder you want to clone the repository into.
3. Clone this repository.

    ```bash
    git clone https://github.com/anipalur/gce-a-levels-bot.git
    ```

4. Navigate to the project folder.

    ```bash
    cd gce-a-levels-bot
    ```

5. Install all dependencies.

    ```bash
    npm install
    ```

### 🔧 Configuration

#### 🔑 Environment Variables

You will need the following secrets:

> **Warning**  
> Do not share these secrets with anyone. With your secrets, a bad actor could use your bot for malicious purposes.

- `DISCORD_BOT_TOKEN`  
  This is the [token you copied earlier](#copy-your-token "Learn how to copy your token.").
- `MONGODB_CONNECTION_STRING`  
  This is the [connection string you copied earlier](#copy-your-connection-string "Learn how to copy your connection string.").

Follow these steps to set your environment variables using your secrets.

1. Rename the [`.env.example`](./.env.example "Open the .env.example file.") file to `.env`.
2. Enter your secrets accordingly.
3. Save the file.
4. Restart your IDE.

#### 🪪 IDs

You will need the following IDs:

> **Note**  
> Visit [this page](https://support.discord.com/hc/articles/206346498 "Learn how to get your IDs.") to learn how to get your IDs.
>
> <details>
>
> <summary>Can't get your IDs?</summary>
>
> 1. Mention the bot (@bot-name), channel (#channel-name) or role (@role-name).
> 2. Add a backslash (<kbd> \ </kbd>) before the mention.
> 3. Send the message.
> 4. Copy the number. This is the corresponding ID.
>  
> </details>

Follow these steps to set your IDs.

1. Navigate to `src` > `config`.
2. Rename the following files accordingly:
    1. [`bot-example.json`](./src/config/bot-example.json "Open the bot-example.json file.") > `bot.json`
    2. [`channels-example.json`](./src/config/channels-example.json "Open the channels-example.json file.") > `channels.json`
    3. [`roles-example.json`](./src/config/roles-example.json "Open the roles-example.json file.") > `roles.json`
3. Enter your IDs.
    1. Enter your bot (under client) and server (under guild) IDs in [`bot.json`](./src/config/bot.json "Open the bot.json file.").
    2. Enter your channel IDs in [`channels.json`](./src/config/channels.json "Open the channels.json file.").
    3. Enter your role IDs in [`roles.json`](./src/config/roles.json "Open the roles.json file.").
4. Save all files.

### 🚨 Checking your Environment

Check your environment is ready to run the bot.

```bash
npm run check-env
```

You should receive a success message if your environment has been configured correctly.

### 🚀 Running the Bot

Deploy all application commands.

```bash
npm run deploy-commands
```

Start the bot.

```bash
npm run test
```

Alternatively, [keep the process running with PM2](https://discordjs.guide/improving-dev-environment/pm2.html "Learn more about running your bot with PM2."):

```bash
npm run start
```

To stop the process, run the following command.

```bash
npm run stop
```

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md "View the CONTRIBUTING.md file.") to get started.

## ❓ Support

Need help with this project? See [SUPPORT.md](./.github/SUPPORT.md "View the SUPPORT.md file.") for more information.

## 🖇️ Related

Check out the [r/IGCSE Discord bot](https://github.com/Sachin-dot-py/r-IGCSEBot "Learn more about the r/IGCSE Discord bot!")!

## 🙏 Attribution

Copyright for portions of this project is held by Sanctuary, 2017 - 2022 as part of the [discord.js guide](https://github.com/discordjs/guide "Learn more about the discord.js guide.") project.
Said portions are provided under the terms of the MIT license.

## ⚖️ License

This project is licensed under the terms of the MIT license.
See [LICENSE](./LICENSE "View the LICENSE file.") for more information.

[discord-badge]: https://img.shields.io/discord/860720106938433556?style=flat-square&logo=discord&label=Discord&labelColor=35393E&color=5865F2
[discord-js-badge]: https://img.shields.io/github/package-json/dependency-version/anipalur/gce-a-levels-bot/discord.js?style=flat-square&label=discord.js%20Version&labelColor=35393E&color=5865F2
[codefactor-badge]: https://img.shields.io/codefactor/grade/github/anipalur/gce-a-levels-bot/main?style=flat-square&label=Code%20Quality&labelColor=35393E
[maintenance-badge]: https://img.shields.io/badge/Maintained%3F-Yes-44CC11?style=flat-square&labelColor=35393E

[discord-link]: https://discord.gg/eFpRcRzcf7 "Join the GCE A Levels Discord server!"
[discord-js-link]: https://discord.js.org "Learn more about discord.js!"
[codefactor-link]: https://www.codefactor.io/repository/github/anipalur/gce-a-levels-bot "View our code quality grade."
