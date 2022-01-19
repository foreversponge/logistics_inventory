export interface CollectionCreationDTO {
  id: number;
  name: string;
  description: string;
}

export interface CollectionUpdateDTO {
  name: string;
  description: string;
}

export interface CollectionDeletionDTO {
  id: number;
}