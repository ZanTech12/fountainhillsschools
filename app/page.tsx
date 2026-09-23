import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, Microscope } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Features Section */}
      <section className="py-24 bg-gray-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 tracking-tight">Why Choose FHHS?</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">We provide a comprehensive education that prepares students for the challenges of tomorrow.</p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Reveal delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900 transition-colors">
                  <BookOpen className="h-7 w-7 text-blue-900 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Modern Curriculum</h3>
                <p className="text-gray-500 leading-relaxed">Comprehensive learning tailored to global standards and future technologies.</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group">
                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                  <Users className="h-7 w-7 text-amber-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Expert Teachers</h3>
                <p className="text-gray-500 leading-relaxed">Dedicated educators committed to nurturing every student's unique potential.</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900 transition-colors">
                  <Microscope className="h-7 w-7 text-blue-900 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Advanced Facilities</h3>
                <p className="text-gray-500 leading-relaxed">State-of-the-art labs, modern libraries, and premium sports complexes.</p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group">
                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                  <Award className="h-7 w-7 text-amber-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Award Winning</h3>
                <p className="text-gray-500 leading-relaxed">Recognized for excellence in education and student development nationwide.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-blue-900 rounded-3xl overflow-hidden relative p-12 md:p-16 text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
                <p className="text-blue-100 mb-8 max-w-xl mx-auto">Take the first step towards a brighter future. Admissions for 2024-2025 are open.</p>
                <Link href="/admissions" className="inline-flex items-center bg-amber-500 text-blue-900 px-8 py-3.5 rounded-lg font-semibold hover:bg-white transition-all shadow-lg hover:-translate-y-0.5">
                  Start Your Application <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}