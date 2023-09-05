import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Phrase{
    id: number
    word: string
    language: number
}

interface PhraseState{
    words: Phrase[]
}

const initialState: PhraseState = {
    words : [
        {
            id: 0,
            word: 'be know...',
            language: 0
        },
        {
            id: 1,
            word: 'first',
            language: 0
        },
        {
            id: 2,
            word: 'to',
            language: 0
        },
        {
            id: 3,
            word: 'know...',
            language: 0
        },
        {
            id: 4,
            word: 'домашние животные',
            language: 1
        },
        {
            id: 5,
            word: 'Я попрошу своих юристов составить договор.',
            language: 1
        },
        {
            id: 6,
            word: 'We are open 24 hours a day.',
            language: 0
        },
        {
            id: 7,
            word: 'враждебность сдерживаемая разумом (интеллектом)',
            language: 1
        },
        {
            id: 8,
            word: 'Признание — это самый мощный фактор мотивации.',
            language: 1
        },
        {
            id: 9,
            word: 'Наша компания управляет авиалинией в Аргентине',
            language: 1
        }
    ]
};

export const PhraseSlice = createSlice({
    name: "word",
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<{ word: string }>) => {
            state.words.push({
                id: state.words.length,
                word: action.payload.word,
                language: 0
            });
        },
    },
})

export default PhraseSlice.reducer;
export const { addPerson } = PhraseSlice.actions;