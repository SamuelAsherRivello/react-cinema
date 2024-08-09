
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

export interface Rating {
  [person: string]: {
    rating: string;
    reaction: string;
  };
}

export enum Mode {
  Description,
  Reaction
}

export interface MovieItemInfoState {
  movieId: string | null;
  mode: Mode | null;
  content: string | null;
  visible: boolean;
  reviewer: string | null;
}
