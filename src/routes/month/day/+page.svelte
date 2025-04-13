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

<a href="/month" class="back-button">← Back to Months</a> <!-- this always goes to JAN fix idk-->

<div class="main-title">
    <h1>{curDate}</h1> 
</div>

<div class="time-line">
    <h1 class="time-marker" style="top: 50px;">8:00 AM</h1>
    <h1 class="time-marker" style="top: 150px;">9:00 AM</h1>
    <h1 class="time-marker" style="top: 250px;">10:00 AM</h1>
    <h1 class="time-marker" style="top: 350px;">11:00 AM</h1>
    <h1 class="time-marker" style="top: 450px;">12:00 PM</h1>
    <h1 class="time-marker" style="top: 550px;">1:00 PM</h1>
    <h1 class="time-marker" style="top: 650px;">2:00 PM</h1>
    <h1 class="time-marker" style="top: 750px;">3:00 PM</h1>
    <h1 class="time-marker" style="top: 850px;">4:00 PM</h1>
    <h1 class="time-marker" style="top: 950px;">5:00 PM</h1>
    <h1 class="time-marker" style="top: 1050px;">6:00 PM</h1>
    <h1 class="time-marker" style="top: 1150px;">7:00 PM</h1>
    <h1 class="time-marker" style="top: 1250px;">8:00 PM</h1>
</div>

{#each Array.from(groupEventsByTime(dataList, curDate).entries()) as [time, events]}
  {#each events as event, index}
    <div class="box" style="position: absolute; top: {totalY(time) + randY()}px; left: {getHorizontalOffset(index)}px;">
      <h2>Org: {event.org}, Event: {event.name}</h2>
    </div>
  {/each}
{/each} <!-- I had to completely change this because the events would overlap -->



