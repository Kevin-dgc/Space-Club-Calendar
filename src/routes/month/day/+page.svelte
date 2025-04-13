<!-- One day view -->

<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { fetchJSON } from '$lib/data.js';
    import { getData } from '$lib/data.js';
    
    onMount(async () => {
        await fetchJSON();
        dataList = getData();
    });

    let dataList = [];

    let curDate = "";
    $: curDate = $page.url.searchParams.get('date') || "";

   /* function randX(){
        return Math.floor(Math.random() * 60) + 150
    }

    function randY(){
        return Math.floor(Math.random() *20) - 10;
    } changing this cuz we started using bootstrap*/

    function parseTime(timeStr) {
        if (!timeStr) return null;
        
        const cleanTime = timeStr.trim().toUpperCase();
        const timeRegex = /(\d+)(?::(\d+))?\s*(AM|PM)/i;
        const match = cleanTime.match(timeRegex);
        
        if (!match) return null;
        
        let hours = parseInt(match[1], 10);
        const minutes = match[2] ? parseInt(match[2], 10) : 0;
        const period = match[3].toUpperCase();
        
        // Convert to 24-hour format
        if (period === "PM" && hours < 12) {
            hours += 12;
        } else if (period === "AM" && hours === 12) {
            hours = 0;
        }
        
        return { hours, minutes };
    }

    function getTimeSlotClass(time) {
        const parsedTime = parseTime(time);
        if (!parsedTime) return '';
        return `time-${parsedTime.hours}${parsedTime.minutes < 30 ? '' : '-30'}`;
    }

    $: eventsForDay = dataList.filter(event => event.date === curDate);

/*function randPlanet(){
    return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
}

  let dataList = getData();

  function getEventOffset(index) {
  return index * 40;
}

function getHorizontalOffset(index) {
  const baseOffset = 150; 
  return baseOffset + (index * 220);
}*/

function groupByTime(events) {
        const timeGroups = {};
        
        events.forEach(event => {
            const time = event.time;
            if (!timeGroups[time]) {
                timeGroups[time] = [];
            }
            timeGroups[time].push(event);
        });
        
        return Object.entries(timeGroups).map(([time, events]) => {
            return {
                time,
                parsedTime: parseTime(time),
                events
            };
        }).sort((a, b) => {
            // Sort by hour and minute
            if (!a.parsedTime || !b.parsedTime) return 0;
            if (a.parsedTime.hours !== b.parsedTime.hours) {
                return a.parsedTime.hours - b.parsedTime.hours;
            }
            return a.parsedTime.minutes - b.parsedTime.minutes;
        });
    }

    $: timeGroups = groupByTime(eventsForDay);

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const [month, day, year] = dateStr.split('/');
        if (!month || !day || !year) return dateStr;
        
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
    }

</script>

<svelte:head>
    <!-- Add Bootstrap CSS IMPORTANT DO NOT TOUCH -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</svelte:head>

<style>
  :global(html, body) {
        margin: 0;
        padding: 0;
        min-height: 100vh;  
        background-color: #0E3E7E;
        background-image: url(/planet/p1.png);
        background-repeat: no-repeat;
        background-position: center center;  
        background-size: cover; 
    }
    
    .main-title{
        text-align: center;
        color: white;
    }
    .time-line{
        justify-content: left;
        line-height: 1.3;
        color: white;
    }

    .back-button {
    display: inline-block;
    margin-bottom: 20px;
    text-decoration: none;
    color: #333;
    padding: 5px 10px;
    border-radius: 4px;
    background-color: #f0f0f0;
    }

    .box{
        color:black;
        float: right;
        /* we can make this a rocket ship ^ */
    }

    h2{
        color:white;

    }
</style>

<!-- Start of Page V -->

<div class="container mt-4">
  <!-- Back button -->
  <a href="/month" class="btn btn-light mb-3">← Back to Month</a>
  
  <!-- Page title -->
  <h1 class="text-center text-light mb-4">{formatDate(curDate)}</h1>
  
  <!-- Calendar day view -->
  <div class="row">
      <div class="col-md-2 time-labels">
          <!-- Time labels (8 AM to 8 PM) -->
          {#each Array.from({ length: 13 }, (_, i) => i + 8) as hour}
              <div class="hour-label" style="top: {(hour - 8) * 100 + 10}px">
                  {hour > 12 ? (hour - 12) : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
              </div>
          {/each}
      </div>
      
      <div class="col-md-10">
          <div class="calendar-grid position-relative">
              <!-- Hour grid lines -->
              {#each Array.from({ length: 13 }, (_, i) => i) as hour}
                  <div class="hour-line" style="top: {hour * 100}px"></div>
              {/each}
              
              <!-- Events -->
              {#each timeGroups as group, groupIndex}
                  {#if group.parsedTime}
                      <div class="event-group" 
                           style="top: {((group.parsedTime.hours - 8) + group.parsedTime.minutes/60) * 100}px">
                          {#each group.events as event, eventIndex}
                              <div class="event-card card mb-2" 
                                   style="transform: translateX({eventIndex * 15}px)">
                                  <div class="card-body">
                                      <h5 class="card-title">{event.name}</h5>
                                      <h6 class="card-subtitle mb-2 text-muted">{event.time} - {event.org}</h6>
                                      <p class="card-text">{event.description}</p>
                                      {#if event.link}
                                          <a href="{event.link}" target="_blank" class="card-link">Event Link</a>
                                      {/if}
                                  </div>
                              </div>
                          {/each}
                      </div>
                  {/if}
              {/each}
          </div>
      </div>
  </div>
</div>
