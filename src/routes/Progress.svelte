<script lang="ts">
    import { QuestionProgress } from "$lib/data";
    import { tweened } from "svelte/motion";
    import { current_question, selector } from "./shared.svelte";
    import { cubicOut } from "svelte/easing";

    let { progress }: { progress: QuestionProgress[] } = $props()
    let range = (n: number) => [...Array(n).keys()]

    let trackball: HTMLDivElement;
    let tb_pos = tweened(current_question.num, {
        duration: 400,
        easing: cubicOut
    });

    $effect(() => {
        tb_pos.set(current_question.num)
    })
</script>

<div class="container">
    <div style:--left={$tb_pos} class="trackball" bind:this={trackball}></div>
    {#each range(selector.numberOfQuestions) as q_num}
        <button class={progress[q_num] == QuestionProgress.COMPLETE ? "complete" : "incomplete"}
            onclick={() => current_question.num = q_num}
        >
            {q_num + 1}
        </button>
    {/each}
</div>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        column-gap: 0.5rem;
        padding: 0.25rem;

        position: relative;
    }

    .complete, .incomplete {
        width: 2rem;
        height: 2rem;
        background-color: antiquewhite;
        border-radius: 0.5rem;
        border: 2px solid rgb(162, 102, 102);
        box-shadow: 0px 2px 2px 2px rgb(78, 91, 103);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .complete:hover, .incomplete:hover {
        cursor: pointer;
        border-color: deepskyblue;
    }

    .complete {
        background-color: rgb(222, 190, 148);
    }

    .trackball {
        height: 0.25rem;
        width: 0.25rem;
        background-color: deepskyblue;
        border-radius: 0.25rem;
        border: 2px solid white;
        position: absolute;
        top: -0.5rem;
        left: calc(1rem + (2.5rem * var(--left)));
    }
</style>