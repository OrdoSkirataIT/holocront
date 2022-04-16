const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('potentials')
        .setDescription('Provides the most recent swgoh.gg roster data for Potentium Potentials'),
    async execute(interaction) {
        await interaction.deferReply();
        const { data } = await fetch('http://api.swgoh.gg/guild-profile/MrtQD_EMQHyw4dWOBOMMJQ/').then(response => response.json());
        interaction.editReply({ content: data.name + "\n" + data.external_message });
    },
};