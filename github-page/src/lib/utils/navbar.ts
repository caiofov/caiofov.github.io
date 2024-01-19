import NavbarItems from '../assets/NavbarItems.json';

export function getIconId(sectionId: string) {
	NavbarItems.filter(({ itemId }) => itemId == sectionId)[0].icon;
}
