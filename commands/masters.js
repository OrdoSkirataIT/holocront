const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('masters')
        .setDescription('Provides the most recent swgoh.gg roster data for Potentium Masters'),
    async execute(interaction) {
        await interaction.deferReply();
        const { data } = await fetch('http://api.swgoh.gg/guild-profile/nhcU8fWtTMKRFOnAl5Umnw/').then(response => response.json());
        interaction.editReply({ content: data.name + "\n" + data.external_message });
    },
};