import React from 'react';
import head from './head.svg';
import body from './body.svg';
import './styles/Main.sass';
import {css} from '@emotion/css'
import GeneratePhrase from "./elements/GeneratePhrase";
import WordsFiled from "./elements/words_field";


const randomInteger = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
}


function App() {
    let randomPhrase = randomInteger(0, 9)
    return (
        <div className="App">
            <h1>Translate this sentence</h1>
            <div className={Container}>
                <span className={PersonContainer}>
                    <img src={head} className={Head} alt="Head"/>
                    <img src={body} className="" alt="Body"/>
                </span>
                <GeneratePhrase randomInt={randomPhrase}/>
            </div>
            <WordsFiled randomInt={randomPhrase}/>
        </div>
    );
}

const Container = css`
  display: flex;
  align-items: center;
`

const PersonContainer = css`
  display: flex;
  flex-direction: column;
  align-self: start;
  align-items: center;
`

const Head = css`
  margin-bottom: -0.5rem;
`

export default App;
