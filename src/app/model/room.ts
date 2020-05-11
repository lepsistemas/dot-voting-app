import { User } from './user';

export class Room {
    id: number;
    name: string;
    numberOfGuests: number;
    owner: User;
    guests?: User[];
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}