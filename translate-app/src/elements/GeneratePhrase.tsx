import React from 'react'
import {store} from "../store/store";
import {css} from '@emotion/css'

export class GeneratePhrase extends React.Component<{}, { phrase: string[] }> {
    // private phrases: []
    constructor(phrase: string[]) {
        super({}, { phrase: [] })
        this.state = {
            phrase : []
        }
    }

    randomInteger = (min: number, max: number) => {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

     splitString = (stringToSplit: string, separator: string) => {
        let arrayOfStrings : string[] = stringToSplit.split(separator)

        console.log('Оригинальная строка: "' + stringToSplit + '"')
        console.log('Разделитель: "' + separator + '"')
        console.log("Массив содержит " + arrayOfStrings.length + " элементов: " + arrayOfStrings.join(" / "),)


        return arrayOfStrings
    }

    componentDidMount() {

        let mass : string[]


        mass = this.splitString(store.getState().phrase.phrases[this.randomInteger(0, 9)].phrase, ' ')

        // console.log(mass)

        // this.setState({phrase: store.getState().phrase.phrases[this.randomInteger(0, 9)].phrase})

        this.setState({phrase: mass})

    }

    render() {
        const TranslatePhrase = css`
          align-self: self-start;
          stroke-width: 2px;
          stroke: #252525;
          border: #252525 solid 2px;
          padding: 17px;
          border-radius: 15px;
          position: relative;
          margin-left: 20px; 
          
          &::before {
            content: '';
            position: absolute;
            top: 70%;
            left: -20px;
            margin-top: -10px;
            width: 0;
            height: 0;
            border-top: 20px solid transparent;
            border-bottom: 0 solid transparent;
            border-right: 20px solid #252525;
          }
          
          &::after {
            content: '';
            position: absolute;
            top: 70%;
            left: -15px;
            margin-top: -10px;
            width: 0;
            height: 0;
            border-top: 18px solid transparent;
            border-bottom: 0 solid transparent;
            border-right: 18px solid #ffffff;
          }

          span {
            position: relative;
            display: inline;
            padding-bottom: 2px; /* Создаем пространство для пунктирной линии */
            background-image: linear-gradient(to right, transparent 50%, #252525 50%, #252525 100%);
            background-size: 5px 1px;
            background-repeat: repeat-x;
            background-position: 0 100%; /* Начало пунктирной линии снизу */
            margin-right: 5px;
          }
          
        `
        return (
            <div className={TranslatePhrase}>
                {this.state.phrase.map((item, index) =>
                    <span key={index}>{item}</span>
                )}
            </div>
        )
    }


}

export default GeneratePhrase