export interface INewRoom {
    id: number;
    username: string;
    roomname: string;
    numberOfGuests: number;
}

export class NewRoom implements INewRoom {
    id: number;
    username: string;
    roomname: string;
    numberOfGuests: number;
    
    public constructor(init?: Partial<INewRoom>) {
        Object.assign(this, init);
    }
}