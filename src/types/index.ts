import { MomentInput } from "moment";

export interface Item {
    id: string;
    name: string;
    kcal: number;
    date: MomentInput
}

export interface DataProviderData {
    currentDate: MomentInput;
    currentKcal: number;
    currentList: Item[];
    handleChangeDate: (data: MomentInput) => void;
    addItem: (item: Item) => void
}