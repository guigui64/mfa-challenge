import Link from "./link.tsx";

type Props = {
  isAllowed: boolean;
};

export default function Header({ isAllowed }: Props) {
  return (
    <header class="bg-white w-full max-w-full py-6 px-8 flex flex-col md:flex-row gap-4">
      <div class="flex items-center flex-1">
        <a href="/" class="text-2xl ml-1 font-bold">
          MFA Challenge
        </a>
      </div>
      <div class="flex gap-8 items-center">
        <Link href="/dashboard">Dashboard</Link>
        {isAllowed ? (
          <Link href="/api/sign-out">Sign Out</Link>
        ) : (
          <Link href="/sign-in">Sign In</Link>
        )}
      </div>
    </header>
  );
}
