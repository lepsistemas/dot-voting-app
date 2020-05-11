import { User } from './user';

export class Room {
    id: number;
    locked: boolean;
    name: string;
    numberOfGuests: number;
    admin: User;
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}