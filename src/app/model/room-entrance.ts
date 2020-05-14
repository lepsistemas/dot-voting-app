export class RoomEntrance {
    key: string;
    name: string;
    username: string;
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}