import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

// Custom Social SVG Icons (since Lucide removed brand icons)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 text-white font-bold text-xl mb-4">
              <span>Fountain Hills Schools</span>
            </div>
            <p className="text-sm leading-relaxed">Empowering students to create the future. Join our community of excellence and innovation.</p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link href="/admissions" className="hover:text-amber-500 transition-colors">Admissions</Link></li>
              <li><Link href="/academics" className="hover:text-amber-500 transition-colors">Academics</Link></li>
              <li><Link href="/staff" className="hover:text-amber-500 transition-colors">Our Staff</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" /> 
                <span>Umuameshi Emeke Obibiezena, Owerri North, Imo State</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:09022484202" className="hover:text-amber-500 transition-colors">09022484202</a>
                  <a href="tel:09024483411" className="hover:text-amber-500 transition-colors">09024483411</a>
                  <a href="tel:08068705523" className="hover:text-amber-500 transition-colors">08068705523</a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <a href="mailto:fountainhillssch2000@gmail.com" className="hover:text-amber-500 transition-colors break-all">
                  fountainhillssch2000@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-amber-500 hover:text-gray-900 transition-colors"><FacebookIcon /></Link>
              <Link href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-amber-500 hover:text-gray-900 transition-colors"><TwitterIcon /></Link>
              <Link href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-amber-500 hover:text-gray-900 transition-colors"><InstagramIcon /></Link>
              <Link href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-amber-500 hover:text-gray-900 transition-colors"><LinkedinIcon /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Fountain Hills Schools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}