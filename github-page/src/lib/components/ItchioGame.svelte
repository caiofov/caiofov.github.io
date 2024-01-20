<script lang="ts">
	import { _ } from 'svelte-i18n';
	export let code: string;
	export let title: string;
	export let href: string;
	export let tools: string[] = [];
	export let description: string = '';

	const src = `https://itch.io/embed/${code}?border_width=2&amp;bg_color=acb7c5&amp;fg_color=000000&amp;link_color=004aad&amp;border_color=004aad`;
</script>

<div class="game-item">
	<iframe {title} frameborder="0" {src} width="210" height="170">
		<a {href}>{title}</a>
	</iframe>
	<div class="details">
		<p>{description}</p>
		<b>{$_('sections.games.labels.techs')}: </b>
		{tools}
	</div>
</div>

<style>
	.game-item {
		display: flex;
		margin-right: 5rem;
	}
	iframe {
		margin-right: 1.5rem;
	}
	.details {
		display: flex;
		flex-direction: row;
	}
</style>
