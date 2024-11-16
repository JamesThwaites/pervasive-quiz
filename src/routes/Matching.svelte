<script lang="ts">
    import type { MatchingAnswer, MatchingQuestion } from "$lib/data";

    let { question, answer = $bindable(), submitted, show_answers }: {question: MatchingQuestion, answer: MatchingAnswer, submitted: boolean, show_answers: boolean} = $props();
</script>

<div id="QuestionChoices">
    {#each question.parts as part, index}
    <div class="question_choice">
        <label for="choice_{index + 1}">{part}</label>
        <select bind:value={answer[part]} id="choice_{index + 1}" disabled={submitted} 
                class={submitted ? (question.answers[part] == answer[part] ? "correct" : "incorrect") : ""}
        >
            {#each question.choices as choice}
            <option value={choice}>{choice}</option>
            {/each}
        </select>
    </div>
    {#if question.answers[part] !== answer[part] && submitted && show_answers}
    <div class="correct_answer">
        <span><b>Correct Answer:</b></span>
        <span>{question.answers[part]}</span>
    </div>
    {/if}
    {/each}
</div>

<style>
    #QuestionChoices {
        display: flex;
        flex-direction: column;
    }

    .correct_answer {
        align-self: flex-end;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .question_choice {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 0.5rem;
        padding-bottom: 0.25rem;
        margin: 0.125rem;
        border: 2px solid rgb(162, 102, 102);
        border-radius: 0.5rem;
        position: relative;
    }

    label {
        font-size: 1.25rem;
    }

    .question_choice:has(select.incorrect)::before {
        font-size: 1.25rem;

        content: "Incorrect!";
        position: absolute;
        color: white;

        left: -6rem;
        top: 0%;
        background-color: red;
        padding: 0.25rem;
        padding-top: 0.5rem;

        border-radius: 0.5rem;
    }

    .question_choice:has(select.incorrect)::after {
        content: " ";
        position: absolute;
        top: 0.67rem;
        left: -0.35rem; /* To the right of the tooltip */
        border-width: 0.5rem;
        border-style: solid;
        border-color: transparent transparent transparent red;
    }
    
    .question_choice:has(select.correct)::before {
        font-size: 1.25rem;

        content: "Correct!";
        position: absolute;
        color: white;

        left: -5.23rem;
        top: 0%;
        background-color: green;
        padding: 0.25rem;
        padding-top: 0.5rem;

        border-radius: 0.5rem;
    }

    .question_choice:has(select.correct)::after {
        content: " ";
        position: absolute;
        top: 0.67rem;
        left: -0.35rem; /* To the right of the tooltip */
        border-width: 0.5rem;
        border-style: solid;
        border-color: transparent transparent transparent green;
    }

    @media screen and (max-width: 675px) {
        select {
            width: 3rem;
            margin-top: -0.2rem;
        }

        .correct_answer {
            padding: 0;
            padding-right: 0.5rem;
            margin: 0;
            font-size: 0.9rem;
        }

        .question_choice:has(select.incorrect)::before {
            font-size: 0.5rem;

            left: -2.8rem;
            top: .46rem;
        }

        .question_choice:has(select.correct)::before {
            font-size: 0.5rem;

            left: -2.45rem;
            top: 0.46rem;
        }
    }
</style>