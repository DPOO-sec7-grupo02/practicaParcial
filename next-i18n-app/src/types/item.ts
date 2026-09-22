// src/types/item.ts
export interface ItemData {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  [key: string]: any; // Permite cualquier otra propiedad que traiga la API
}