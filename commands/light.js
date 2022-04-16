const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('light')
        .setDescription('Provides the most recent swgoh.gg roster data for Child of Light'),
    async execute(interaction) {
        await interaction.deferReply();
        const { data } = await fetch('http://api.swgoh.gg/guild-profile/BUGhAu3zT2-QZXaCAaeTYQ/').then(response => response.json());
        interaction.editReply({ content: data.name + "\n" + data.external_message });
    },
};