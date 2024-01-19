<script lang="ts">
	import 'iconify-icon';

	import NavbarItems from '../assets/NavbarItems.json';
	import { _ } from 'svelte-i18n';
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
</div>

<style>
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
		font-family: 'Courier New', Courier, monospace;
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
</style>
