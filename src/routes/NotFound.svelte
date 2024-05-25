<script>
    import { location, querystring } from "svelte-spa-router";
</script>

<div class="absolute bg-yellow-200 z-50">
    <p>Not found</p>
    <p>The current page is: {$location}</p>
    <p>The querystring is: {$querystring}</p>
</div>