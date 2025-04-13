<script>
    const months = [   
        { name: "Jan", num: 1, img: "months/1.png", len: 31},   
        { name: "Feb", num: 2, img: "months/2.png", len: 28},   
        { name: "Mar", num: 3, img: "months/3.png", len: 30},   
        { name: "Apr", num: 4, img: "months/4.png", len: 31},   
        { name: "May", num: 5, img: "months/5.png", len: 30},   
        { name: "Jun", num: 6, img: "months/6.png", len: 31},   
        { name: "Jul", num: 7, img: "months/7.png", len: 30},   
        { name: "Aug", num: 8, img: "months/8.png", len: 31},   
        { name: "Sep", num: 9, img: "months/9.png", len: 30},   
        { name: "Oct", num: 10, img: "months/10.png", len: 31},  
        { name: "Nov", num: 11, img: "months/11.png", len: 30},   
        { name: "Dec", num: 12, img: "months/12.png", len: 31} ]

    const currentYear = new Date().getFullYear();

    let curLen = -1;
    let curNum = -1;

    function editMonth(num, len){
        cucurrNum = num;
        curLen = len;
    }
</script>
<h1>{currentYear}</h1>

<div class="months-grid">
    {#each months as month}
    <a href="/month" class="month-card" on:click|preventDefault={() => handleMonthClick(month.num, month.len)}>
        <h2> 
          <img alt="The icon" src={month.img} style="max-width: 100%; height: auto;" />
        </h2>
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
    padding: 5px;
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
