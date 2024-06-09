import { fetchEmails } from "@/lib/utils";

export async function POST(req: Request) {
  const payload = await req.json();
  const { accessToken, maxResults } = payload;

  try {
    const emails = await fetchEmails(accessToken, maxResults);
    return Response.json(emails);
  } catch (error) {
    return Response.json({ error: "Error fetching emails" });
  }
}
