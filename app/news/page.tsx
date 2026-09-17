import Reveal from "@/components/Reveal";

const news = [
  { title: "Annual Science Fair 2024", date: "March 15, 2024", excerpt: "Students showcase innovative projects in our annual science exhibition.", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { title: "State Basketball Championship", date: "February 28, 2024", excerpt: "Our varsity team brings home the gold after an undefeated season.", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { title: "Spring Art Exhibition", date: "April 10, 2024", excerpt: "Discover the creative talents of our students at the annual art show.", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

export default function News() {
  return (
    <div>
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')"}}></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight">News & Events</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-lg text-blue-100">Stay updated with the latest happenings at Horizon</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-3 gap-8">
        {news.map((n, i) => (
          <Reveal key={n.title} delay={i * 0.15}>
            <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition h-full flex flex-col">
              <div className="overflow-hidden">
                <img src={n.img} alt={n.title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-amber-500 font-semibold mb-2">{n.date}</p>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{n.title}</h3>
                <p className="text-gray-500 mb-4 flex-grow">{n.excerpt}</p>
                <a href="#" className="text-blue-900 font-semibold hover:text-amber-500 transition-colors inline-flex items-center">
                  Read More 
                  <span className="ml-1">&rarr;</span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}