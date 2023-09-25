import { PageProps } from "$fresh/server.ts";
import AuthForm from "../islands/auth-form.tsx";

export default function SignUp(props: PageProps) {
  return (
    <AuthForm
      mode="Up"
      initialEmail={props.url.searchParams.get("email") ?? undefined}
    />
  );
}
