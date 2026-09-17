import Reveal from "@/components/Reveal";

const facilities = [
  { name: "Science Laboratories", desc: "Fully equipped labs for Physics, Chemistry, and Biology.", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Sports Complex", desc: "Olympic-sized pool, basketball courts, and athletic fields.", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Modern Library", desc: "Over 50,000 books, digital resources, and study spaces.", img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Arts Center", desc: "Studios for painting, sculpture, music, and drama.", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

export default function Facilities() {
  return (
    <div>
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564981797816-10436664bf8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')"}}></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight">Our Facilities</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-lg text-blue-100">State-of-the-art resources for a modern education</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-8">
        {facilities.map((f, i) => (
          <Reveal key={f.name} delay={i * 0.1}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden group h-full">
              <div className="overflow-hidden">
                <img src={f.img} alt={f.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">{f.name}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}