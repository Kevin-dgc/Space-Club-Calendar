<p>Visit <a href="/month">svelte.dev/docs/kit</a> to read the documentation</p>
<script>
const month = [   
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

<style>

</style>
