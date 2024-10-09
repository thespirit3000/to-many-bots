import "dotenv/config";
import { Bot, Composer, InlineKeyboard, Keyboard } from "grammy";

const webAppURL = process.env.WEB_APP_URL;
const bot = new Bot(process.env.BOT_API_KEY);
const magicButton = (keyboard) => new keyboard().webApp("💫 Tap!", webAppURL);

bot.command("start", async (ctx) => {
  const keyboard = magicButton(InlineKeyboard);
  await ctx.reply("Добро пожаловать! Я бы нажал кнопку ниже!", {
    reply_markup: keyboard,
  });
});

bot.command("simple", async (ctx) => {
  const keyboard = magicButton(Keyboard);

  await ctx.reply("Simple mode", {
    reply_markup: {
      keyboard: keyboard.build(),
      resize_keyboard: true,
    },
  });
});

bot.start();
