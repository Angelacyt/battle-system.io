
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client } = require('discord.js');
const fs = require('node:fs');

//[建立/回覆 button] -> [建立 collector] -> [輸贏啦] -> [讀檔] -> [解析] -> [做事]  -> [回應] -> [存檔]

module.exports = {
    data: new SlashCommandBuilder().setName('battle').setDescription('Earn money with battle!'),
    async execute(client, interaction) {

        //建立 embed 和戰鬥模式的三個 button
        const buttonEmbed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle(`Yo~ battle!`);
            .setDescription('請選擇戰鬥模式')
        const rpsButton = new ButtonBuilder()
            .setCustomId('rps')  //猜拳
            .setLabel('猜拳')
            .setStyle(ButtonStyle.Primary);

        const bsButton = new ButtonBuilder()
            .setCustomId('big_small')  //比大小
            .setLabel('比大小')
            .setStyle(ButtonStyle.Primary);

        const ccButton = new ButtonBuilder()
            .setCustomId('circle_cross')  //圈圈叉叉
            .setLabel('圈圈叉叉')
            .setStyle(ButtonStyle.Primary);
        //將三個 button 都放入 row 中並回覆 embed 和 row
        const buttonRow = new ActionRowBuilder()
            .addComponents(
                rpsButton, bsButton, ccButton
            );

        //回覆
        interaction.reply({ embeds: [buttonEmbed], components: [buttonRow] });

        //建立 collector
        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

        //等待 collector 蒐集到玩家案的按鈕
        collector.on('collect', async collected => {

//選擇戰鬥模式

            let playerChoice;
            if (collected.customId === 'rps') {        
                const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Client } = require('discord.js');
                const fs = require('node:fs');

                //[建立/回覆 button] -> [建立 collector] -> [輸贏啦] -> [讀檔] -> [解析] -> [做事]  -> [回應] -> [存檔]

                module.exports = {
                data: new SlashCommandBuilder().setName('janken').setDescription('Earn money with janken!'),
                async execute(client, interaction) {

                //建立 embed 和剪刀石頭布的三個 button
                const buttonEmbed = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle(`來猜拳！`);

                const scissorButton = new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('✌️')
                    .setStyle(ButtonStyle.Primary);

                const rockButton = new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('✊')
                    .setStyle(ButtonStyle.Primary);

                const paperButton = new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('🖐️')
                    .setStyle(ButtonStyle.Primary);
                //將三個 button 都放入 row 中並回覆 embed 和 row
                const buttonRow = new ActionRowBuilder()
                    .addComponents(
                        scissorButton, rockButton, paperButton
                    );

                //回覆
                interaction.reply({ embeds: [buttonEmbed], components: [buttonRow] });

                //建立 collector
                const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

                //等待 collector 蒐集到玩家案的按鈕
                collector.on('collect', async collected => {

                    //電腦隨機出拳 (0:剪刀 1:石頭 2:布)
                    const botChoice = Math.floor(Math.random() * 3);
                    let bot="";
                    if(botChoice == 0)
                    {
                        bot = "✌️";
                    }
                    else if(botChoice == 1)
                    {
                        bot = "✊";
                    }
                    else if(botChoice == 2)
                    {
                        bot = "🖐️";
                    }
                    //利用玩家所按按鈕的 customId 來判斷玩家的選擇
                    let playerChoice;
                    if (collected.customId === 'scissors') {
                        playerChoice = 0;
                    } else if (collected.customId === 'rock') {
                        playerChoice = 1;
                    } else if (collected.customId === 'paper') {
                        playerChoice = 2;
                    }

                    //判斷玩家勝利，電腦勝利或平手 (0:平手 1:電腦 2:玩家)
                    let winner = 0;
                    if(botChoice == playerChoice)
                    {
                        winner= 0;
                    }
                    else if((botChoice == 0 && playerChoice==2)||(botChoice == 1 && playerChoice==0)||(botChoice == 2 && playerChoice==1))
                    {
                        winner= 1;
                    }
                    else if((botChoice == 0 && playerChoice==1)||(botChoice == 1 && playerChoice==2)||(botChoice == 2 && playerChoice==0))
                    {
                        winner= 2;
                    }

                    //從結果計算獲得/失去的 money
                    let earnings=0;
                    if(winner==1)
                    {
                        earnings=-1;
                    }
                    else if(winner==2)
                    {
                        earnings=1;
                    }

                    //讀取 players.json 並 parse 成 players
                    const data = fs.readFileSync('players.json',"utf-8");
                    const players = JSON.parse(data);

                    //在所有資料中尋找呼叫此指令玩家的資料
                    let found = false;
                    for (let j = 0; j < players.length; j++) {

                        //如果有就修改該玩家的 money 並回覆結果
                        if (players[j].id == interaction.user.id) {
                            found = true;
                            players[j].money += earnings;
                            const resultEmbed = new EmbedBuilder()
                                .setColor('#5865F2')
                                .setTitle('剪刀石頭布！')
                                .setDescription(`結果：BB出的是${bot}\n你得${earnings}點能力值\n你現在有 ${players[j].money} 點能力值!`);
                            collected.update({ embeds: [resultEmbed], components: [] });
                            break;
                        }
                    }

                    //如果沒有資料就創建一個新的並回覆結果
                    if (found == false) {
                        players.push({ id: interaction.user.id, money: 10 });
                        const resultEmbed = new EmbedBuilder()
                            .setColor('#5865F2')
                            .setTitle('剪刀石頭布！')
                            .setDescription(`結果：BB出的是${bot}\n你得${earnings}點能力值\n你現在有 ${10 + earnings} 點能力值!`);
                        collected.update({ embeds: [resultEmbed], components: [] });
                    }

                    //stringify players 並存回 players.json
                    const json = JSON.stringify(players);
                    fs.writeFileSync('players.json', json);

                    //關閉 collector
                    collector.stop();
                });
            }
        };//第一個戰鬥模式:猜拳
            } else if (collected.customId === 'big_small') {
                //第二個戰鬥模式:比大小
            } else if (collected.customId === 'circle_cross') {
                //第三個戰鬥模式:圈圈叉叉
            }

            

            //從結果計算獲得/失去的 money
            let earnings=0;
            if(winner==1)
            {
                earnings=-1;
            }
            else if(winner==2)
            {
                earnings=1;
            }

            //讀取 players.json 並 parse 成 players
            const data = fs.readFileSync('players.json',"utf-8");
            const players = JSON.parse(data);

            //在所有資料中尋找呼叫此指令玩家的資料
            let found = false;
            for (let j = 0; j < players.length; j++) {

                //如果有就修改該玩家的 money 並回覆結果
                if (players[j].id == interaction.user.id) {
                    found = true;
                    players[j].money += earnings;
                    const resultEmbed = new EmbedBuilder()
                        .setColor('#5865F2')
                        .setTitle('剪刀石頭布！')
                        .setDescription(`結果：BB出的是${bot}\n你得${earnings}元\n原本有10元\n你現在有 ${players[j].money} 元!`);
                    collected.update({ embeds: [resultEmbed], components: [] });
                    break;
                }
            }

            //如果沒有資料就創建一個新的並回覆結果
            if (found == false) {
                players.push({ id: interaction.user.id, money: 10 });
                const resultEmbed = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle('剪刀石頭布！')
                    .setDescription(`結果：BB出的是${bot}\n你得${earnings}元\n原本有10元\n你現在有 ${10 + earnings} 元!`);
                collected.update({ embeds: [resultEmbed], components: [] });
            }

            //stringify players 並存回 players.json
            const json = JSON.stringify(players);
            fs.writeFileSync('players.json', json);

            //關閉 collector
            collector.stop();
        });
    }
};
