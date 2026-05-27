import "isomorphic-fetch";
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import {
  TokenCredentialAuthenticationProvider,
} from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js";
import dotenv from "dotenv";

dotenv.config();

const required = (key: string): string => {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
};

export function getGraphClient(): Client {
  const credential = new ClientSecretCredential(
    required("AZURE_TENANT_ID"),
    required("AZURE_CLIENT_ID"),
    required("AZURE_CLIENT_SECRET")
  );

  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });

  return Client.initWithMiddleware({ authProvider });
}

export async function getSiteId(client: Client): Promise<string> {
  const hostname = required("SP_SITE_HOSTNAME");
  const sitePath = required("SP_SITE_PATH");
  const site = await client
    .api(`/sites/${hostname}:${sitePath}`)
    .get();
  return site.id;
}

export async function findPageByTitle(
  client: Client,
  siteId: string,
  title: string
): Promise<{ id: string; webUrl: string } | null> {
  try {
    const result = await client
      .api(`/sites/${siteId}/pages`)
      .filter(`title eq '${title.replace(/'/g, "''")}'`)
      .select("id,title,webUrl")
      .get();
    if (result.value && result.value.length > 0) {
      return { id: result.value[0].id, webUrl: result.value[0].webUrl };
    }
  } catch {
    // Page not found
  }
  return null;
}

export async function findListByTitle(
  client: Client,
  siteId: string,
  listTitle: string
): Promise<string | null> {
  try {
    const result = await client
      .api(`/sites/${siteId}/lists`)
      .filter(`displayName eq '${listTitle.replace(/'/g, "''")}'`)
      .select("id")
      .get();
    if (result.value && result.value.length > 0) {
      return result.value[0].id;
    }
  } catch {
    // List not found
  }
  return null;
}
