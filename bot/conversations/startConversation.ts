import { ConversationContext, BotContext } from "../types";
import { InlineKeyboard, Keyboard } from "grammy";
import {
  getUserByTelegramId,
  getUserById,
  updateUserById,
  addUser,
} from "../../mongodb/operations";
import { magicButton } from "../markup";

const startConversation = async (
  conversation: ConversationContext,
  ctx: BotContext
) => {
  const { user } = await ctx.getAuthor();
  await console.log(user);

  if (!user.username) {
    // LOGGER.info(
    //   `[startConversation][player does not have a username configured]`,
    //   { metadata: "" }
    // );
    await ctx.reply("Please define an username for your account first", {
      reply_to_message_id: ctx?.msg?.message_id,
    });

    await ctx.conversation.exit();
    return;
  }

  const userExists = await conversation.external(
    async () => await getUserByTelegramId(user.id)
  );

  if (userExists) {
    const keyboard = magicButton(InlineKeyboard);
    ctx.reply(
      `Welcome back ${userExists.firstName}! Please tap the button for open app.`,
      {
        reply_markup: keyboard,
      }
    );
    conversation._deactivate();
  } else {
    const createdUser = await conversation.external(async () =>
      addUser({
        telegramId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        telegramUserName: user.username || "",
      })
    );

    if (createdUser) {
      ctx.reply(`Welcome ${createdUser.firstName}!`, {});
    } else {
      ctx.reply(`Something went wrong!`);
    }

    conversation._deactivate();
  }
};

export { startConversation };
