<script lang="ts">
	import { Navbar, NavBrand, NavUl, NavLi, NavHamburger } from 'flowbite-svelte';
	import NavbarItems from '../assets/NavbarItems.json';
	import { _ } from 'svelte-i18n';
	interface Item {
		itemId: string;
		icon: string;
	}

	function getItemTranslation(item: Item) {
		const id = item.itemId.replace('#', '');
		return $_(`sections.${id}.title`);
	}
</script>

<Navbar id="navbar">
	<NavBrand>
		<span>Caio de Freitas Oliveira</span>
	</NavBrand>
	<NavHamburger />

	<NavUl>
		{#each NavbarItems as item}
			<NavLi href={item.itemId}>{getItemTranslation(item)}</NavLi>
		{/each}
	</NavUl>
</Navbar>
