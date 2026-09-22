import Link from "next/link";
import { notFound } from "next/navigation";

async function getDictionary(lang: string) {
  try {
    return (await import(`@/dictionaries/${lang}.json`)).default;
  } catch {
    return (await import("@/dictionaries/es.json")).default;
  }
}

interface PageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  // Fetch individual por ID
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  
  if (!res.ok) {
    notFound();
  }

  const product = await res.json();

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 py-10">
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
      >
        {dict.detail?.back || "← Volver"}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Contenedor de la Imagen */}
        <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 dark:border-zinc-800">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 w-auto object-contain"
          />
        </div>

        {/* Información del Producto */}
        <div className="flex flex-col justify-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
            {product.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {product.title}
          </h1>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            ${product.price}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Calificación (rating) si existe */}
          {product.rating && (
            <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-500">
              ★ {product.rating.rate} / 5 ({product.rating.count} votos)
            </div>
          )}
        </div>
      </div>
    </main>
  );
}