


<script lang="ts">
  import { get } from 'svelte/store'

  // Define the initial state with all weeks allowed
  import { numberOfQuestions, allowedWeeks, quizBegun } from './store';

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
  ]

  // Function to toggle the allowed state of a week
  function toggleWeek(week: number) {
    
    allowedWeeks.update(weeks => {
      if (weeks.includes(week)) {
        if ($allowedWeeks.length === 1){
          return weeks; 
        }
        return weeks.filter(w => w !== week);
      } else {
        // If week is not allowed, add it
        return [...weeks, week];
      }
    });
  }

  // Helper function to determine button class
  function getButtonClass(week: number): string {
    return $allowedWeeks.includes(week) ? 'allowed' : '';
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
    {#each Array(12) as _, week}
      <button
        class="week-button {getButtonClass(week)}"
        onclick={() => toggleWeek(week)}
      >
        Week {week+1}:{weekDescriptions[week]}
      </button>
    {/each}
    <button
        class="week-button {getButtonClass(12)} other-button"
        onclick={() => toggleWeek(12)}
      >
        Others
      </button>
  </div>
  <h1 class='question-title'>How many questions: <div class='number-button-wrapper'>
    <button class='number-buttons {get(numberOfQuestions) === 1 && "disabled-button"}' onclick={() => {get(numberOfQuestions) > 1&& numberOfQuestions.update(n => n-1) }}>-</button>
      {$numberOfQuestions}
    <button class='number-buttons' onclick={() => {numberOfQuestions.update(n => n+1)}}>+</button>
  </div></h1>
  
  <button class='begin-button' onclick={() => quizBegun.update(()=>true)}>
    <h1>
      Begin Quiz
    </h1>
  </button>

</div>