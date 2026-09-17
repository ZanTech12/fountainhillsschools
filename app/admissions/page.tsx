import { ClipboardList, FileCheck, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function Admissions() {
  return (
    <div>
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')"}}></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight">Admissions</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-lg text-blue-100">Begin your journey with Fountain Hills Schools</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Reveal delay={0.1}>
            <div className="text-center p-8 border border-gray-100 rounded-2xl shadow-sm bg-white h-full">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardList className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="font-bold text-blue-900 text-xl mb-2">1. Inquiry</h3>
              <p className="text-gray-500">Submit an inquiry form to learn more about our programs and availability.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="text-center p-8 border border-gray-100 rounded-2xl shadow-sm bg-white h-full">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="font-bold text-blue-900 text-xl mb-2">2. Apply</h3>
              <p className="text-gray-500">Complete the online application and submit required documents.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="text-center p-8 border border-gray-100 rounded-2xl shadow-sm bg-white h-full">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="font-bold text-blue-900 text-xl mb-2">3. Enroll</h3>
              <p className="text-gray-500">Receive your acceptance letter and complete the enrollment process.</p>
            </div>
          </Reveal>
        </div>
        
        <Reveal>
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-12 rounded-3xl text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
            <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to Apply?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto relative z-10">Applications for the 2024-2025 academic year are now open. Spaces are limited.</p>
            <a href="/contact" className="inline-block bg-amber-500 text-blue-900 px-8 py-3.5 rounded-lg font-semibold hover:bg-white transition-all shadow-lg relative z-10">Start Application</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}