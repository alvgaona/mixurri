declare const DISCORD_SITE: string;

export const authorize = (applicationId: string) => async (): Promise<Response> => {
    const urlSearchParams = new URLSearchParams({
      client_id: applicationId,
      scope: "bot applications.commands",
      permissions: "259846043712"
    });

    const redirectURL = new URL(`${DISCORD_SITE}/oauth2/authorize`);
    redirectURL.search = urlSearchParams.toString();
  
    return new Response(null, {
      status: 301,
      headers: { Location: redirectURL.toString() },
    });
  };