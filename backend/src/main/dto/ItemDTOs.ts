export interface ItemCreationDTO {
    id: number;
    name: string;
    description: string;
    weight: number;
    length: number;
    height: number;
    quantity: number;
}

export interface ItemUpdateDTO {
  name: string;
  description: string;
  weight: number;
  length: number;
  height: number;
  quantity: number;
}

export interface ItemDeleteDTO {
  id: number;
}