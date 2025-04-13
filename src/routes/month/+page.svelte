<h1>BUTTS BUTTS BUTTS</h1>
<script>
    import { page } from '$app/stores';

    $: len = parseInt($page.url.searchParams.get('curLen'));
    $: num = parseInt($page.url.searchParams.get('curNum'));

</script>
<h1>Num: {num} Len : {len}</h1>

<style>

</style>