<script lang="ts">
    import type { Answer, ManyChoiceAnswer, ManyChoiceQuestion, OneChoiceAnswer, OneChoiceQuestion, MatchingQuestion, MatchingAnswer, Question } from "$lib/data";
    import ManyChoice from "./ManyChoice.svelte";
    import Matching from "./Matching.svelte";
    import OneChoice from "./OneChoice.svelte";
    import { current_question, selector } from "./shared.svelte";
    import { base } from "$app/paths";

    let { question, answer = $bindable(), submittable }: { question: Question, answer: Answer, submittable: boolean } = $props()

    let prev_disabled = $derived(current_question.num === 0)
    let next_disabled = $derived(current_question.num === selector.numberOfQuestions - 1)

    let submitted = $state(false);

    let show_answers = $state(false);

    $inspect(show_answers)

</script>

<div id="QuestionCard">
    <div id="QuestionControls">
        <div id="NavControls">
            <button id="Prev" disabled={prev_disabled} class="nav-control" onclick={() => current_question.num--}>{@html '<'} Previous</button>
            <button id="Next" disabled={next_disabled} class="nav-control" onclick={() => current_question.num++}>Next {@html '>'}</button>
        </div>
        <div id="SubmitContainer">
            {#if submitted}
            <div id="ShowContainer">
                <label for="ShowCorrectCheck" style="text-align: right;">
                    Show correct answers
                </label>
                <input type=checkbox id="ShowCorrectCheck" bind:checked={show_answers}>
            </div>
            
            <input type="submit" value="New Quiz" onclick={() => selector.quizBegun = false}>
            {:else}
            <input type="submit" value="Submit Quiz" disabled={!submittable} onclick={() => {submitted = true; current_question.num = 0;}}>
            {/if}
        </div>
    </div>
    <div id="QuestionHeader">
        <h1>Question {current_question.num + 1}</h1>
        <div id="QuestionOrigin">
            <span><b>Quiz:</b> {question.quiz_num}</span>
            <span><b>Question:</b> {question.question_num}</span>
        </div>
    </div>
    <div id="QuestionText">
        <h2>{question.question}</h2>
        {#if question.has_img}
        <!-- svelte-ignore a11y_missing_attribute -->
        <img src={`${base}/imgs/quiz${question.quiz_num}_q${question.question_num}.png`}>
        {/if}
    </div>
    <div id="QuestionBody">
        {#if question.type == "matching"}
        <Matching question={question as MatchingQuestion} bind:answer={answer as MatchingAnswer} submitted={submitted} show_answers={show_answers} />
        {:else if question.type == "one_choice"}
        <OneChoice question={question as OneChoiceQuestion} bind:answer={answer as OneChoiceAnswer} submitted={submitted} show_answers={show_answers} />
        {:else if question.type == "many_choice"}
        <ManyChoice question={question as ManyChoiceQuestion} bind:answer={answer as ManyChoiceAnswer} submitted={submitted} show_answers={show_answers} />
        {/if}
    </div>
</div>

<style>
    #SubmitContainer {
        display:flex;
        align-items: baseline;
        column-gap: 1rem;
    }

    #ShowCorrectCheck {
        width: auto;
    }

    #QuestionCard {
        width: min(max(470px, calc(100% - 20rem)), 1000px);
        
        display: flex;
        flex-direction: column;
        background-color: antiquewhite;
        padding: 2rem;
        padding-top: 1.5rem;
        border-radius: 1rem;

        box-shadow: 0px 4px 5px 5px rgb(78, 91, 103);
    }

    @media screen and (max-width: 675px) {
        #QuestionCard {
            width: calc(100% - 7rem);
            padding: 1rem;
            padding-top: 0.75rem;
        }

        h1 {
            font-size: 1.25rem;
        }

        h2 {
            font-size: 1rem;
            font-weight: normal;
        }

        span {
            font-size: 0.75rem;
        }

        input {
            font-size: 0.75rem;
            height: 1.5rem;
            order: 1;
            margin-top: 0;
            margin-bottom: 0;
        }

        button {
            font-size: 1rem;
            width: 7rem !important;
            height: 3rem;
        }

        label {
            font-size: 1rem;
            margin-top: 0.1rem;
            line-height: 0.9rem;
        }

        #QuestionControls {
            margin: 0 !important;
            justify-content: space-between;
        }
        
        #SubmitContainer {
            flex-direction: row-reverse;
            align-items: flex-start;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 0;
        }

        #SubmitContainer div {
            margin: 0;
        }

        #ShowContainer {
            order: 2;
        }

        #Next {
            position: absolute;
            z-index: 99;
            right: 10vw;
        }

        #Prev {
            position: absolute;
            z-index: 99;
            left: 10vw;
        }

        #Next, #Prev {
            background-color: brown;
            bottom: 5vh;
        }

        img {
            max-width: 90%;
        }

        :global(label span) {
            font-size: 0.75rem;
        }

        :global(.question_choice) {
            padding-bottom: 0.3rem !important;
            align-items: center !important;
        }

        :global(.question_choice label) {
            font-size: 0.65rem;
        }

        :global(label:has(input.incorrect:checked)::before) {
            font-size: 0.5rem;
            left: -2.8rem !important;
            top: 0.16rem !important;
        }

        :global(label:has(input.incorrect:checked)::after) {
            top: 0.35rem !important;
        }

        :global(label:has(input.correct:checked)::before) {
            content: 'Correct!' !important;
            font-size: 0.5rem;
            left: -2.45rem !important;
            top: 0.16rem !important;
        }

        :global(label:has(input.correct:checked)::after) {
            top: 0.35rem !important;
        }

        :global(label:has(input.correct)::before) {
            content: 'Answer' !important;
            font-size: 0.5rem;
            left: -2.38rem !important;
            top: 0.154rem !important;
        }

        :global(label:has(input.correct)::after) {
            top: 0.35rem !important;
        }
    }

    img {
        align-self: center;
        background-color: white;
        height: 100%;
    }

    h1, h2, div {
        margin: 0.25rem 0;
    }

    #QuestionHeader {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #QuestionOrigin {
        display: flex;
        flex-direction: column;
    }

    #QuestionText {
        display: flex;
        flex-direction: column;
        max-height: 300px;
    }

    #QuestionControls {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.25rem;
    }

    button, input {
        width: 5rem;
        padding: 0.25rem;
        background-color: slategray;
        font-weight: bold;
        color: white;
        border-radius: 0.5rem;
        border: none;
    }

    button:disabled {
        color: lightgrey;
    }

    button:hover:enabled {
        background-color: rgb(94, 107, 120);
        cursor: pointer;
    }

    button:active:enabled {
        background-color: rgb(70, 82, 94);
    }

    input {
        width: 6rem;
        background-color: lightcoral;
    }

    input:disabled {
        background-color: rgb(203, 203, 203);
        color: rgb(145, 145, 145);
    }

    input:hover:enabled {
        background-color: rgb(231, 106, 106);
        cursor: pointer;
    }

    #ShowContainer {
        display: flex;
        align-items: center;
    }
    
</style>