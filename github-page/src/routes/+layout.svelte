<script lang="ts">
	import { PUBLIC_PROJECT_DEV } from '$env/static/public';
	import { Navbar } from '$lib';

	import '$lib/assets/style.css';
	import { changeLocale } from '$lib/utils/translation';
	import { onMount } from 'svelte';

	onMount(changeLocale);
</script>

{#if !PUBLIC_PROJECT_DEV}
	<Navbar />
	<div id="container">
		<slot />
	</div>
{:else}
	Website in development.<br />
	<a href="https://github.com/caiofov">
		<iconify-icon class="nav-sicon" icon="mdi:github" /> /caiofov</a
	>
{/if}

<style>
	#container {
		padding-left: 2vw;
		padding-right: 2vw;
	}
</style>
