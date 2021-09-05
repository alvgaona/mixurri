import { ApplicationCommand, InteractionHandler, Interaction, InteractionResponse, InteractionResponseType } from './types'

export const helloCommand: ApplicationCommand = {
    name: "hello",
    description: "Bot will say hello to you!",
};
  
export const helloHandler: InteractionHandler = async (interaction: Interaction): Promise<InteractionResponse> => {
  const userID = interaction.member.user.id;

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Hello, <@${userID}>!`,
      allowed_mentions: {
          users: [userID],
      },
    },
  };
};