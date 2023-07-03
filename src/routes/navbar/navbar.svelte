<script lang="ts">
    import type { NavbarPage } from "./navbar";

    export let pages: Array<NavbarPage>;
    export let activePathName: string;
</script>

<div class="flex bg-gray-600 pl-8 pr-8">
    { #each pages as {path, title}, index }
        <a class="{ activePathName === path ? 'bg-gray-700' : 'bg-gray-600' } pt-2 pb-2 pl-6 pr-6 border-gray-800 border-r-4" class:border-l-4={ index === 0 } href={ path }>{ title }</a>
    {/each}
</div>
