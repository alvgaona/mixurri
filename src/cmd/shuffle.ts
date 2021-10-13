import arrayShuffle from 'array-shuffle';
import { User } from '../storage/types';
import { formatUserId } from '../utils/utils';
import { 
  ApplicationCommand,
  InteractionHandler,
  Interaction,
  InteractionResponse,
  InteractionResponseType
} from 'cloudflare-discord-bot'

declare const MIXURRI: any;

export const shuffleCommand: ApplicationCommand = {
  name: "shuffle",
  description: "Shuffle players and list the first 10.",
};
  
export const shuffleHandler: InteractionHandler = async (interaction: Interaction): Promise<InteractionResponse> => {
  const guildId = interaction.guild_id;

  const users: User[] = await MIXURRI.get(guildId, { type: "json" });
  const shuffledUsers: User[] = arrayShuffle(users);

  const numberOfUsers = users.length;

  if (numberOfUsers % 2 !== 0) {
    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: "Number of players should be even. :cry:",
      },
    };
  }

  const teamA = shuffledUsers.slice(0, numberOfUsers/2);
  const teamB = shuffledUsers.slice(numberOfUsers/2, numberOfUsers);

  const content = `Team A:\n\n${teamA.map(user => formatUserId(user.id))}\n\n Team B:\n\n${teamB.map(user => formatUserId(user.id))}`;

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: content,
      allowed_mentions: {
          users: shuffledUsers.map(user => user.id),
      },
    },
  };
};
