<!-- One day view -->

<script>
    import { page } from '$app/stores';
    import "/src/routes/data.js";
    import { getData } from '/src/routes/data.js';
    let curDate = "";
    $: curDate = $page.url.searchParams.get('date') || "";

    function randX(){
        return Math.floor(Math.random() * 60) + 150
    }

    function randY(){
        return Math.floor(Math.random() * (25 - -25 + 1)) + -25;
    }

  function totalY(time) {
    const [timePart, period] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(num => parseInt(num, 10));
  
    // change it to 24-hour format because the plus 12 by itself wasnt working for some reason
    let hour24 = hours;
    if (period === "PM" && hours < 12) {
        hour24 += 12;
    } else if (period === "AM" && hours === 12) {
     hour24 = 0;
    }

     // Calculate position ask kev if this is okay when im done (so for example 8AM is at 50px, each hour adds 100px)
    const hourOffset = hour24 - 8; // 8AM is our starting point
    const minuteOffset = minutes / 60;
    return Math.floor((hourOffset + minuteOffset) * 100) + 50;
}


function randPlanet(){
    return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
}

  let dataList = getData();

  function getEventOffset(index) {
  return index * 40;
}

function groupEventsByTime(events, date) {
  const timeMap = new Map();
  
  events.filter(event => event.date === date).forEach(event => {
    if (!timeMap.has(event.time)) {
      timeMap.set(event.time, []);
    }
    timeMap.get(event.time).push(event);
  });
  
  return timeMap;
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
{#each dataList as data}
    {#if data.date == curDate}
        <div class="box" style="position: absolute; top: {totalY(data.time)}px; left: 150px;">
            <h2>Org: {data.org}, Event: {data.name}</h2>
        </div>
    {/if}
{/each}



