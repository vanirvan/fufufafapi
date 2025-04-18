import { GithubIcon } from "./icons";

export default function Navbar() {
  return (
    <nav className="backdrop-blur w-full sticky top-0 z-10 font-geist">
      <div className="relative w-full max-w-3xl mx-auto px-4 py-2 flex items-center justify-end gap-4">
        <a
          href="https://github.com/vanirvan/fufufafapi"
          target="_blank"
          className="p-2 rounded-md hover:bg-red-50 transition-colors"
        >
          <GithubIcon className="w-8 h-auto" />
        </a>
      </div>
    </nav>
  );
}
