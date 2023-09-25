/* The challenge api handler creates a challenge and verifies it with the received code */

import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

import { supabase } from "../../../lib/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const { factorId, code } = await req.json();
    const cookies = getCookies(req.headers);
    await supabase.auth.getUser(String(cookies.auth));
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code,
    });
    // console.log(data);
    if (error) {
      console.error(error);
      return new Response(error.message, { status: 500 });
    }

    return new Response("true");
  },
};
