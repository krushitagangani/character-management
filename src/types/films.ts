export type FilmCharacter = {
  name: string;
  films?: Array<string>;
};

export type Film = {
  title: string;
  release_date: string;
  producer?: string;
  director?: string;
};
