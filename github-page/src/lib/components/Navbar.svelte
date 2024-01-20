<script lang="ts">
	import 'iconify-icon';

	import NavbarItems from '../assets/NavbarItems.json';
	import { _ } from 'svelte-i18n';

	import { LOCALE_KEYS } from '$lib/utils/translation';
	import FLAGS from '$lib/assets/img/flags';
</script>

<div id="navbar">
	<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
		>{'< CaioOliveira />'}</span
	>

	<ul>
		{#each Object.entries(NavbarItems) as [id, item]}
			<li>
				<a href={item.link}
					><iconify-icon class="nav-icon" icon={item.icon} />{$_(`sections.${id}.title`)}</a
				>
			</li>
		{/each}
	</ul>

	<div id="locales">
		{#each LOCALE_KEYS as locale}
			<svelte:component this={FLAGS[locale]} />
		{/each}
	</div>
</div>

<style>
	#navbar {
		width: 100%;
		justify-content: space-between;
	}
	ul {
		display: flex;
		list-style-type: none;
	}
	li {
		margin-left: 1rem;
	}
	li > a {
		align-items: center;
		display: flex;
		text-decoration: none;
		color: var(--blue-color);
		font-family: var(--program-font-family);
	}
	.nav-icon {
		margin-right: 0.5rem;
	}
	li > a:hover {
		font-weight: bold;
		transition: cubic-bezier(0.39, 0.575, 0.565, 1);
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
