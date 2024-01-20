<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { ItemIDType, ItemType } from '$lib/utils/navbar';

	export let item: ItemType;
	export let id: ItemIDType;

	let dropdownVisible = false;
</script>

<li on:mouseenter={() => (dropdownVisible = true)} on:mouseleave={() => (dropdownVisible = false)}>
	<a href={item.link} class="nav-item"
		><iconify-icon class="nav-icon" icon={item.icon} />{$_(`sections.${id}.title`)}</a
	>

	{#if dropdownVisible}
		<div class="subitems">
			{#each Object.entries(item.items) as [subid, subitem]}
				<li class="nav-subitem">
					<a href={subitem.link}>
						<iconify-icon class="nav-sicon" icon={subitem.icon} />
						{$_(`sections.${id}.subsections.${subid}.title`)}
					</a>
				</li>
			{/each}
		</div>
	{/if}
</li>

<style>
	.nav-subitem {
		margin: 10px;
		padding: 2px;
		border-radius: 5px;
	}
	.nav-subitem:hover {
		background-color: var(--gray-color);
	}
	.subitems {
		border-radius: 5px;
		width: fit-content;
		position: absolute;
		background-color: white;
		border-color: var(--blue-color);
		box-shadow: 2px 2px 4px var(--main-shadow-color);
	}

	li {
		margin-left: 10vh;
	}
	a {
		align-items: center;
		display: flex;
		text-decoration: none;
		color: var(--blue-color);
		font-family: var(--program-font-family);
		font-weight: bold;
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
	}
	.nav-item:hover {
		border-bottom: 2px solid;
		border-top: 2px solid;
		border-radius: 5px;
		transition: 0.2s;
	}

	.nav-icon {
		margin-right: 0.5rem;
	}
</style>
