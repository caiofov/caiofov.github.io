<script lang="ts">
	export let title = '';
	export let viewBox = '';
</script>

<svg {viewBox}>
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
