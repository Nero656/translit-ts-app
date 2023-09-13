import React from 'react'
import {store} from "../store/store";
import {css} from "@emotion/css"

interface Props {
    randomInt: number
}

type Words = {
    id: number,
    key: number,
    word: string,
    enabled: boolean
}

type Boards = {
    id: number
    wordsList: Words[]
}


export class Words_field extends React.Component<Props,
    {
        phrase: string[],
        boards: Boards[],
        isError: boolean,
        isSuccess: boolean
    }> {
    private readonly maxLength : number
    private currentWord: Words
    private currentBoard: Boards

    constructor(props: Props | Readonly<Props>) {
        super(props)
        this.state = {
            phrase: [],
            boards: [
                {id: 0, wordsList: []},
                {id: 1, wordsList: []},
                {id: 2, wordsList: []},
            ],
            isError: false,
            isSuccess: false
        }

        this.currentWord = {id: 0, key: 0, word: '', enabled: false}
        this.currentBoard = {id: 0, wordsList: []}
        this.maxLength = 12
    }

    splitString = (stringToSplit: string, separator: string) => {
        return stringToSplit.split(separator)
    }

    shuffle = (array: string[]) => {
        return array.sort(() => Math.random() - 0.5);
    }

    componentDidMount() {
        const phraseWords = this.shuffle(this.splitString(
            store.getState().phrase.phrases[this.props.randomInt].translate, ' '
        ))
        const wordsArray = phraseWords.map((word, index) =>
            ({
                id: index,
                key: index,
                word: word,
                enabled: true
            })
        )

        while (wordsArray.length < this.maxLength) {
            wordsArray.push({
                id: wordsArray.length,
                key: wordsArray.length,
                word: ' ',
                enabled: false
            })
        }

        const newBoard = [
            {id: 0, wordsList: []},
            {id: 1, wordsList: []},
            {id: 2, wordsList: wordsArray}
        ]

        this.setState({
            boards: newBoard
        })
    }

    private dragStartHandler(e: React.DragEvent<HTMLSpanElement>, board: Boards, word: Words) {
        this.currentWord = word
        this.currentBoard = board
    }

    private dragLeaveHandler(e: React.DragEvent<HTMLSpanElement>) {
    }

    private dragEndHandler(e: React.DragEvent<HTMLSpanElement>) {
        e.preventDefault()
    }

    private dragOverHandler(e: React.DragEvent<HTMLSpanElement>) {
        e.preventDefault()
    }

    private boardUpdate(wordsArray: Words[], board: Boards) {
        const boardList = this.state.boards

        const boardArray = boardList.map(item => {
                if (item.id === board.id) {
                    item.wordsList = wordsArray
                    return board
                }

                if (item.id === this.currentBoard?.id) {
                    return this.currentBoard
                }
                return item
            }
        )

        if (this.currentBoard.id === 2 && board.id !== 2) {
            this.state.boards[2].wordsList.push({
                id: this.state.boards[2].wordsList.length,
                key: this.state.boards[2].wordsList.length,
                word: ' ',
                enabled: false
            })
        } else if (this.state.boards[2].id === board.id && this.currentBoard.id !== 2) {
            this.state.boards[2].wordsList.splice(10, 1)
        }

        this.setState({
            boards: boardArray
        })
    }

    private dropHandler(e: React.DragEvent<HTMLSpanElement>, board: Boards, word: Words) {
        e.preventDefault()
        const wordsList = board.wordsList

        board.wordsList = wordsList.map(item => {
            if (item.id === word.id) {
                return {...item, key: this.currentWord?.key}
            }
            if (item.id === this.currentWord?.id) {
                return {...item, key: word.key}
            }
            return item
        })
    }

    private dropBoardHandler(e: React.DragEvent<HTMLDivElement>, board: Boards) {
        e.preventDefault()
        this.currentWord.key += 1
        board.wordsList.push(this.currentWord)

        const currentIndex = this.currentBoard.wordsList.indexOf(this.currentWord)
        this.currentBoard.wordsList.splice(currentIndex, 1)

        const wordsList = board.wordsList

        this.boardUpdate(wordsList, board)
    }

    private sortWords = (a: Words, b: Words) => {
        return a.key > b.key ? 1 : -1
    }

    private sortWordsByEnabled = (a: Words, b: Words) => {
        return a.enabled < b.enabled ? 1 : -1
    }

    private answerCheck = () => {
        if (this.state.boards[0].wordsList.length === 0 && this.state.boards[1].wordsList.length === 0)
            return true
        else
            return false
    }


    render() {
        const form = css`
          margin-top: 2.81rem;
        `
        const answerArea = css`
          display: grid;
          gap: .3rem;
          min-height: 2.5rem;
          width: 30rem;
          padding: .3em 0 .3em 0;
          border-top: solid 1px #4B4B4B;
          border-bottom: solid 1px #4B4B4B;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          margin-top: -1px;
        `
        const wordField = css`
          width: 30rem;
          height: 3rem;
          margin-top: 2.81rem;
          display: grid;
          column-gap: .6rem;
          row-gap: .94rem;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        `
        const word = css`
          cursor: grab;
          padding: .25rem .25rem .31rem .25rem;
          text-align: center;
          flex-shrink: 0;
          border-radius: 0.8125rem;
          border: 1px solid #C9C9C9;
          box-shadow: 0 8px 4px -6px rgba(0, 0, 0, 0.25);
          user-select: none;
        `
        const wordEmpty = css`
          cursor: revert;
          height: 1.875rem;
          padding: .25rem .25rem .31rem .25rem;
          text-align: center;
          flex-shrink: 0;
          border-radius: 0.8125rem;
          background: #E6E6E6;
          box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25) inset;
          user-select: none;
        `
        const ansBlock = css`
          height: 10rem;
        `
        const errorMes = css`
          position: relative;
          top: 5rem;
          color: #F00;
          text-shadow: 1px 2px 2px rgba(91, 13, 13, 0.50), -1px -2px 2px #FFF;
          text-align: center;
          z-index: 1;
        `
        const successMes = css`
          position: relative;
          top: 5rem;
          color: #2fff00;
          text-shadow: 1px 2px 2px rgba(30, 91, 13, 0.5), -1px -2px 2px #FFF;
          text-align: center;
          z-index: 1;
        `
        let button = css`
          width: 30rem;
          color: #7b7b7b;
          margin-top: 5rem;
          height: 4.25rem;
          flex-shrink: 0;
          border-radius: 5.5rem;
          background: linear-gradient(91deg, #FFF 0%, #F2F2F2 100%);
          box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6) inset;
          font-size: 1.125rem;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          position: absolute;
          z-index: 2;
          
          &:hover {
            color: #000;
            cursor: pointer;
          }

          &:active {
            color: #000;
            cursor: pointer;
            box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.20) inset, -2px -4px 12px 0px #FFF inset;
          }

          &:disabled,
          button[disabled] {
            color: #7b7b7b;
            border-radius: 5.5rem;
            background: linear-gradient(91deg, #FFF 100%, #F2F2F2 100%);
            box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.20), -2px -4px 8px 0px #FFF;
          }
        `
        const but_anim = css`
          animation: errorAns 3s forwards;
          @keyframes errorAns {
            0%{
              margin-top: 5rem;
              box-shadow: 0 0 0 rgba(34, 60, 80, 0.6), 0 5px 5px -5px rgba(34, 60, 80, 0.6) inset;
            }
            
            50%{
              box-shadow: 5px 0 5px -5px rgba(34, 60, 80, 0.6),0 0 0 0 rgba(34, 60, 80, 0.6) inset;
            }
            
            100% {
              transform: translateY(2.5rem);
              box-shadow: 5px 5px 10px 2px rgba(34, 60, 80, 0.2);
            }
          }
        `

        const wordIsEmpty = (enabled: boolean) => {
            switch (enabled) {
                case true:
                    return {style: word, drag: true};
                case false:
                    return {style: wordEmpty, drag: false}
            }
        }

        const answer = () => {
            let phrase: string = ''
            for (let i = 0; i < 2; i++) {
                this.state.boards[i].wordsList.map(word => {
                    phrase += word.word + ' '
                })
            }
            phrase = phrase.slice(0, -1)
            if (phrase === store.getState().phrase.phrases[this.props.randomInt].translate) {
                window.speechSynthesis.speak(new SpeechSynthesisUtterance('Answer is correct!'))
                this.setState({isError: false, isSuccess: true})
            } else
                this.setState({isError: true, isSuccess: false})
        }

        return <div className={form}>
            {this.state.boards.map((board, index) =>
                <div onDragOver={(e) => this.dragOverHandler(e)}
                     onDrop={(e) => this.dropBoardHandler(e, board)}
                     key={board.id}>
                    {this.state.boards[this.state.boards.length - 1].id !== board.id &&
                        <div className={answerArea}>
                            {board.wordsList.sort(this.sortWords).map((item, index) =>
                                <span
                                    key={index}
                                    className={word}
                                    draggable={true}
                                    onDragStart={(e) => this.dragStartHandler(e, board, item)}
                                    onDragLeave={(e) => this.dragLeaveHandler(e)}
                                    onDragEnd={(e) => this.dragEndHandler(e)}
                                    onDragOver={(e) => this.dragOverHandler(e)}
                                    onDrop={(e) => this.dropHandler(e, board, item)}
                                >
                                        {item.word}
                                </span>
                            )}
                        </div>
                    }

                    {this.state.boards[this.state.boards.length - 1].id === board.id &&
                        <div className={wordField}>
                            {board.wordsList.sort(this.sortWordsByEnabled).map((item, index) =>
                                <span
                                    key={index}
                                    className={wordIsEmpty(item.enabled).style}
                                    draggable={wordIsEmpty(item.enabled).drag}
                                    onDragStart={
                                        (e) =>
                                            this.dragStartHandler(e, board, item)
                                    }
                                    onDragLeave={(e) => this.dragLeaveHandler(e)}
                                    onDragEnd={(e) => this.dragEndHandler(e)}
                                    onDragOver={(e) => this.dragOverHandler(e)}
                                    onDrop={(e) => this.dropHandler(e, board, item)}
                                >
                                        {item.word}
                                </span>
                            )}
                        </div>
                    }
                </div>
            )}

            <div className={ansBlock}>
                {this.state.isError &&
                    <>
                        <button
                            className={button+' '+but_anim}
                            disabled={this.answerCheck()}
                            onClick={(e) => answer()}>
                            Check
                        </button>
                        <p className={errorMes}>Something wrong!</p>
                    </>
                }

                {this.state.isSuccess &&
                    <>
                        <button
                        className={button+' '+but_anim}
                        disabled={this.answerCheck()}
                        onClick={(e) => answer()}>
                        Check
                        </button>
                        <p className={successMes}>Answer is correct!</p>
                     </>
                }

                {!this.state.isError && !this.state.isSuccess &&
                    <button
                        className={button}
                        disabled={this.answerCheck()}
                        onClick={(e) => answer()}>
                        Check
                    </button>
                }
            </div>
        </div>
    }
}

export default Words_field