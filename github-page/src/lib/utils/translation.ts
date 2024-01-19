import en from '../assets/locales/en.json';
import pt from '../assets/locales/pt.json';
import fr from '../assets/locales/fr.json';
import { addMessages, init, locale } from 'svelte-i18n';

const DEFAULT_LOCALE = 'en';
const LOCALES = { en, pt, fr };

function getUserLocale() {
	if (!window || !window.navigator) return DEFAULT_LOCALE;
	if (window.navigator.languages?.length) return navigator.languages[0].split('-')[0];
	return navigator.language.split('-')[0] ?? DEFAULT_LOCALE;
}

export function changeLocale(newLocale: string | null = null) {
	locale.set(newLocale ?? getUserLocale());
}

export default function initTranslator() {
	init({ fallbackLocale: DEFAULT_LOCALE });
	for (const [locale, content] of Object.entries(LOCALES)) addMessages(locale, content);
}
