import _ from 'lodash';
import { User } from '../storage/types';
import { formatUserId } from '../utils/utils';
import { 
  ApplicationCommand,
  InteractionHandler,
  Interaction,
  InteractionResponse,
  InteractionResponseType,
  ApplicationCommandOptionType
} from '../discord-worker/types'

declare const MIXURRI: any;

export const deregisterCommand: ApplicationCommand = {
  name: "deregister",
  description: "Deregister players from match",
  options: [
    {
      name: "players",
      type: ApplicationCommandOptionType.STRING,
      description: "Degister players",
      required: true,
    }
  ]
};
  
export const deregisterHandler: InteractionHandler = async (interaction: Interaction): Promise<InteractionResponse> => {
  const guildId = interaction.guild_id;
  const resolvedUsers = interaction.data?.resolved.users;

  const users: User[] = Object.keys(resolvedUsers).map(k => {
    const user = resolvedUsers[k];
    return { id: user.id, username: user.username };
  })

  let registeredUsers: User[] = await MIXURRI.get(guildId, { type: "json" });

  if (registeredUsers === null) {
    registeredUsers = [];
  }
  
  let toRegisterUsers: User[] = []

  for (let i = 0; i < users.length; i++) {
    toRegisterUsers = registeredUsers.filter(user => user.id !== users[i].id);
  }
  
  if (_.isEqual(toRegisterUsers, registeredUsers)) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `Players were not previously registered:\n\n${users.map(user => formatUserId(user.id)).join(" ")}`,
        allowed_mentions: {
          users: users.map(user => user.id),
        },
      },
    }; 
  }

  await MIXURRI.put(guildId, JSON.stringify(toRegisterUsers));

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `These players were deregistered from the match:\n\n${users.map(user => formatUserId(user.id)).join(" ")}`,
      allowed_mentions: {
        users: users.map(user => user.id),
      },
    },
  };
};