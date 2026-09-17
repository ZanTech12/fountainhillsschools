import { Target, Eye, Heart } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')"}}></div>
        <div className="relative z-10 px-4">
          <Reveal>
            <h1 className="text-5xl font-bold tracking-tight">About Fountain Hills Schools</h1>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
            <p className="mt-6 text-lg text-blue-100">Our History, Heritage, and Vision for the Future</p>
          </Reveal>
        </div>
      </div>

      {/* History / Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="School Campus" className="rounded-2xl shadow-2xl w-full h-auto object-cover" />
            <div className="absolute -bottom-8 -right-8 bg-amber-500 text-blue-900 p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-2xl font-bold">Holistic</p>
              <p className="font-medium">Education</p>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div>
            <span className="text-amber-500 font-semibold tracking-wide uppercase text-sm">Our History</span>
            <h2 className="text-4xl font-bold text-blue-900 mt-2 mb-6 leading-tight">From Humble Beginnings to Future Leaders</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Fountain Hills Schools has its roots in <strong>Holy Rosary Primary School</strong>, established under the leadership of <strong>Mrs. Cecilia Maduagwu</strong>, the school's pioneer founder. The institution began with a commitment to providing children with a sound educational foundation and a nurturing environment.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Over time, the school underwent a restructuring and change of ownership, bringing about the adoption of the name <strong>Fountain Hills Schools</strong>. This transition marked a new chapter while maintaining the foundational values and commitment to quality education upon which the institution was established.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we continue to build on our heritage with a renewed commitment to raising confident, knowledgeable, disciplined, responsible, and well-rounded future leaders. Education here extends beyond academic achievement to include good character, leadership, creativity, moral values, and practical skills.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Mission, Vision, and Values Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <Reveal delay={0.1}>
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-lg transition text-center border-t-4 border-blue-900 h-full">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To provide quality, affordable, and holistic education, equipping every child with the knowledge, skills, discipline, confidence, and values necessary to succeed and make meaningful contributions to society.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-lg transition text-center border-t-4 border-amber-500 h-full">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Our Vision</h3>
              <p className="text-gray-500 leading-relaxed">
                To be a safe, welcoming, and stimulating learning environment where every child is valued, supported, and encouraged to discover and develop their unique talents and potential.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-lg transition text-center border-t-4 border-blue-900 h-full">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Our Values</h3>
              <p className="text-gray-500 leading-relaxed">
                We place strong emphasis on good character, leadership, creativity, discipline, moral values, practical skills, and responsible citizenship in everything we do.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}