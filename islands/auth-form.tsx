import { useState } from "preact/hooks";
import Button from "../components/button.tsx";
import Input from "../components/input.tsx";
import Link from "../components/link.tsx";
import { Fragment } from "preact";

type Props = {
  mode: "In" | "Up";
  initialEmail?: string;
};

export default function AuthForm({ mode, initialEmail }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [valid, setValid] = useState(true);

  const signIn = {
    title: "Sign In",
    href: "/sign-in",
    text: "Have an account?",
  };

  const signUp = {
    title: "Create account",
    href: "/sign-up",
    text: "No account?",
  };

  const buttProps = mode == "In" ? signIn : signUp;
  const footProps = mode == "In" ? signUp : signIn;

  return (
    <div class="max-w-md mx-auto">
      <form method="post" class="flex flex-col space-y-4 min-w-0">
        <Input
          autofocus
          type="email"
          name="email"
          placeholder="Email"
          value={initialEmail || ""}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onInput={(event) => {
            const password = event.currentTarget.value;
            setPassword(password);
            setValid(password === confirm);
          }}
        />
        {mode === "Up" && (
          <Fragment>
            <Input
              type="password"
              name="password"
              placeholder="Confirm Password"
              value={confirm}
              onInput={(event) => {
                const confirm = event.currentTarget.value;
                setConfirm(confirm);
                setValid(password === confirm);
              }}
            />
            <p class="text-red-500">{valid ? "" : "Passwords do not match"}</p>
          </Fragment>
        )}

        <Button
          type="submit"
          disabled={mode === "Up" && !valid}
          formAction={"/api" + buttProps.href}
          class="!mt-8"
        >
          {buttProps.title}
        </Button>

        <p>
          {footProps.text} <Link href={footProps.href}>{footProps.title}</Link>
        </p>
      </form>
    </div>
  );
}
