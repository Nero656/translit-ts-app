import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Phrase{
    id: number
    phrase: string
    translate: string
    language: number
}

interface PhraseState{
    phrases: Phrase[]
}

const initialState: PhraseState = {
    phrases : [
        {
            id: 0,
            phrase: 'be first to know...',
            translate: 'узнайте первым...',
            language: 0
        },
        {
            id: 1,
            phrase: 'We\'ll host a formal dinner',
            translate: 'Мы устроим официальный обед',
            language: 0
        },
        {
            id: 2,
            phrase: 'Can you draw a cat?',
            translate: 'Ты можешь нарисовать кота?',
            language: 0
        },
        {
            id: 3,
            phrase: 'pros and cons of nuclear power',
            translate: 'плюсы и минусы атомной энергии',
            language: 0
        },
        {
            id: 4,
            phrase: 'домашние животные',
            translate: 'domestic animals',
            language: 0
        },
        {
            id: 5,
            phrase: 'Я попрошу своих юристов составить договор.',
            translate: 'I\'ll have my lawyers draw up a contract.',
            language: 0
        },
        {
            id: 6,
            phrase: 'We are open 24 hours a day.',
            translate: 'Мы открыты 24 часа в сутки.',
            language: 0
        },
        {
            id: 7,
            phrase: 'враждебность сдерживаемая разумом (интеллектом)',
            translate: 'a hostility tempered by intellect',
            language: 0
        },
        {
            id: 8,
            phrase: 'Признание — это самый мощный фактор мотивации.',
            translate: 'Recognition is the most powerful motivation factor.',
            language: 0
        },
        {
            id: 9,
            phrase: 'Наша компания управляет авиалинией в Аргентине',
            translate: 'Our company operates an airline in Argentina.',
            language: 0
        }
    ]
};

export const PhraseSlice = createSlice({
    name: "phrase",
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<{ phrase: string }>) => {
            state.phrases.push({
                id: state.phrases.length,
                phrase: action.payload.phrase,
                translate: "",
                language: 0
            });
        },
    },
})

export default PhraseSlice.reducer;
export const { addPerson } = PhraseSlice.actions;