import Reveal from "@/components/Reveal";

// Custom Social SVG Icons
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

const staff = [
  { name: "Dr. Emily Carter", role: "Principal", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { name: "Mr. James Wilson", role: "Vice Principal", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { name: "Ms. Sarah Johnson", role: "Head of Science", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { name: "Mr. David Lee", role: "Athletics Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
];

export default function Staff() {
  return (
    <div>
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')"}}></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight">Meet Our Staff</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-lg text-blue-100">Dedicated professionals shaping young minds</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {staff.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.1}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden text-center group h-full">
              <div className="overflow-hidden">
                <img src={s.img} alt={s.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900">{s.name}</h3>
                <p className="text-amber-500 mb-4 font-medium">{s.role}</p>
                <div className="flex justify-center space-x-4 text-gray-400">
                  <a href="#" className="hover:text-blue-900 transition-colors"><FacebookIcon /></a>
                  <a href="#" className="hover:text-blue-900 transition-colors"><TwitterIcon /></a>
                  <a href="#" className="hover:text-blue-900 transition-colors"><InstagramIcon /></a>
                  <a href="#" className="hover:text-blue-900 transition-colors"><LinkedinIcon /></a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}