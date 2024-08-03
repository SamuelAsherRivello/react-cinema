import { Rating } from "./Rating";

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  meta: {
    description: string;
    ratings: Rating[];
  };
}
