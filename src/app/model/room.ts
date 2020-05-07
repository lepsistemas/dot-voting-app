import { IUser } from './user';

export interface IRoom {
    id: number;
    locked: boolean;
    roomname: string;
    numberOfGuests: number;
    admin: IUser;
}

export class Room implements IRoom {
    id: number;
    locked: boolean;
    roomname: string;
    numberOfGuests: number;
    admin: IUser;
    
    public constructor(init?: Partial<IRoom>) {
        Object.assign(this, init);
    }
}