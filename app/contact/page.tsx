import { MapPin, Phone, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <div>
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')"}}></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight">Contact Us</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-lg text-blue-100">We'd love to hear from you</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12">
        <Reveal>
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-8">Get in Touch</h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Address</h4>
                  <p className="text-gray-500">Umuameshi Emeke Obibiezena, Owerri North, Imo State</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                  <div className="flex flex-col text-gray-500">
                    <a href="tel:09022484202" className="hover:text-blue-900 transition-colors">09022484202</a>
                    <a href="tel:09024483411" className="hover:text-blue-900 transition-colors">09024483411</a>
                    <a href="tel:08068705523" className="hover:text-blue-900 transition-colors">08068705523</a>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                  <a href="mailto:fountainhillssch2000@gmail.com" className="text-gray-500 hover:text-blue-900 transition-colors break-all">
                    fountainhillssch2000@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <iframe 
              src="https://maps.google.com/maps?q=Owerri%20North%2C%20Imo%20State&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-64 rounded-2xl border-0 shadow-sm" 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <form className="bg-white p-8 rounded-2xl shadow-xl space-y-5 border border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white py-3.5 rounded-xl font-semibold hover:bg-amber-500 hover:text-blue-900 transition-colors">Send Message</button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}