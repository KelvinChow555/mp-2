import Newspapers from "./components/Newpapers.tsx";
import styled from "styled-components";
import {useEffect, useState} from "react";
import type {Newpaper} from "./Interfaces/Newpaper.ts";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 5px #3b2f2f solid;
`;

const Header=styled.div`
    text-align: center;
    padding: 1em;
    font-family: Georgia, "Times New Roman", serif;
`;
const Datainput = styled.input`
    font-size: 1.2rem;
    padding: 10px 14px;
    border: 2px solid #3b2f2f;
    border-radius: 6px;
    margin-right: 10px;
`;

const SearchButton = styled.button`
    font-size: 1.2rem;
    padding: 10px 24px;
    background-color: #3b2f2f;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #5a4636;
    }
`;

export default function App(){
  const [input, setInput] = useState<string>("1918-11-11");
  const [date, setDate] = useState<string>("1918-11-11");
  const [data, setData] = useState<Newpaper[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true);
      setError("");
      const rawData = await fetch(`https://www.loc.gov/collections/chronicling-america/?dl=page&dates=${date}/${date}&fo=json&c=12`);
      const {results}: { results: Newpaper[] } = await rawData.json();
      setData(results ?? []);
    }
    fetchData()
        .then(() => console.log("Data fetched successfully"))
        .catch((e: Error) => {
          console.log("There was the error: " + e);
          setError("Could not load newspapers for this date.");
        })
        .finally(() => setLoading(false));
  }, [date]);
  function handleSearch() {
    setDate(input);
  }
  return(
      <ParentDiv>
        <Header>
          <h1>News On This Day</h1>
            <p>Let's see what happened on that day!</p>
          <Datainput
              type="date"
              value={input}
              min="1756-01-01"
              max="1963-12-31"
              onChange={(e) => setInput(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && data.length === 0 && <p>No newspapers found for this date.</p>}
        </Header>
        <Newspapers data={data}/>
      </ParentDiv>
  )
}
