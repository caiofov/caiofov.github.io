<script lang="ts">
	import '$lib/assets/style.css';
	import { AboutMe, Navbar } from '$lib';

	import initTranslator, { changeLocale } from '../lib/utils/translation';
	import { onMount } from 'svelte';

	initTranslator();
	onMount(changeLocale);
</script>

<Navbar />
<AboutMe />
