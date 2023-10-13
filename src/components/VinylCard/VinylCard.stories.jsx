import VinylCard from "./VinylCard.jsx";

const vinyl = {
  id: 4570366,
  title: "Random Access Memories",
  artist: "Daft Punk",
  year: 2013,
  country: {
    id: "uk",
    title: "UK",
  },
  genre: {
    id: 1,
    title: "Electronic",
  },
  styles: ["Disco", "Funk", "Synth-pop", "Electro"],
  image:
    "https://i.discogs.com/9yHWcIsR42F3E1h-du9w3wRlEnd8w5tSeLlGNjQ-so0/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ1NzAz/NjYtMTUzOTI5NTA5/Mi02MDg3LnBuZw.jpeg",
};

const vinylInCollection = {
  id: 4570366,
  title: "Random Access Memories",
  artist: "Daft Punk",
  year: 2013,
  country: {
    id: "uk",
    title: "UK",
  },
  genre: {
    id: 1,
    title: "Electronic",
  },
  styles: ["Disco", "Funk", "Synth-pop", "Electro"],
  image:
    "https://i.discogs.com/9yHWcIsR42F3E1h-du9w3wRlEnd8w5tSeLlGNjQ-so0/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ1NzAz/NjYtMTUzOTI5NTA5/Mi02MDg3LnBuZw.jpeg",
};

const vinylInFavorites = {
  id: 4570366,
  title: "Random Access Memories",
  artist: "Daft Punk",
  year: 2013,
  country: {
    id: "uk",
    title: "UK",
  },
  genre: {
    id: 1,
    title: "Electronic",
  },
  styles: ["Disco", "Funk", "Synth-pop", "Electro"],
  image:
    "https://i.discogs.com/9yHWcIsR42F3E1h-du9w3wRlEnd8w5tSeLlGNjQ-so0/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ1NzAz/NjYtMTUzOTI5NTA5/Mi02MDg3LnBuZw.jpeg",
};

export default {
  title: "VinylCard",
  component: VinylCard,
};

export const Primary = {
  args: {
    vinyl: vinyl,
    favoritesList: [],
    collectionList: [],
  },
};

export const InCollection = {
  args: {
    vinyl: vinylInCollection,
    favoritesList: [],
    collectionList: [4570366],
  },
};

export const InFavorites = {
  args: {
    vinyl: vinylInFavorites,
    favoritesList: [4570366],
    collectionList: [],
  },
};
