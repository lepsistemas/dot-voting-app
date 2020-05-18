export class Card {
    id: number;
    title: string;
    description: boolean;
    roomId: number;
    userId: number;
    votes: number;
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}