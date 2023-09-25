/* The enroll api handler enrolls the user with MFA and returns the QR code and the factor ID */

import { Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

import { supabase } from "../../../lib/supabase.ts";

export const handler: Handlers = {
  async GET(req) {
    const cookies = getCookies(req.headers);
    // console.log(cookies);
    await supabase.auth.getUser(String(cookies.auth));
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      issuer: "MFA Challenge",
      friendlyName: "MFA Challenge",
    });
    if (error) {
      console.error(error);
      return new Response(error.message, { status: 500 });
    }

    return new Response(
      JSON.stringify({
        qr: data.totp.qr_code,
        factorId: data.id,
      }),
    );
  },
};
