export class User {
    id: number;
    username: string;
    admin: boolean;
    
    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}