"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Admissions", href: "/admissions" },
  { name: "Facilities", href: "/facilities" },
  { name: "Staff", href: "/staff" },
  { name: "News & Events", href: "/news" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Name */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-blue-900 font-bold text-xl transition-transform active:scale-95"
          >
            <Image 
              src="/logo.jpeg" 
              alt="Fountain Hills Schools Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8 rounded-full object-cover ring-2 ring-amber-500/50"
            />
            <span>Fountain Hills Schools</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="relative text-gray-700 hover:text-blue-900 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-50 active:scale-90 active:bg-blue-100"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/login" 
              className="ml-4 bg-blue-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-blue-900/20 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/30 active:scale-90 transition-all duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-700 hover:text-blue-900 transition-colors active:scale-90 active:bg-gray-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 active:scale-95 active:bg-blue-100 rounded-xl transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/login" 
              className="block w-full text-center bg-blue-900 text-white px-4 py-3 rounded-xl text-base font-semibold hover:bg-blue-800 active:scale-95 transition-all duration-200 mt-3"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}