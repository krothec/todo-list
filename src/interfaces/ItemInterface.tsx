export interface Item {
	id: number;
	name?: string;
	item?: string;
	itens?: Item[];
	order?: number;
	checked?: boolean;
	permalink?: string;
}
