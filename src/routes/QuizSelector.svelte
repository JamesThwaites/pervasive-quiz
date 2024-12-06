<script lang="ts">
  // Define the initial state with all weeks allowed
  import { selector } from './shared.svelte';

  const weekDescriptions = [
    'Introduction to pervasive computing', 
    'Input devices and techniques', 
    'Digital input and output', 
    'Analog input and output', 
    'Digital fabrication', 
    'Haptics and actuators',
    'Tangibles and wearables',
    'Movement and gesture',
    'Mixed reality',
    'Voice and sound',
    'Eye tracking',
    'AI agents',
    'Custom'
  ]

  $inspect(selector.allowedWeeks)

  const { reset_func }: { reset_func: () => void } = $props();

  // Function to toggle the allowed state of a week
  function toggleWeek(week: number) {

    selector.allowedWeeks = ((weeks: number[]) => {
      if (weeks.includes(week)) {
        if (selector.allowedWeeks.length === 1){
          return weeks; 
        }
        return weeks.filter(w => w !== week);
      } else {
        // If week is not allowed, add it
        return [...weeks, week];
      }
    })(selector.allowedWeeks);
  }

  // Helper function to determine button class
  function getButtonClass(week: number): string {
    return selector.allowedWeeks.includes(week) ? 'allowed' : '';
  }
</script>

<style>
  .week-button {
    margin: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    cursor: pointer;
    width: 100%;
  }
  .allowed {
    background-color: #4caf50;
    color: white;
  }

  .all-weeks {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    max-width: 80%;
  }

  .other-button {
    grid-column: span 2;
  }

  .number-button-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .question-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
  }

  .disabled-button {
    background-color: darkgray;

    &:hover {
      background-color: darkgray;
    }
  }

  .begin-button {
    margin-inline: auto;
  }

</style>

<div>
  <h1>Select Allowed Question Banks</h1>
  <div class='all-weeks'>
    {#each Array(13) as _, week}
      <button
        class="week-button {getButtonClass(week + 1)}"
        onclick={() => toggleWeek(week + 1)}
      >
        Week {week+1}:{weekDescriptions[week]}
      </button>
    {/each}
    <button
        class="week-button {getButtonClass(14)} other-button"
        onclick={() => toggleWeek(14)}
      >
        Others
      </button>
  </div>
  <h1 class='question-title'>How many questions: <div class='number-button-wrapper'>
    <button class='number-buttons {selector.numberOfQuestions === 1 && "disabled-button"}' onclick={() => {selector.numberOfQuestions > 1 && selector.numberOfQuestions--}}>-</button>
      {selector.numberOfQuestions}
    <button class='number-buttons' onclick={() => {selector.numberOfQuestions++}}>+</button>
  </div></h1>
  
  <button class='begin-button' onclick={() => {
        reset_func();
        selector.quizBegun = true;
      }
    }>
    <h1>
      Begin Quiz
    </h1>
  </button>

</div>