<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="/month/day">svelte.dev/docs/kit</a> to read the documentation</p>


<script>
    import { page } from '$app/stores';

    $: monthNumber = parseInt($page.params.month);
    $: year = new Date().getFullYear();

    $: monthName = new Date(year, monthNumber - 1, 1).toLocaleString('default', { month : 'long'});
    $: daysInMonth = new Date(year, monthNumber, 0).getDate();
    $: firstDayOfWeek = new Date(year, monthNumber - 1, 1).getDay(); 

    function generateCalendarDays() {
        const days =  [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push({ day: null, isCurrentMonth: false});
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                isCurrentMonth: true,
                date: new Date(year, monthNumber - 1, day)
            });
        }

        return day;
    }
</script>

<div class="month-view">
    <div class="header">
      <a href="/" class="back-button">← Back to All Months</a>
      <h1>{monthName} {year}</h1>
    </div>
    
    <div class="calendar">
      <div class="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      
      <div class="days-grid">
        {#each calendarDays as { day, isCurrentMonth, date }}
          <div class="day-cell {isCurrentMonth ? 'current-month' : 'other-month'}">
            {#if isCurrentMonth}
              <div class="day-number">{day}</div>
              <!-- You can add day content here -->
              <div class="day-content">
                <!-- Link to a specific day page if needed -->
                <a href="/month/{monthNumber}/day/{day}" class="day-link">View</a>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    
    <div class="nav-buttons">
      <a href="/month/{monthNumber === 1 ? 12 : monthNumber - 1}" class="nav-button">Previous Month</a>
      <a href="/month/{monthNumber === 12 ? 1 : monthNumber + 1}" class="nav-button">Next Month</a>
    </div>
  </div>
  

<style>

</style>