<script lang="ts">
	import { _ } from 'svelte-i18n';
	import 'iconify-icon';
	import { getIconId, type ItemIDType } from '$lib/utils/navbar';

	export let id: ItemIDType;
	const icon = getIconId(id);
</script>

<h2 id={`#${id}`}>
	<iconify-icon class="nav-icon" {icon} />{$_(`sections.${id}.title`)}
</h2>
