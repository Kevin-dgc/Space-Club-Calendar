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


<style>

</style>