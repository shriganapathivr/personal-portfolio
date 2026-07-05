export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-sm text-muted sm:flex-row sm:text-left">
        <span className="font-heading text-base font-bold text-grad">SG·VR</span>
        <p>
          © {new Date().getFullYear()} Shri Ganapathi V.R · Full Stack Developer · Madurai
        </p>
      </div>
    </footer>
  );
}
