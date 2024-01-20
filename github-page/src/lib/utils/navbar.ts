import NavbarItems from '../assets/NavbarItems.json';
export type ItemIDType = keyof typeof NavbarItems;
export type ItemType = (typeof NavbarItems)[ItemIDType];

export function getIconId(sectionId: ItemIDType) {
	return NavbarItems[sectionId].icon ?? '';
}
