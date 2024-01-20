<script lang="ts">
	import { _ } from 'svelte-i18n';
	import 'iconify-icon';
	import { getIconId, type ItemIDType } from '$lib/utils/navbar';

	export let id: ItemIDType;
	const icon = getIconId(id);
</script>

<h2 id={`#${id}`}>
	<iconify-icon class="title-icon" {icon} />{$_(`sections.${id}.title`)}
</h2>

<style>
	.title-icon {
		margin-right: 1rem;
	}
	h2 {
		display: flex;
		align-items: center;
		font-family: var(--program-font-family);
	}
</style>
