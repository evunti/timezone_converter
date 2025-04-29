import { SignOutButton } from "@/SignOutButton";

export function Header() {
  return (
    <header className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
      <h2 className="text-xl font-semibold accent-text">Timezone Converter</h2>
      <SignOutButton />
    </header>
  );
}
