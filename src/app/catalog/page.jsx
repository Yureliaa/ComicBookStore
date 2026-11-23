
"use client";

import { useState } from "react";
import comicsData from "@/data/comics.json";

export default function CatalogPage() {
  const [comics, setComics] = useState(comicsData);
  const [search, setSearch] = useState("");
  const [selectedComic, setSelectedComic] = useState(null);

  const filteredComics = comics.filter((comic) =>
    comic.title.toLowerCase().includes(search.toLowerCase())
  );

  const deleteComic = (id) => {
    const confirmed = window.confirm(
      "Haluatko varmasti poistaa tämän sarjakuvan?"
    );

    if (confirmed) {
      setComics(comics.filter((comic) => comic.id !== id));
    }
  };

  return (
    <main>
      <h1>Katalogin hallinta</h1>

      <h2>Sarjakuvat ({comics.length})</h2>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Kirjoittaja</th>
            <th>Kustantaja</th>
            <th>Hinta</th>
            <th>Varasto</th>
            <th>Toiminnot</th>
          </tr>
        </thead>

        <tbody>
          {filteredComics.map((comic) => (
            <tr key={comic.id}>
              <td>{comic.title}</td>
              <td>{comic.author}</td>
              <td>{comic.publisher}</td>
              <td>{comic.price} €</td>
              <td>{comic.stock}</td>

              <td>
                <button
                  onClick={() => setSelectedComic(comic)}
                >
                  Näytä
                </button>

                <button
                  onClick={() => deleteComic(comic.id)}
                >
                  Poista
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedComic && (
        <section>
          <h2>{selectedComic.title}</h2>

          <p>Kirjoittaja: {selectedComic.author}</p>
          <p>Kuvittaja: {selectedComic.illustrator}</p>
          <p>Kustantaja: {selectedComic.publisher}</p>
          <p>Julkaisuvuosi: {selectedComic.year}</p>
          <p>Genre: {selectedComic.genre}</p>
          <p>ISBN: {selectedComic.isbn}</p>
          <p>Hinta: {selectedComic.price} €</p>
          <p>Varasto: {selectedComic.stock}</p>
          <p>{selectedComic.description}</p>

          <button onClick={() => setSelectedComic(null)}>
            Sulje
          </button>
        </section>
      )}
    </main>
  );
}
