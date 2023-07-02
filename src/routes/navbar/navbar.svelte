<script lang="ts">
    import type { NavbarPage } from "./navbar";

    export let pages: Array<NavbarPage>;
    export let activePathName: string;
</script>

<div class="flex bg-blue-200">
    { #each pages as {path, title} }
        <div class="p-1 { activePathName == path ? 'bg-blue-100' : '' }">
            <a href={ path }>{ title }</a>
        </div>
    {/each}
</div>
