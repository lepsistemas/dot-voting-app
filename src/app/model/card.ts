export class Card {
    id: number;
    title: string;
    description: string;
    roomId: number;
    userId: number;
    votes: number;
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}