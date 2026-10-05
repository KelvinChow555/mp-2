import styled from "styled-components";
import type {Newpaper} from "../Interfaces/Newpaper.ts";

const AllPagesDiv=styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    background-color: #f4ecd8;
`;

const SinglePageDiv=styled.div`
    display: flex;
    flex-direction: column;
    max-width: 28%;
    padding: 2%;
    margin: 1%;
    background-color: white;
    color: #222;
    border: 2px #3b2f2f solid;
    font-family: Georgia, "Times New Roman", serif;
`;

const PaperName=styled.h2`
    font-size: calc(10px + 0.8vw);
    margin: 0 0 4px 0;
`;

const Meta=styled.p`
    font-style: italic;
    margin: 0 0 8px 0;
`;

// a box that holds the page's text; scrolls if the text is long
const TextBox=styled.div`
    border: 1px solid #aaa;
    background-color: #fbf8f0;
    padding: 8px;
    height: 10em;
    overflow-y: auto;
    font-size: calc(8px + 0.4vw);
    line-height: 1.4;
`;

export default function Newspapers(props : { data:Newpaper[] } ){
    return (
        <AllPagesDiv>
            {
                props.data.map((page: Newpaper) =>
                    <SinglePageDiv key={page.id}>
                        <PaperName>{page.part_of_title?.[0] ?? page.title}</PaperName>
                        <Meta>
                            {page.date}
                            {page.location_city?.[0] ? ` · ${page.location_city[0]}` : ""}
                            {page.location_state?.[0] ? `, ${page.location_state[0]}` : ""}
                        </Meta>
                        <TextBox>
                            {page.description?.[0] ?? "(no text available)"}
                        </TextBox>
                    </SinglePageDiv>
                )
            }
        </AllPagesDiv>
    );
}
