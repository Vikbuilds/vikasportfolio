export function Footer() {
  return (
    <footer className="border-t border-dashed border-border/40 py-8">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-xs text-muted-foreground/70">
          Built by{" "}
          <a
            href="https://github.com/theadroitdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Shivam Verma
          </a>
        </p>
        <p className="text-[11px] text-muted-foreground/50">
          © {new Date().getFullYear()} · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
