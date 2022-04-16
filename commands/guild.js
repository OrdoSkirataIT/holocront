const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guild')
        .setDescription('Provides the roster data for the specified guild.'),
    async execute(interaction) {
        await interaction.reply('This is the Allies of the Force placeholder!');
    },
};