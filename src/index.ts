import { createApplicationCommandHandler } from './handler';
import { helloCommand, helloHandler } from './hello';

declare const CLIENT_ID: string;
declare const CLIENT_SECRET: string;
declare const PUBLIC_KEY: string;

const applicationCommandHandler = createApplicationCommandHandler({
  applicationId: CLIENT_ID,
  applicationSecret: CLIENT_SECRET,
  publicKey: PUBLIC_KEY,
  commands: [[helloCommand, helloHandler]],
});

addEventListener('fetch', (event) => {
  event.respondWith(applicationCommandHandler(event.request))
})
