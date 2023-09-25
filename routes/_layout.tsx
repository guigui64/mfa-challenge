import { LayoutProps } from "$fresh/server.ts";
import Header from "../components/header.tsx";

export default function Layout({ Component, state }: LayoutProps) {
  const isAllowed = !!state.user;
  return (
    <main class="px-4 py-8 mx-auto">
      <Header isAllowed={isAllowed} />
      <Component />
    </main>
  );
}
