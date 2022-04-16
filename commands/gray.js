const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gray')
        .setDescription('Provides the most recent swgoh.gg roster data for Child of Gray'),
    async execute(interaction) {
        await interaction.deferReply();
        const { data } = await fetch('http://api.swgoh.gg/guild-profile/qI_Xd-ieQ96mlvaQ4ZFNUQ/').then(response => response.json());
        interaction.editReply({ content: data.name + "\n" + data.external_message });
    },
};