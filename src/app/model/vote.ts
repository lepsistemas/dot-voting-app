export class Vote {
    id?: number;
    cardId: number;
    voterId: number;
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}