export class RoomExit {
    id: number;
    userId: number;
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}