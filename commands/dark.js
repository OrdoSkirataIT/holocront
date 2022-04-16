const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dark')
        .setDescription('Provides the most recent swgoh.gg roster data for Child of Dark'),
    async execute(interaction) {
        await interaction.deferReply();
        const { data } = await fetch('http://api.swgoh.gg/guild-profile/XtK7lmVxQqWfeDpBsmG_HA/').then(response => response.json());
        interaction.editReply({ content: data.name + "\n" + data.external_message });
    },
};