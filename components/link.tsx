import { JSX } from "preact";

export default function Link(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} class={`underline font-medium ${props.class ?? ""}`} />;
}
