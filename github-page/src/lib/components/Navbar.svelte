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
	li {
		margin-left: 10vh;
	}
	li > a {
		align-items: center;
		display: flex;
		text-decoration: none;
		color: var(--blue-color);
		font-family: var(--program-font-family);
		font-weight: bold;
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
	}
	li > a:hover {
		border-bottom: 2px solid;
		border-top: 2px solid;
		border-radius: 5px;
		transition: 0.2s;
	}
	.nav-icon {
		margin-right: 0.5rem;
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
