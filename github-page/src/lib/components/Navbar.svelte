<script lang="ts">
	import 'iconify-icon';

	import NavbarItems from '../assets/NavbarItems.json';
	import { _ } from 'svelte-i18n';

	import { LOCALE_KEYS } from '$lib/utils/translation';
	import FLAGS from '$lib/assets/img/flags';
	import NavbarItem from './NavbarItem.svelte';
</script>

<div id="navbar">
	<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
		>{'< CaioOliveira />'}</span
	>

	<ul>
		{#each Object.entries(NavbarItems) as [id, item]}
			<NavbarItem {item} {id} />
		{/each}
	</ul>

	<div id="locales">
		{#each LOCALE_KEYS as locale}
			<svelte:component this={FLAGS[locale]} />
		{/each}
	</div>

	<div class="screen-reader" aria-label={$_('labels.languages')}>
		<!-- TODO: select language for screen readers -->
	</div>
</div>

<style>
	#navbar {
		margin: 1rem 0rem;
		padding: 1rem 3rem;
		height: 5vh;
		justify-content: space-between;
		box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
		border-radius: 100px;
		border: var(--main-shadow-color) solid;
	}
	ul {
		display: flex;
		list-style-type: none;
	}

	#navbar {
		display: flex;
		align-items: center;
	}

	#locales {
		display: flex;
		align-items: center;
		align-content: flex-end;
	}
</style>
