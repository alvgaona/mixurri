import { 
    ApplicationCommand,
    InteractionHandler,
    Interaction,
    InteractionResponse,
    InteractionResponseType, 
} from 'cloudflare-discord-bot'

declare const MIXURRI: any;

export const resetCommand: ApplicationCommand = {
  name: "reset",
  description: "Reset the lobby",
};
  
export const resetHandler: InteractionHandler = async (interaction: Interaction): Promise<InteractionResponse> => {
  const guildId = interaction.guild_id;

  await MIXURRI.delete(guildId);

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Lobby has been reset! Pick your players.`,
    },
  };
};
