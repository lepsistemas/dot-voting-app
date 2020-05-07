export interface IUser {
    id: number;
    username: string;
    admin: boolean;
}

export class User implements IUser {
    id: number;
    username: string;
    admin: boolean;
    
    public constructor(init?: Partial<IUser>) {
        Object.assign(this, init);
    }
}