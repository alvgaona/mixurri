import { User } from '../storage/types';
import { formatUserId } from '../utils/utils';
import { ApplicationCommand, InteractionHandler, Interaction, InteractionResponse, InteractionResponseType, ApplicationCommandOptionType } from 'cloudflare-discord-bot'

declare const MIXURRI: any;

export const listCommand: ApplicationCommand = {
  name: "list",
  description: "List players ready to play",
};
  
export const listHandler: InteractionHandler = async (interaction: Interaction): Promise<InteractionResponse> => {
  const guildId = interaction.guild_id;
  let users: User[] = await MIXURRI.get(guildId, { type: "json" });

  if (users === null) {
    users = [];
  }

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Players ready to play the match:\n\n${users.map(user => formatUserId(user.id)).join(" ")}`,
      allowed_mentions: {
          users: users.map(user => user.id),
      },
    },
  };
};
