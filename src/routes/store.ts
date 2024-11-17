import { writable } from 'svelte/store'

export const numberOfQuestions = writable(5)

export const allowedWeeks = writable<number[]>([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
])

export const quizBegun = writable(false)