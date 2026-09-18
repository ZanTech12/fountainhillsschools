"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  // The URL for your external login portal
  const loginUrl = "https://fountainhills.okispecial.com.ng";

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Premium Logo & Name Organization */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 transition-transform active:scale-95 group"
          >
            <div className="relative flex-shrink-0">
              <Image 
                src="/logo.jpeg" 
                alt="Fountain Hills Schools Logo" 
                width={48} 
                height={48} 
                className="h-12 w-12 rounded-full object-cover ring-2 ring-amber-500/50 shadow-sm transition-all group-hover:ring-amber-500"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-lg text-blue-900 tracking-tight">
                Fountain Hills
              </span>
              <span className="text-[10px] font-bold text-amber-600 tracking-[0.2em] uppercase mt-0.5">
                Schools
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-900 text-white shadow-md shadow-blue-900/20" 
                      : "text-gray-700 hover:text-blue-900 hover:bg-blue-50 active:scale-90"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Desktop Login Button - External Link */}
            <a 
              href={loginUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="whitespace-nowrap ml-4 bg-amber-500 text-blue-900 px-6 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-amber-500/20 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30 active:scale-90 transition-all duration-200"
            >
              Login
            </a>
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
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`whitespace-nowrap block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-900 text-white shadow-md" 
                      : "text-gray-700 hover:text-blue-900 hover:bg-blue-50 active:scale-95 active:bg-blue-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Mobile Login Button - External Link */}
            <a 
              href={loginUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="whitespace-nowrap block w-full text-center bg-amber-500 text-blue-900 px-4 py-3 rounded-xl text-base font-semibold hover:bg-amber-400 active:scale-95 transition-all duration-200 mt-3"
              onClick={() => setIsOpen(false)}
            >
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}