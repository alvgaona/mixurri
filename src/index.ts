import { listHandler, listCommand } from './cmd/list';
import { createApplicationCommandHandler } from './discord-worker/handler';
import { shuffleHandler, shuffleCommand } from './cmd/shuffle';
import { registerHandler, registerCommand } from './cmd/register';
import { deregisterHandler, deregisterCommand } from './cmd/deregister';
import { Permissions } from './discord-worker/permissions';
import { PermissionType } from './discord-worker/types';
import { resetCommand, resetHandler } from './cmd/reset';

declare const CLIENT_ID: string;
declare const CLIENT_SECRET: string;
declare const PUBLIC_KEY: string;

/*
* To install guild commands (instantly), Discord should use the following URL:
*     https://discord.com/api/v8/applications/${applicationId}/guilds/${guild_id}/commands
*
* Therefore, you should pass a guildId in the Application.
*/
const applicationCommandHandler = createApplicationCommandHandler({
  applicationId: CLIENT_ID,
  applicationSecret: CLIENT_SECRET,
  publicKey: PUBLIC_KEY,
  commands: [
    [registerCommand, registerHandler],
    [deregisterCommand, deregisterHandler],
    [listCommand, listHandler],
    [shuffleCommand, shuffleHandler],
    [resetCommand, resetHandler],
  ],
  permissions: new Permissions(
    [
      PermissionType.ADD_REACTIONS,
      PermissionType.ATTACH_FILES,
      PermissionType.EMBED_LINKS,
      PermissionType.SEND_MESSAGES,
      PermissionType.USE_PUBLIC_THREADS,
      PermissionType.SEND_TTS_MESSAGES,
      PermissionType.MENTION_EVERYONE,
      PermissionType.USE_EXTERNAL_EMOJIS,
      PermissionType.USE_EXTERNAL_STICKERS,
    ]
  )
});

addEventListener('fetch', (event) => {
  event.respondWith(applicationCommandHandler(event.request))
})
