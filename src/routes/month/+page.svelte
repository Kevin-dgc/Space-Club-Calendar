<script>
    import { page } from '$app/stores';
    
    const months = [   
      { name: "January", num: 1, days: 31, img: "months/1.png"},   
      { name: "February", num: 2, days: 28, img: "months/2.png"},   
      { name: "March", num: 3, days: 31, img: "months/3.png"},   
      { name: "April", num: 4, days: 30, img: "months/4.png"},   
      { name: "May", num: 5, days: 31, img: "months/5.png"},   
      { name: "June", num: 6, days: 30, img: "months/6.png"},   
      { name: "July", num: 7, days: 31, img: "months/7.png"},   
      { name: "August", num: 8, days: 31, img: "months/8.png"},   
      { name: "September", num: 9, days: 30, img: "months/9.png"},   
      { name: "October", num: 10, days: 31, img: "months/10.png"},  
      { name: "November", num: 11, days: 30, img: "months/11.png"},   
      { name: "December", num: 12, days: 31, img: "months/12.png"} 
    ];
    
    const currentYear = new Date().getFullYear();
    
    $: monthIndex = parseInt($page.url.searchParams.get('monthIndex') || '0');
    $: selectedMonth = months[monthIndex];
    
  </script>
  
  <style>
   
  </style>