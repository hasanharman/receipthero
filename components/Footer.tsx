"use client";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center py-4">
      <a href="/" target="_blank" className="text-center text-sm text-[#555]">
        Powered by Receipt Hero
        <img
          className="inline ml-1"
          src="/together.svg"
          width="69"
          height="15"
        />
      </a>
    </footer>
  );
}
