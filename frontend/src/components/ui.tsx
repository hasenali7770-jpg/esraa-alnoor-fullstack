import Link from "next/link";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass rounded-xl2 ${className}`}>{children}</div>;
}

export function Btn({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "white";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl2 px-5 py-3 text-sm font-semibold transition";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary2",
    ghost: "bg-surface/40 border border-border text-text hover:bg-surface",
    white: "bg-white text-[#0B1220] hover:opacity-95",
  };

  if (href) return <Link className={`${base} ${variants[variant]} ${className}`} href={href}>{children}</Link>;
  return <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface/60 border border-border px-3 py-1 text-xs text-muted">
      {children}
    </span>
  );
}

export function TopNav() {
  return (
    <div className="sticky top-0 z-50 border-b border-border/70 bg-[#071021]/70 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-surface border border-border" />
            <div className="text-sm">
              <div className="font-semibold">Esraa Al-Noor</div>
              <div className="text-xs text-muted">أكاديمية كورسات</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
            <a className="hover:text-text" href="/">الرئيسية</a>
            <a className="hover:text-text" href="/courses">الدورات</a>
            <a className="hover:text-text" href="/pricing">الأسعار</a>
            <a className="hover:text-text" href="/about">من نحن</a>
            <a className="hover:text-text" href="/contact">تواصل معنا</a>
            <a className="hover:text-text" href="/activate">تفعيل</a>
            <a className="hover:text-text" href="/admin/builder">لوحة البناء</a>
          </nav>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="rounded-full border border-border px-3 py-1">AR</span>
            <span className="rounded-full border border-border px-3 py-1">EN</span>
            <span className="rounded-full border border-border px-3 py-1">المظهر</span>
            <span className="rounded-full border border-border px-3 py-1">فاتح</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
