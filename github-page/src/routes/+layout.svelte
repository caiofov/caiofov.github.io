<script lang="ts">
	import { Navbar } from '$lib';

	import '$lib/assets/style.css';
	import { changeLocale } from '$lib/utils/translation';
	import { onMount } from 'svelte';

	onMount(changeLocale);
</script>

<Navbar />
<div id="container">
	<slot />
</div>

<style>
	#container {
		padding-left: 2vw;
		padding-right: 2vw;
	}
</style>
