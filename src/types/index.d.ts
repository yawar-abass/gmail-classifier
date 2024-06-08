declare module "@/types" {
  export type User = {
    name: string;
    email: string;
    image: string;
  };

  export interface Session {
    user?: User;
    expires?: string;
    accessToken?: string;
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
