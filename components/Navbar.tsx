"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Navbar */}
      <header className="fixed top-0 w-full z-50 bg-[#800020] text-white">
        <div className="container mx-auto px-4 flex items-center justify-between py-3">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <img
              src="/School Logo - Header.png"
              alt="FIDIF School Logo"
              width={60}
              height={60}
              className="py-2"
            />
            <div className="leading-tight">
              <p className="text-2xl sm:text-4xl uppercase font-bold">Fidif</p>
              <p className="text-sm hidden sm:block">School Complex</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="px-4 py-2 rounded hover:bg-red-500 transition-colors">Home</Link>
            <Link href="/about" className="px-4 py-2 rounded hover:bg-red-500 transition-colors">About</Link>
            <Link href="/login" className="px-4 py-2 rounded hover:bg-red-500 transition-colors">Portal</Link>
          </nav>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden z-50 text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Slide-in Menu */}
        <div
          className={`fixed top-0 right-0 w-2/3 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button inside mobile menu */}
          <div className="flex justify-end p-4">
            <button onClick={() => setMenuOpen(false)} className="text-[#800020]">
              <X size={30} />
            </button>
          </div>

          <div className="flex flex-col items-start p-6 space-y-6 text-[#800020] font-semibold">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/login" onClick={() => setMenuOpen(false)}>Portal</Link>
          </div>
        </div>
      </header>
    </>
  );
}
