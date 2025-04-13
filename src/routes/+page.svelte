<p>Visit <a href="/month">svelte.dev/docs/kit</a> to read the documentation</p>
<script>
const months = [   
    { name: "Jan", num: 1},   
    { name: "Feb", num: 2},   
    { name: "Mar", num: 3},   
    { name: "Apr", num: 4},   
    { name: "May", num: 5},   
    { name: "Jun", num: 6},   
    { name: "Jul", num: 7},   
    { name: "Aug", num: 8},   
    { name: "Sep", num: 9},   
    { name: "Oct", num: 10},  
    { name: "Nov", num: 11},   
    { name: "Dec", num: 12} ]

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
</script>
<h1>{currentYear}</h1>

<div class="months-grid">
    {#each months as month}
      <a href="/month/{month.num}" class="month-card">
        <h2> <img alt="The icon" src={"/favicon.png"} />  </h2>
      </a>
    {/each}
  </div>
<style>
  .months-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    .months-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .month-card {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 30px;
    text-align: center;
    text-decoration: none;
    color: #333;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s ease-in-out;
  }
  
  .month-card:hover {
    transform: translateY(-5px);
    background-color: #e8f4ff;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  
  h2 {
    margin: 0;
  }
</style>
