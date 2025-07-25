// components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("English");

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/profiles", label: "Profiles" },
    { href: "/matchmaker", label: "Matchmaker" },
    { href: "/poojari", label: "Poojari" },
    {
      href: "/investors",
      label: "Investors",
      dropdown: [
        { href: "/investors/individual", label: "Individual" },
        { href: "/investors/corporate", label: "Corporate" },
      ],
    },
  ];

  const languages = ["English", "हिन्दी", "मराठी"];

  return (
    <nav className={`sticky top-0 z-50 bg-brand.bg/90 backdrop-blur-md ${scrolled ? "shadow-lg" : ""}`}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4  lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold text-brand.accent">Mangalyam</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-6">
          {navItems.map(item => (
            <li key={item.href} className="relative group">
              <Link
                href={item.href}
                className={`px-2 py-1 ${
                  pathname.startsWith(item.href)
                    ? "text-brand.accent"
                    : "text-neutral.light hover:text-brand.accent transition-colors"
                }`}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <ul className="absolute left-0 top-full mt-1 bg-brand.active rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.dropdown.map(sub => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        className="block px-4 py-2 text-neutral.light hover:bg-brand.hover transition-colors"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Right-Side Actions */}
        {isMounted && (
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(o => !o)}
                className="flex items-center space-x-1 text-neutral.light hover:text-brand.accent transition-colors"
              >
                <span>🌐</span>
                <span>{lang}</span>
              </button>
              {langOpen && (
                <ul className="absolute right-0 mt-1 bg-brand.bg rounded shadow-lg">
                  {languages.map(l => (
                    <li key={l}>
                      <button
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-neutral.light hover:bg-brand.hover transition-colors"
                      >
                        {l}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/log" className="text-neutral.light hover:text-brand.accent transition-colors font-semibold">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-yellowbtn text-neutral.bg rounded-md font-semibold hover:bg-yellowbtnHover transition-colors duration-200"
            >
              Sign Up
            </Link>
            <div className="h-2 w-2 bg-brand.accent rounded-full"></div>
            <Link href="/my-profile" className="text-neutral.light hover:text-brand.accent transition-colors">
              My Profile ▾
            </Link>
            <Link href="/admin" className="text-neutral.light hover:text-brand.accent transition-colors">
              Admin ▾
            </Link>

            {/* Mobile Toggle */}
            <button onClick={() => setMenuOpen(o => !o)} className="lg:hidden p-2">
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-neutral.light"></span>
                <span className="block w-6 h-0.5 bg-neutral.light"></span>
                <span className="block w-6 h-0.5 bg-neutral.light"></span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMounted && menuOpen && (
        <div className="lg:hidden bg-brand.bg/90 backdrop-blur-md px-4 pb-4">
          <ul className="flex flex-col space-y-3">
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-2 py-1 text-neutral.light hover:text-brand.accent"
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {item.dropdown.map(sub => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block px-2 py-1 text-neutral.light hover:text-brand.accent"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={() => setLangOpen(o => !o)}
                className="block px-2 py-1 text-neutral.light hover:text-brand.accent text-left"
              >
                🌐 {lang}
              </button>
            </li>
            <li>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-2 py-1 text-neutral.light hover:text-brand.accent">
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-1 bg-yellowbtn text-neutral.bg rounded-md font-semibold text-center hover:bg-yellowbtnHover"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
