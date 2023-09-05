import React from 'react'
import {store} from "../store/store";
import {css} from "@emotion/css"

interface Props {
    randomInt: number
}

type Words = {
    id: number,
    word: string
}

type Boards = {
    id: number
    wordsList: Words[]
}


export class Words_field extends React.Component<Props, { phrase: string[], boards: Boards[]}> {
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
            ]
        }

        this.currentWord = {id: 0, word: ''}
        this.currentBoard = {id: 0, wordsList: []}
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
                word: word
            })
        )

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

    private dropHandler(e: React.DragEvent<HTMLSpanElement>, board: Boards, word: Words) {
        e.preventDefault()
        const wordsList = board.wordsList

        let wordsArray = wordsList.map(item => {
            if (item.id === word.id) {
                return {...item, id: this.currentWord?.id}
            }
            if (item.id === this.currentWord?.id) {
                return {...item, id: word.id}
            }
            return item
        })

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

        this.setState({
            boards: boardArray
        })
    }

    dropBoardHandler(e: React.DragEvent<HTMLDivElement>, board: Boards) {
        e.preventDefault()
        board.wordsList.push(this.currentWord)

        const currentIndex = this.currentBoard.wordsList.indexOf(this.currentWord)
        this.currentBoard.wordsList.splice(currentIndex, 1)

        const wordsList = board.wordsList

        let wordsArray = wordsList.map(item => {
            if (item.id === this.currentWord.id && board.id === this.state.boards[this.state.boards.length-1].id) {
                return {...item}
            }
            return item
        })

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

        this.setState({
            boards: boardArray
        })

        // const dropIndex = board.wordsList.indexOf(word)
        // board.wordsList.splice(dropIndex + 1, 0, this.currentWord)
    }


    sortWords = (a: Words, b: Words) => {
        if (a.id > b.id)
            return +1
        else
            return -1
    }


    render() {
        const answerArea = css`
          width: 30rem;
          height: 2rem;
          border-bottom: solid 1px #4B4B4B;
          margin-top: 2.81rem;
        `
        const wordField = css`
          width: 30rem;
          height: 2rem;
          margin-top: 2.81rem;
          display: grid;
          column-gap: .6rem;
          row-gap: .94rem;
          grid-template-columns: .1fr 1fr 1fr 1fr 1fr 1fr;
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
        const button = css`
          width: 30rem;
          transition: .5s;
          color: #7b7b7b;
          margin-top: 5rem;
          height: 4.25rem;
          flex-shrink: 0;
          border-radius: 5.5rem;
          background: linear-gradient(91deg, #FFF 0%, #F2F2F2 100%);
          box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.20), -2px -4px 8px 0px #FFF;
          font-size: 1.125rem;
          font-style: normal;
          font-weight: 700;
          line-height: normal;

          &:hover {
            color: #000;
            cursor: pointer;
          }

          &:active {
            color: #000;
            cursor: pointer;
            box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.20) inset, -2px -4px 12px 0px #FFF inset;
          }
        `

        return <div>
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
                </div>
            )}
            {/*<div className={wordField}>*/}
            {/*    {this.state.words.sort(this.sortWords).map((item, index) =>*/}
            {/*            */}
            {/*    )}*/}
            {/*</div>*/}


            <button className={button}>Check</button>
        </div>
    }


}

export default Words_field