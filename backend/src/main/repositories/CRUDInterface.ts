// Interface to ensure that any concerned repository follow CRUD functionality
export interface CRUD {
    create: (resource: any) => Promise<any>;
    delete: (resource: any) => Promise<any>;
    update: (resource: any, newValue: any) => Promise<any>;
    get: (resource: any) => Promise<any>;
}