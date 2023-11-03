const tabPath: { [key: string]: string } = {
  FOLLOWING: "following_list",
  FOR_YOU: "for_you_list",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tabId = searchParams.get("tab_id") ?? "";
  if (!tabPath[tabId]) {
    return new Response("Bad Request", { status: 400 });
  }

  const res = await fetch(`http://localhost:8088/${tabPath[tabId]}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return Response.json({ data });
}
