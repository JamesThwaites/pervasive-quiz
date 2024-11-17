<script lang="ts">
    import { data, QuestionProgress, type Answer, type MatchingAnswer, type MatchingQuestion } from "$lib/data";
    import { get } from "svelte/store"
    import Progress from "./Progress.svelte";
    import QuestionCard from "./QuestionCard.svelte";
    import QuizSelector from "./QuizSelector.svelte"
    import { current_question } from "./shared.svelte";
    import { allowedWeeks, numberOfQuestions, quizBegun } from './store';

    function genRandomSequence(len: number, start: number, stop: number): Array<number> {
        const maxLimit = 200;
        let current = 0;
        let seq: number[] = []
        let to_add: number
        let rand_in_range = () => Math.floor(Math.random() * (stop - start) + start)
        while (seq.length < len) {
            to_add = rand_in_range()
            while (seq.includes(to_add)) {
                to_add = rand_in_range()
                current++;
                if (current > maxLimit){
                    return seq;
                }
            }
            seq.push(to_add)
            
        }
        return seq
    }

    let total_questions = $state(5);
    let questions = $state(genRandomSequence(
        total_questions, 0, data.questions.length
    ).map((v) => data.questions[v]))

    let question = $derived(questions[current_question.num]);


    // svelte-ignore state_referenced_locally
    let answers: Answer[] = $state(questions.map((v) => {
        switch (v.type) {
            case "one_choice":
                return ""

            case "matching":
                v = v as MatchingQuestion
                let answer_map: Record<string, string> = {};
                for (let i = 0; i < v.parts.length; i++) {
                    answer_map[v.parts[i]] = ""
                }
                return answer_map

            case "many_choice":
                return new Array<string>()

            default:
                return new Array<string>()
        }
    }))

    let submittable = $derived(
        current_question.num === total_questions - 1 &&
        questions.every((v, i) => {
            switch (v.type) {
                case "one_choice":
                    return answers[i] !== "" ? true : false 

                case "matching":
                    return (
                        Object
                        .entries(answers[i] as MatchingAnswer)
                        .every((v) => {
                            return v[1] !== ""
                        })
                    )

                case "many_choice":
                    return true

                default:
                    return false
            }
        })
    )

    let progress = $derived(
        questions.map((v, i) => {
            switch (v.type) {
                case "one_choice":
                    return answers[i] !== "" ? QuestionProgress.COMPLETE : QuestionProgress.INCOMPLETE

                case "matching":
                    return (
                        Object
                        .entries(answers[i] as MatchingAnswer)
                        .every((v) => {
                            return v[1] !== ""
                        })
                    ) ? QuestionProgress.COMPLETE : QuestionProgress.INCOMPLETE

                case "many_choice":
                    return answers[i].length ? QuestionProgress.COMPLETE : QuestionProgress.INCOMPLETE

                default:
                    return QuestionProgress.INCOMPLETE
            }
        })
    )

    function resetQuiz(questionCount: number) {
        let allowedQuestions = data.questions.filter((question) => 
            get(allowedWeeks).includes(question.quiz_num)
        );
        questions = genRandomSequence(
            questionCount, 0, allowedQuestions.length
        ).map((v) => allowedQuestions[v]);

        current_question.num = 0;

        answers = questions.map((v) => {
            switch (v?.type) {
                case "one_choice":
                    return "";
                case "matching":
                    let answer_map: Record<string, string> = {};
                    for (let i = 0; i < (v as MatchingQuestion).parts.length; i++) {
                        answer_map[(v as MatchingQuestion).parts[i]] = "";
                    }
                    return answer_map;
                case "many_choice":
                    return [];
                default:
                    return [];
            }
        });
    }

    numberOfQuestions.subscribe(() => {
            total_questions = get(numberOfQuestions)
            resetQuiz($numberOfQuestions)
    })

    allowedWeeks.subscribe(() => {
        total_questions = get(numberOfQuestions)
        resetQuiz($numberOfQuestions)
    })
    // $inspect(answers)

</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<div id="Container">
    {#if $quizBegun === false}
        <QuizSelector />
    {:else}
        <Progress progress={progress} total_questions={total_questions} />
        <QuestionCard 
            question={question}
            total_questions={total_questions}
            submittable={submittable}
            reset_func={() => resetQuiz(total_questions)}
            bind:answer={answers[current_question.num]}
        />
    {/if}
    
</div>

<style>
    :global(body), :global(html) {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        font-family: "Lato Extended","Lato","Helvetica Neue",Helvetica,Arial,sans-serif;
    }

    #Container {
        display: flex;
        width: 100%;
        height: calc(100vh - min(10vh, 400px));
        padding-top: min(10vh, 400px);
        align-items: center;
        justify-content: baseline;
        background-color: slategray;
        flex-direction: column;
    }

    @media screen and (max-width: 675px) {
        #Container {
            padding-top: 1rem;
            height: calc(100vh - 1rem);
        }
    }
</style>