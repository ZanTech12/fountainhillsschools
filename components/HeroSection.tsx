"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center bg-cover bg-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')" }}></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-900/70 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-6 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium tracking-wide"
        >
          Welcome to the Future of Education
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
        >
          Igniting Minds, <br/> 
          <span className="text-amber-400">Shaping Futures</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto text-blue-50 font-light"
        >
          Fountain Hills Schools provides world-class education that empowers students to innovate, lead, and excel in a global society.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link href="/admissions" className="group bg-amber-500 text-blue-900 px-8 py-3.5 rounded-lg font-semibold hover:bg-amber-400 transition-all flex items-center shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5">
            Apply Now 
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/about" className="group bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-all flex items-center">
            <PlayCircle className="mr-2 h-5 w-5" />
            Watch Video
          </Link>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
    </section>
  );
}