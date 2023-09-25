import { Fragment } from "preact";
import { EnrollMFA } from "../islands/enroll-mfa.tsx";
import { PageProps } from "$fresh/server.ts";
import { State } from "./_middleware.ts";

export default function MFA({ state }: PageProps<null, State>) {
  return (
    <Fragment>
      <p class="container mx-auto mb-4">
        Please verify your identity by entering a new code from your MFA app.
      </p>
      <EnrollMFA factorId={state.user!.factorId} />
    </Fragment>
  );
}
