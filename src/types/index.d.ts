declare module "@/types" {
  export type User = {
    name: string;
    email: string;
    image: string;
  };

  export interface Session {
    user: User;
    expires?: string;
    accessToken?: string | null;
    idToken?: string;
    [key: string]: any;
    error?: "RefreshAccessTokenError";
  }
  export interface Token {
    accessToken?: string;
    idToken?: string;
    [key: string]: any;
  }

  export interface GmailMessagePartBody {
    size: number;
    data?: string;
  }

  export interface GmailMessageHeader {
    name: string;
    value: string;
  }

  export interface GmailMessagePayload {
    partId: string;
    mimeType: string;
    filename: string;
    headers: GmailMessageHeader[];
    body: GmailMessagePartBody;
    parts?: GmailMessagePart[];
  }

  export interface GmailMessage {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    historyId: string;
    internalDate: string;
    payload: GmailMessagePayload;
    sizeEstimate: number;
    category?: string;
  }
  export interface GmailMessageHeader {
    name: string;
    value: string;
  }

  export interface GmailMessagePart {
    partId: string;
    mimeType: string;
    filename: string;
    headers: GmailMessageHeader[];
    body: GmailMessagePartBody;
    parts?: GmailMessagePart[];
  }
  export interface GmailMessageListResponse {
    messages: { id: string; threadId: string }[];
  }

  export interface GmailMessageGetResponse {
    data: GmailMessage;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
