import Link from "next/link";
import { ItemData } from "@/types/item";

interface CardItemProps {
  item: ItemData;
  lang: string;
  noImageText?: string;
}

export default function CardItem({ item, lang, noImageText = "No image" }: CardItemProps) {
  return (
    <Link
      href={`/${lang}/items/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <div className="relative h-44 w-full bg-white dark:bg-zinc-800 p-4 overflow-hidden flex items-center justify-center">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm">
            {noImageText}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
}