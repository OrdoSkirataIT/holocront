const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allies')
        .setDescription('Provides the most recent swgoh.gg roster data for Allies of the Force'),
    async execute(interaction) {
        await interaction.deferReply();
        const { data } = await fetch('http://api.swgoh.gg/guild-profile/pIc8G4IAQIqb6yhdJbZLLA/').then(response => response.json());
        interaction.editReply({ content: data.name + "\n" + data.external_message });
    },
};