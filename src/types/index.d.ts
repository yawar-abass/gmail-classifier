declare module "@/types" {
  export type User = {
    name: string;
    email: string;
    image: string;
  };

  export interface Session {
    user?: User;
    expires?: string;
  }
}
