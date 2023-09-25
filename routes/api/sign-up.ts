/* The sign up api handler registers the user with password and email into supabase */

import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { supabase } from "../../lib/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();
    const email = form.get("email");
    const password = form.get("password");

    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email: String(email),
      password: String(password),
    });

    if (error != null) {
      // TODO: Add some actual error handling.
      console.error(error);
      return new Response(error.message, { status: 500 });
    }

    if (user && !session) {
      // TODO: A user has been created but not yet confirmed their e-mail address.
      // We could add a flag for the frontend to remind the user.
      // This could be disabled from the supabase dashboard since we want our users to join from an invitation email...
    }

    const exists = await supabase.auth.getUser(String(user));
    if (exists?.data.user) {
      return new Response("User already registered", { status: 403 });
    }

    const headers = new Headers();

    // add auth cookie
    setCookie(headers, {
      name: "auth",
      value: session!.access_token,
      maxAge: session!.expires_in,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    // redirect to enroll for MFA
    headers.set("location", "/enroll");
    return new Response(null, { status: 303, headers });
  },
};
