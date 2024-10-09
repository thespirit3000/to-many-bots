import { Bot, GrammyError, HttpError, session } from "grammy";
import { COMMANDS } from "./commands";
import * as dotenv from "dotenv";
import { BotContext } from "./types";
import { ParseModeFlavor } from "@grammyjs/parse-mode";
import { limit } from "@grammyjs/ratelimiter";
import { conversations, createConversation } from "@grammyjs/conversations";
import { startConversation } from "./conversations";

dotenv.config();

//Env vars
const BOT_TOKEN = process.env.BOT_TOKEN || "";

//BOT CONFIG
const bot = new Bot<ParseModeFlavor<BotContext>>(BOT_TOKEN);

bot.api.setMyCommands(COMMANDS);
//bot.api.config.use(parseMode('')); // Sets default parse_mode for ctx.reply

bot.use(
  session({
    initial() {
      // return empty object for now
      return {};
    },
  })
);

bot.use(
  limit({
    // Allow only 3 messages to be handled every 2 seconds.
    timeFrame: 2000,
    limit: 3,

    // This is called when the limit is exceeded.
    onLimitExceeded: async (ctx) => {
      await ctx.reply("Please refrain from sending too many requests!");
    },

    // Note that the key should be a number in string format such as "123456789".
    keyGenerator: (ctx) => {
      return ctx.from?.id.toString();
    },
  })
);

//Inject conversations
bot.use(conversations());
bot.use(createConversation(startConversation));

// LOGIC

//START COMMAND
bot.command("start", async (ctx) => {
  await ctx.conversation.enter("startConversation");
});

//HELP COMMAND
bot.command("help", async (ctx) => {
  ctx.reply("Help message");
});

// Always exit any conversation upon /cancel
bot.command("cancel", async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply("Leaving...");
});

//CRASH HANDLER

export { bot };
