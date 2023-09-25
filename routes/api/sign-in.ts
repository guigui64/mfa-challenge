/* The sign in api handler signs the user in with password and email into supabase */

import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

import { supabase } from "../../lib/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();

    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error != null || user == null || session == null) {
      // if an error occured, try signing up instead
      const headers = new Headers();
      headers.set("location", "/sign-up");
      return new Response(null, { status: 303, headers });
    }

    const headers = new Headers();

    // add auth cookie
    setCookie(headers, {
      name: "auth",
      value: session.access_token,
      maxAge: session.expires_in,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    // redirect to enroll or verify for MFA
    const verified = user!.factors?.[0].status === "verified";
    headers.set("location", verified ? "/verify" : "/enroll");

    return new Response(null, { status: 303, headers });
  },
};
