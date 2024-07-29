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
    description: string;
    ratings: Rating[];
  };
}
