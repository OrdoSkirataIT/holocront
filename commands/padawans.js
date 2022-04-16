const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('padawans')
        .setDescription('Provides the most recent swgoh.gg roster data for Potentium Padawans'),
    async execute(interaction) {
        await interaction.deferReply();
        const { data } = await fetch('http://api.swgoh.gg/guild-profile/7CEc-w7GTu-96TBCbcPBVg/').then(response => response.json());
        interaction.editReply({ content: data.name + "\n" + data.external_message });
    },
};