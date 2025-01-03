import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function generateUniqueId() {
  const segments = [];
  const chars = 'abcdefghijklmnopqrstuvwxyz'; // Adjust as needed
  
  for (let i = 0; i < 3; i++) {
      let segment = '';
      for (let j = 0; j < 4; j++) {
          segment += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      segments.push(segment);
  }
  
  return segments.join('-');
}



