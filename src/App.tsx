import React from 'react';

import './style/global.scss';

import style from './home.module.scss';

interface IAnime {
  name?: string;
  img: string;
  quantityOfFacts: string;
  facts: [f: {
    fact: string;
  }]
  randomFact: {
    fact: string;
  }
}

function App() {
  // async function getAnime(anime: string) {
  //   const response = await fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${anime}`);
  //   const rJson = await response.json();

  //   const { img, data: facts, total_facts } = rJson;

  //   const randomFact = facts[Math.floor(Math.random() * total_facts)];

  //   console.log(randomFact.fact);
  // }

  // getAnime('fma_brotherhood');
  const [search, setSearch] = React.useState('');
  const [anime, setAnime] = React.useState<IAnime | null>();

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${search}`);
    const rJson = await response.json();
    const { img, data: facts, total_facts: quantityOfFacts } = rJson;
    const randomFact = facts[Math.floor(Math.random() * quantityOfFacts)];
    const obj: IAnime = {
      name: search,
      facts,
      quantityOfFacts,
      img,
      randomFact
    }

    setAnime(obj);
  }

  return (
    <main className={style.contentContainer}>
      <h1>Hello FID</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} ></input>
        <button type="submit">Search</button>
      </form>

      {anime ?
        <>
          <div>
            <strong>Quantity of facts: </strong>{anime.quantityOfFacts}<p><strong>Random Fact: </strong>{anime.randomFact.fact}</p>
            <img src={anime.img} alt='anime-img' className={style.animeImg}></img>
          </div>
        </> : null
      }
    </main>
  );
}

export default App;
