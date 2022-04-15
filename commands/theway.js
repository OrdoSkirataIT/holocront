const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('where')
        .setDescription('Shows you the way.'),
    async execute(interaction) {
        await interaction.reply('This is the way.');
    },
};