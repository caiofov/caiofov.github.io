import fr from './fr.svelte';
import pt from './pt.svelte';
import en from './en.svelte';

const FLAGS: Record<string, ConstructorOfATypedSvelteComponent> = { fr, pt, en };

export default FLAGS;
