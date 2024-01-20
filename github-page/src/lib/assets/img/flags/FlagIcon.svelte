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
	}
</style>
