import React from 'react';
import head from './head.svg';
import body from './body.svg';
import './styles/Main.sass';
import {css} from '@emotion/css'
import GeneratePhrase from "./elements/GeneratePhrase";


function App() {
    return (
        <div className="App">
            <h1>Translate this sentence</h1>
            <div className={Container}>
                <span className={PersonContainer}>
                    <img src={head} className={Head} alt="Head"/>
                    <img src={body} className="" alt="Body"/>
                </span>
                <GeneratePhrase/>
            </div>
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
