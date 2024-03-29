//Declare constants that are required for the bot to run
const { REST } = require('@discordjs/rest');
const { Client, Intents, Collection, MessageEmbed, Message } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const wait = require('node:timers/promises').setTimeout;
const fetch = require('node-fetch');

//Create a client process for the bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Declare constants of commands, events, for the handlers
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

//Two for loops to make the second half of the event and command handlers
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());

}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//create a REST api call
const rest = new REST({ version: '9' }).setToken(token);

//register slash commands that were initialized by the loops
(async() => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

//log the bot in to begin working
client.login(token);

//Event listener for command responses with non slash command ignorer
client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand) return;

    try {
        //Allies of the Force command code
        if (interaction.commandName === 'allies') {
            await interaction.deferReply();
            const { data } = await fetch('http://api.swgoh.gg/guild-profile/pIc8G4IAQIqb6yhdJbZLLA/').then(response => response.json());
            await wait(500);

            const embed = new MessageEmbed()
                .setColor('#228B22')
                .setTitle(data.name + " - " + data.members.length + "/50")
                .setURL('https://swgoh.gg/g/15233/allies-of-the-force/')
                .setDescription("" + data.external_message)
                .setTimestamp()
            const embedTwo = new MessageEmbed()
                .setColor('#228B22')
                .setTimestamp()

            for (let i = 0; i < data.members.length; i++) {
                if (i < 25) {
                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embed.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embed.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }
                } else {

                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embedTwo.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embedTwo.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }

                }

            }
            await interaction.editReply({ embeds: [embed, embedTwo] });
        }
        //Child of Dark command code
        else if (interaction.commandName === 'dark') {
            await interaction.deferReply();
            const { data } = await fetch('http://api.swgoh.gg/guild-profile/XtK7lmVxQqWfeDpBsmG_HA/').then(response => response.json());
            await wait(500);
            const embed = new MessageEmbed()
                .setColor('black')
                .setTitle(data.name + " - " + data.members.length + "/50")
                .setURL('https://swgoh.gg/g/13000/child-of-dark/')
                .setDescription("" + data.external_message)

            const embedTwo = new MessageEmbed()
                .setColor('black')
                .setTimestamp()

            for (let i = 0; i < data.members.length; i++) {
                if (i < 25) {
                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embed.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embed.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }
                } else {

                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embedTwo.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embedTwo.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }

                }

            }
            await interaction.editReply({ embeds: [embed, embedTwo] });
        }
        //Child of Gray command code
        else if (interaction.commandName === 'gray') {
            await interaction.deferReply();
            const { data } = await fetch('http://api.swgoh.gg/guild-profile/qI_Xd-ieQ96mlvaQ4ZFNUQ/').then(response => response.json());
            await wait(500);
            const embed = new MessageEmbed()
                .setColor('#808080')
                .setTitle(data.name + " - " + data.members.length + "/50")
                .setDescription("" + data.external_message)
                .setURL("https://swgoh.gg/g/57175/child-of-gray/")

            const embedTwo = new MessageEmbed()
                .setColor('#808080')
                .setTimestamp()

            for (let i = 0; i < data.members.length; i++) {
                if (i < 25) {
                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embed.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embed.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }
                } else {

                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embedTwo.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embedTwo.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }

                }

            }
            await interaction.editReply({ embeds: [embed, embedTwo] });
        }
        //Child of Light command code
        else if (interaction.commandName === 'light') {
            await interaction.deferReply();
            const { data } = await fetch('http://api.swgoh.gg/guild-profile/BUGhAu3zT2-QZXaCAaeTYQ/').then(response => response.json());
            await wait(500);
            const embed = new MessageEmbed()
                .setColor('#FFA500')
                .setTitle(data.name + " - " + data.members.length + "/50")
                .setDescription("" + data.external_message)
                .setURL("https://swgoh.gg/g/6277/child-of-light/")

            const embedTwo = new MessageEmbed()
                .setColor('#FFA500')
                .setTimestamp()

            for (let i = 0; i < data.members.length; i++) {
                if (i < 25) {
                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embed.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embed.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }
                } else {

                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embedTwo.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embedTwo.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }

                }

            }
            await interaction.editReply({ embeds: [embed, embedTwo] });
        }
        //Potentium Masters command code
        else if (interaction.commandName === 'masters') {
            await interaction.deferReply();
            const { data } = await fetch('http://api.swgoh.gg/guild-profile/nhcU8fWtTMKRFOnAl5Umnw/').then(response => response.json());
            await wait(500);
            const embed = new MessageEmbed()
                .setColor('#0277bd')
                .setTitle(data.name + " - " + data.members.length + "/50")
                .setDescription("" + data.external_message)
                .setURL("https://swgoh.gg/g/62286/potentium-masters/")

            const embedTwo = new MessageEmbed()
                .setColor('#0277bd')
                .setTimestamp()

            for (let i = 0; i < data.members.length; i++) {
                if (i < 25) {
                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embed.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embed.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }
                } else {

                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embedTwo.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embedTwo.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }

                }

            }
            await interaction.editReply({ embeds: [embed, embedTwo] });
        }
        //Potentium Padawans command code
        else if (interaction.commandName === 'padawans') {
            await interaction.deferReply();
            const { data } = await fetch('http://api.swgoh.gg/guild-profile/7CEc-w7GTu-96TBCbcPBVg/').then(response => response.json());
            await wait(500);
            const embed = new MessageEmbed()
                .setColor('#008080')
                .setTitle(data.name + " - " + data.members.length + "/50")
                .setDescription("" + data.external_message)
                .setURL("https://swgoh.gg/g/41650/potentium-padawans/")

            const embedTwo = new MessageEmbed()
                .setColor('#008080')
                .setTimestamp()

            for (let i = 0; i < data.members.length; i++) {
                if (i < 25) {
                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embed.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embed.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }
                } else {

                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embedTwo.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embedTwo.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }

                }

            }
            await interaction.editReply({ embeds: [embed, embedTwo] });
        }
        //Potentium Potentials command code
        else if (interaction.commandName === 'potentials') {
            await interaction.deferReply();
            const { data } = await fetch('http://api.swgoh.gg/guild-profile/MrtQD_EMQHyw4dWOBOMMJQ/').then(response => response.json());
            await wait(500);
            const embed = new MessageEmbed()
                .setColor('#FFE5B4')
                .setTitle(data.name + " - " + data.members.length + "/50")
                .setDescription("" + data.external_message)
                .setURL("https://swgoh.gg/g/79649/potentium-potentials/")

            const embedTwo = new MessageEmbed()
                .setColor('#FFE5B4')
                .setTimestamp()

            for (let i = 0; i < data.members.length; i++) {
                if (i < 25) {
                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embed.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embed.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }
                } else {

                    if (data.members[i].member_level === 3 || data.members[i].member_level === 4) { //Bold for the officers
                        embedTwo.addField("(Officer)\n" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    } else {
                        embedTwo.addField("" + data.members[i].player_name, "GP: " + data.members[i].galactic_power, true);
                    }

                }

            }
            await interaction.editReply({ embeds: [embed, embedTwo] });
        }

    } catch (error) {
        if (error) console.error(error);

        await interaction.reply({ content: "An error occurred while executing that command.", ephemeral: true })
    }

});
