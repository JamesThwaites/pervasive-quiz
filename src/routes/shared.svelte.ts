export const current_question = $state({
        num: 0
    }
)

export const selector = $state({
    numberOfQuestions: 5,
    allowedWeeks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,],
    quizBegun: false
})