<script lang="ts">
    import { page } from '$app/state';
    import "../app.css";
    import Navbar from './navbar/navbar.svelte';
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();

    console.log(page);
</script>

<Navbar pages={ [{path: '/', title: 'Home'}, {path: '/run', title: 'Run'}] } activePathName={ page.url.pathname } ></Navbar>

<div class="pl-8 pr-8 pt-4 pb-4">
    <h1>{ page.data.title ?? 'Unkown Page' }</h1>
    {@render children?.()}
</div>

