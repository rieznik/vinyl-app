import { describe, expect, it, vi } from "vitest";
import { getNodeText, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
  image: "/src/assets/record.png",
};

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("<VinylCard />", () => {
  it("shows artist, title and cover image", () => {
    render(
      <MemoryRouter>
        <VinylCard
          vinyl={vinyl}
          favoritesList={[]}
          collectionList={[]}
          onFavoritesClick={() => {}}
          onAddToCollectionClick={() => {}}
        />
      </MemoryRouter>
    );
    const img = screen.getByRole("img");
    const title = screen.queryByText("Random Access Memories");
    const artist = screen.queryByText("Daft Punk");

    expect(artist).not.toBeNull();
    expect(title).not.toBeNull();
    expect(img).toBeDefined();
  });

  it("shows vinyl details", () => {
    render(
      <MemoryRouter>
        <VinylCard
          vinyl={vinyl}
          favoritesList={[]}
          collectionList={[]}
          onFavoritesClick={() => {}}
          onAddToCollectionClick={() => {}}
        />
      </MemoryRouter>
    );
    const list = screen.queryByRole("list");
    const listItems = screen.queryAllByRole("listitem");
    const yearNode = listItems.find((item) => item.innerHTML.match("Year"));
    const year = within(yearNode).getByRole("link");
    const genreNode = listItems.find((item) => item.innerHTML.match("Genre"));
    const genre = within(genreNode).getByRole("link");
    const stylesNode = listItems.find((item) => item.innerHTML.match("Style"));
    const stylesNodeList = within(stylesNode).getAllByRole("link");
    const styles = stylesNodeList
      .map((styleNode) => {
        return getNodeText(styleNode);
      })
      .join("");

    expect(list.childNodes).toHaveLength(4);
    expect(stylesNodeList).toHaveLength(4);
    expect(styles).toBe("Disco, Funk, Synth-pop, Electro");
    expect(genre).toHaveTextContent("Electronic");
    expect(year).toHaveTextContent("2013");
  });

  it("shows add to favorites and add to collection buttons", () => {
    render(
      <MemoryRouter>
        <VinylCard
          vinyl={vinyl}
          favoritesList={[]}
          collectionList={[]}
          onFavoritesClick={() => {}}
          onAddToCollectionClick={() => {}}
        />
      </MemoryRouter>
    );
    const favoriteButton = screen.getByRole("button", {
      name: /add to favorite/i,
    });
    const collectionButton = screen.getByRole("button", {
      name: /add to collection/i,
    });
    const collectionButtonIcon = within(collectionButton).getByTestId("plus");

    expect(favoriteButton).toBeDefined();
    expect(collectionButton).toBeDefined();
    expect(collectionButtonIcon).toBeDefined();
  });

  it("shows remove from favorites button when vinyl is in favorites list", () => {
    const favoritesList = [4570366];
    render(
      <MemoryRouter>
        <VinylCard
          vinyl={vinyl}
          favoritesList={favoritesList}
          collectionList={[]}
          onFavoritesClick={() => {}}
          onAddToCollectionClick={() => {}}
        />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", {
      name: /remove from favorite/i,
    });

    expect(button).toBeDefined();
  });

  it("shows in collection button when vinyl is in collection list", () => {
    const collectionList = [{ id: 4570366, note: "" }];
    render(
      <MemoryRouter>
        <VinylCard
          vinyl={vinyl}
          favoritesList={[]}
          collectionList={collectionList}
          onFavoritesClick={() => {}}
          onAddToCollectionClick={() => {}}
        />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", {
      name: /in collection/i,
    });
    const icon = within(button).getByTestId("check");

    expect(button).toBeDefined();
    expect(icon).toBeDefined();
  });

  it("calls onFavoritesClick if add to favorites clicked", async () => {
    const toggleFavorite = vi.fn();
    render(
      <MemoryRouter>
        <VinylCard
          vinyl={vinyl}
          favoritesList={[]}
          collectionList={[]}
          onFavoritesClick={toggleFavorite}
          onAddToCollectionClick={() => {}}
        />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", {
      name: /add to favorite/i,
    });

    await userEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalledOnce();
    expect(toggleFavorite).toBeCalledWith(4570366);
  });

  it("calls onAddToCollectionClick if add to collection clicked", async () => {
    const toggleInCollection = vi.fn();
    render(
      <MemoryRouter>
        <VinylCard
          vinyl={vinyl}
          favoritesList={[]}
          collectionList={[]}
          onFavoritesClick={() => {}}
          onAddToCollectionClick={toggleInCollection}
        />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", {
      name: /add to collection/i,
    });

    await userEvent.click(button);

    expect(toggleInCollection).toHaveBeenCalledOnce();
    expect(toggleInCollection).toBeCalledWith(4570366);
  });
});
