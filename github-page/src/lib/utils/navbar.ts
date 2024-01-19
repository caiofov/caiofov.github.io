import NavbarItems from '../assets/NavbarItems.json';
export type ItemIDType = keyof typeof NavbarItems;
export type ItemType = (typeof NavbarItems)[ItemIDType];

export function getIconId(sectionId: ItemIDType) {
	NavbarItems[sectionId].icon ?? '';
}
