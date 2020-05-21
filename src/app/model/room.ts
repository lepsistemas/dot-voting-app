import { User } from './user';
import { Card } from './card';

export class Room {
    
    id: number;
    key: string;
    name: string;
    numberOfGuests: number;
    owner: User;
    locked: boolean;
    guests?: User[];
    cards?: Card[];
    allowMultipleVotesPerCard: boolean;
    showResults: boolean;
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}