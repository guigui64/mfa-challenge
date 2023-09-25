import { Fragment } from "preact";
import { EnrollMFA } from "../islands/enroll-mfa.tsx";

export default function MFA() {
  return (
    <Fragment>
      <p class="container mx-auto mb-4">
        Thank you for signing up. Before you can access your dashboard, you need
        to enable MFA. Please scan this QR code with an authenticator app and
        enter the code below.
      </p>
      <EnrollMFA />
    </Fragment>
  );
}
