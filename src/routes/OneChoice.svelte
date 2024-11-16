<script lang="ts">
    import type { OneChoiceAnswer, OneChoiceQuestion } from "$lib/data";
    let { question, answer = $bindable(), submitted, show_answers }: {question: OneChoiceQuestion, answer: OneChoiceAnswer, submitted: boolean, show_answers: boolean} = $props();

    function correctness(option: string) {
        if (!submitted) {
            return ""
        }
        if (answer === option || show_answers) { 
            // option was attempted or we're showing correctness for everything, so provide a result
            return question.answer === option ? "correct" : "incorrect"
        }
        return ""
    }
</script>

<div id="QuestionChoices">
    {#each question.choices as choice, index}
    <label class="question_choice">
        <span>{choice}</span>
        <input id="choice_{index + 1}" 
                type="radio" 
                name="choices" 
                value={choice} 
                bind:group={answer} 
                disabled={submitted}
                class={correctness(choice)}
        >
    </label>
    {/each}
</div>

<style>
    #QuestionChoices {
        display: flex;
        flex-direction: column;
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
    }
    
    .question_choice:hover:enabled {
        background-color: rgb(239, 216, 185);
    }

    .question_choice:active:enabled, label:has(input:checked), label:has(input:checked):hover:enabled {
        background-color: rgb(222, 190, 148);
    }

    label {
        position: relative;
        font-size: 1.25rem;
    }

    label:has(input.incorrect:checked)::before {
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

    label:has(input.incorrect:checked)::after {
        content: " ";
        position: absolute;
        top: 0.67rem;
        left: -0.35rem; /* To the right of the tooltip */
        border-width: 0.5rem;
        border-style: solid;
        border-color: transparent transparent transparent red;
    }
    
    label:has(input.correct)::before {
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

    label:has(input.correct)::after {
        content: " ";
        position: absolute;
        top: 0.67rem;
        left: -0.35rem; /* To the right of the tooltip */
        border-width: 0.5rem;
        border-style: solid;
        border-color: transparent transparent transparent green;
    }

    @media screen and (max-width: 675px) {
        .question_choice input {
            margin-top: -0.25rem;
        }
    }
</style>