import { User } from './user';

export class Room {
    id: number;
    key: string;
    name: string;
    numberOfGuests: number;
    owner: User;
    locked: boolean;
    guests?: User[];
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}