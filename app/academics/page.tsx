import Reveal from "@/components/Reveal";

const programs = [
  { name: "Primary School", desc: "Grades 1-5: Foundational learning focused on literacy, numeracy, and creativity.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Junior School", desc: "Grades 6-8: Bridging foundational knowledge with critical thinking and specialized subjects.", img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Senior School", desc: "Grades 9-12: College preparatory courses, AP classes, and advanced sciences.", img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

export default function Academics() {
  return (
    <div>
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')"}}></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight">Academics</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-lg text-blue-100">Empowering students through comprehensive education</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.15}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full group">
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">{p.name}</h3>
                  <p className="text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}