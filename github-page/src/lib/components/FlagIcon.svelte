<script lang="ts">
	import { changeLocale } from '$lib/utils/translation';

	export let title: string;
	export let viewBox = '';
	export let locale: string;
</script>

<svg {viewBox} on:click={() => changeLocale(locale)}>
	<title>{title}</title>
	<slot />
</svg>

<style>
	svg {
		height: 1rem;
		width: auto;
		min-width: 1rem;
		margin-left: 1rem;
	}
	svg:hover {
		transition: 0.5s;
		height: 1.1rem;
		cursor: pointer;
		box-shadow: 2px 2px 4px 1px var(--main-shadow-color);
	}
</style>
