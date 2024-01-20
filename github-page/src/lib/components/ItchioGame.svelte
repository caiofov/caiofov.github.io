<script lang="ts">
	export let code: string;
	export let title: string;
	export let href: string;

	const src = `https://itch.io/embed/${code}?border_width=2&amp;bg_color=acb7c5&amp;fg_color=000000&amp;link_color=004aad&amp;border_color=004aad`;
</script>

<iframe {title} frameborder="0" {src} width="210" height="169">
	<a {href}>{title}</a>
</iframe>
