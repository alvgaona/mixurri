import { Router } from 'itty-router';
import { ApplicationCommand, InteractionHandler } from './types';
import { authorize } from './authorize';
import { setup } from './setup';
import { interaction } from './interaction';

const router = Router();

export type Application = {
  applicationId: string;
  applicationSecret: string;
  publicKey: string;
  commands: [ApplicationCommand, InteractionHandler][]
}


export const createApplicationCommandHandler = (application: Application) => {
  router.get("/", authorize(application.applicationId));
  router.post("/interaction", interaction({ publicKey: application.publicKey, commands: application.commands }));
  router.get("/setup", setup({ applicationId: application.applicationId, applicationSecret: application.applicationSecret, commands: application.commands }));
  return (request: Request) => router.handle(request);
};