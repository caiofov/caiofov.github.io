<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let id = '';
</script>

<h2 id={`#${id}`}>{$_(`sections.${id}.title`)}</h2>
