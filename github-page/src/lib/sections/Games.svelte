<script lang="ts">
	import ItchioGame from '$lib/components/ItchioGame.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import gameData from '$lib/assets/data/game_data.json';
	import { _ } from 'svelte-i18n';
</script>

<SectionTitle id="games" />

<div>
	<h3>{$_('sections.games.subsections.published.title')}</h3>
	<div id="game-items">
		{#each Object.values(gameData) as game}
			<ItchioGame {...game} />
		{/each}
	</div>

	<h3>{$_('sections.games.subsections.more.title')}</h3>
</div>

<style>
	#game-items {
		display: flex;
	}
</style>
