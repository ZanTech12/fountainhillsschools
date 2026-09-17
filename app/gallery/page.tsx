import Reveal from "@/components/Reveal";

const images = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1564981797816-10436664bf8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
];

export default function Gallery() {
  return (
    <div>
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')"}}></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight">Gallery</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-lg text-blue-100">Glimpses of life at Fountain Hills Schools</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <Reveal key={index} delay={(index % 3) * 0.1}>
              <div className="overflow-hidden rounded-2xl group h-48">
                <img 
                  src={src} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}