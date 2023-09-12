import React from 'react'
import {store} from "../store/store";
import {css} from '@emotion/css'

interface Props {
    randomInt: number
}


export class GeneratePhrase extends React.Component<Props, { phrase: string[] }> {

    constructor(props: Props | Readonly<Props>) {
        super(props)
        this.state = {
            phrase: [],
        }
    }

    splitString = (stringToSplit: string, separator: string) => {
        return stringToSplit.split(separator)
    }

    componentDidMount() {
        this.setState(
            {
                phrase: this.splitString(store.getState().phrase.phrases[this.props.randomInt].phrase, ' ')
            }
        )

    }

    render() {
        const TranslatePhrase = css`
          width: 14.5rem;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: flex-start;
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
            padding-bottom: 2px; /* Создаем пространство для пунктирной линии */
            background-image: linear-gradient(to right, transparent 50%, #252525 50%, #252525 100%);
            background-size: 5px 1px;
            background-repeat: repeat-x;
            background-position: 0 100%; /* Начало пунктирной линии снизу */
            margin-right: .63rem;
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