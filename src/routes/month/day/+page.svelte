<!-- One day view -->

<script>
    import { page } from '$app/stores';
    import "/src/routes/data.js";
    import { getData } from '/src/routes/data.js';
    let curDate = "";
    $: curDate = $page.url.searchParams.get('date') || "";

    function randX(){
        return Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    }

    function randY(){
        return Math.floor(Math.random() * (25 - -25 + 1)) + -25;
    }


    let items = [
        { time: "8:00", Y: "50" },
        { time: "9:00", Y: "150" },
        { time: "10:00", Y: "250" },
        { time: "11:00", Y: "350" },
        { time: "12:00", Y: "450" },
        { time: "13:00", Y: "550" },
        { time: "14:00", Y: "650" },
        { time: "15:00", Y: "750" },
        { time: "16:00", Y: "850" },
        { time: "17:00", Y: "950" },
        { time: "18:00", Y: "1050" },
        { time: "19:00", Y: "1150" },
        { time: "20:00", Y: "1250" }
    ];

  function parseY(time){
    // time ex) 9:00PM
    hour = +time.split(":");
    return ((hour - 8) * 100) + 50;
  }

  function totalY(time){
    hour = +time.split(":");
    return ((hour - 8) * 100) + 50 + randY();
  }

</script>

<style>
  :global(html, body) {
        margin: 0;
        padding: 0;
        min-height: 100vh;  
        background-color: #0E3E7E;
        background-image: url('/planet/p1.png');
        background-repeat: no-repeat;
        background-position: center center;  
        background-size: cover; 
    }
    
    .main-title{
        text-align: center;
    }
    .time-line{
        justify-content: left;
        line-height: 1.3;
        color: white;
    }

    .time-maker{
        position: absolute;
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
  
    .back-button:hover {
    background-color: #e0e0e0;
    }

    .box{
        min-height: 80px;
        background-color: #f9f9f9;
        border-radius: 4px;
        padding: 5px;
        position: relative;
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
{#each getData() as data}
    {#if data.date == curDate}
        <div class="box">
            <h2 style="top: {totalY(data.time)}, left: {randX()}"> 
                Org: data.org, Event: data.event 
                </h2>
        </div>
    {/if}
{/each}


