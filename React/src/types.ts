// src/types.ts

export interface Rating {
  Asher?: string;
  Julia?: string;
  [key: string]: string | undefined;
}

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  meta: {
    ratings: Rating[];
    description: string; // Add this line
  };
}