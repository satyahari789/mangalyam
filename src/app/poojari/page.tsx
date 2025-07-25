// app/poojari/page.tsx
import Image from "next/image";
import { poojaris } from "../data/poojaris";

export default function PoojariPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-brand-accent">
        Book a Poojari for Your Occasion
      </h1>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Find experienced poojaris for all types of Hindu ceremonies like Marriage, Griha Pravesh, Satyanarayan Pooja, and more.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {poojaris.map((poojari, index) => (
          <div key={index} className="bg-white shadow rounded-xl overflow-hidden">
            <Image
              src={poojari.image}
              alt={poojari.name}
              width={400}
              height={250}
              className="w-full h-85 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{poojari.name}</h2>
              <p className="text-sm text-gray-500">{poojari.experience} • {poojari.location}</p>

              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">Pooja Types:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {poojari.poojaTypes.map((type, i) => (
                    <li key={i}>{type}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
