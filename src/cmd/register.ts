import { User } from '../storage/types';
import { formatUserId } from '../utils/utils';
import { ApplicationCommand, InteractionHandler, Interaction, InteractionResponse, InteractionResponseType, ApplicationCommandOptionType } from '../discord-worker/types'

declare const MIXURRI: any;

export const registerCommand: ApplicationCommand = {
  name: "register",
  description: "Register player to match",
  options: [
    {
      name: "players",
      type: ApplicationCommandOptionType.STRING,
      description: "Register player",
      required: true,
    }
  ]
};
  
export const registerHandler: InteractionHandler = async (interaction: Interaction): Promise<InteractionResponse> => {
  const guildId = interaction.guild_id;
  const resolvedUsers = interaction.data?.resolved.users;

  const newUsers: User[] = Object.keys(resolvedUsers).map(k => {
    const user = resolvedUsers[k];
    return { id: user.id, username: user.username };
  })

  let users: User[] = await MIXURRI.get(guildId, { type: "json" });

  if (users === null) {
    users = [];
  }

  newUsers.forEach(newUser => users.push(newUser));
   
  await MIXURRI.put(guildId, JSON.stringify(users));

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Players ready to play:\n\n${newUsers.map(user => formatUserId(user.id)).join(" ")}`,
      allowed_mentions: {
          users: newUsers.map(user => user.id),
      },
    },
  };
};