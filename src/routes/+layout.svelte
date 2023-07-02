<script>
    import { page } from '$app/stores';
    import "../app.css";
    import Navbar from './navbar/navbar.svelte';

    console.log($page);
</script>

<Navbar pages={ [{path: '/', title: 'Home'}, {path: '/run', title: 'Run'}] } activePathName={ $page.url.pathname } ></Navbar>
    
<h1>{ $page.data.title ?? 'Unkown Page' }</h1>
<slot></slot>

