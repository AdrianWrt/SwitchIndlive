"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function HomePageClient({ products }: { products: Product[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth / 2;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <main className="overflow-x-hidden bg-gray-900 text-white">
      <section
        className="relative flex flex-col items-center justify-center text-center h-[80vh] overflow-hidden"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: `center ${scrollY * 0.3}px`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70"></div>

        <div className="relative z-10 px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Welcome to SwitchInd
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-8 drop-shadow-md">
            Temukan pilihan switch - switch terbaik
            </p>
            <a
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105"
            >
            Shop Now
            </a>
        </div>
      </section>

      <section className="p-12 relative">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>

        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow hover:bg-gray-700 z-10"
        >
          ◀
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow hover:bg-gray-700 z-10"
        >
          ▶
        </button>

        <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-6 py-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
        {products.map((product) => (
            <div
            key={product.id}
            className="min-w-[250px] bg-gray-800 rounded-xl shadow-md transform transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300 flex-shrink-0 snap-start overflow-hidden group"
            >
            <div className="relative h-48 w-full cursor-pointer overflow-hidden rounded-t-xl">
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <h3 className="absolute bottom-2 left-2 text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.name}
                </h3>
            </div>

            <div className="p-4 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4">Rp {product.price.toFixed(2)}</p>
                <Link
                href={`/products/${product.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                >
                View Product
                </Link>
            </div>
            </div>
        ))}
        </div>

      </section>

      <section className="p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="font-bold text-xl mb-2 text-white">Fast Shipping</h3>
            <p className="text-gray-300">Get your orders delivered quickly and safely.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="font-bold text-xl mb-2 text-white">Easy Returns</h3>
            <p className="text-gray-300">Hassle-free returns if you’re not satisfied.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="font-bold text-xl mb-2 text-white">Secure Payments</h3>
            <p className="text-gray-300">100% secure checkout with multiple payment options.</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-gray-300 p-6 text-center">
        <p>&copy; {new Date().getFullYear()} SwitchInd. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="#" className="hover:underline">About</Link>
          <Link href="#" className="hover:underline">Contact</Link>
        </div>
      </footer>

      <style jsx>{`
        .animate-fadeInDown {
          animation: fadeInDown 1s ease forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }

        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
