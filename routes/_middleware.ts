import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { supabase } from "../lib/supabase.ts";

type User = {
  id: string;
  email?: string;
  access_token: string;
  factorId?: string;
  verified: boolean;
};

export type State = {
  user: User | null;
  error: { code: number; msg: string } | null;
};

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;
  const protected_route = url.pathname == "/dashboard";

  const headers = new Headers();

  if (protected_route && !access_token) {
    // Can't use 403 if we want to redirect to home page.
    headers.set("location", "/sign-in");
    return new Response(null, { headers, status: 303 });
  }

  if (access_token) {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token);
    if (error) {
      throw error;
    }
    ctx.state.user = {
      id: user!.id,
      email: user!.email,
      access_token: access_token,
      factorId: user!.factors?.[0].id,
      verified: user!.factors?.[0].status === "verified",
    };
    // console.log(user);
    // console.log(ctx.state.user);

    if (protected_route) {
      if (!ctx.state.user.verified) {
        console.log("protected and not verified => enroll");
        headers.set("location", "/enroll");
        return new Response(null, { headers, status: 303 });
      }
    }
  }

  const res = await ctx.next();
  return res;
}
