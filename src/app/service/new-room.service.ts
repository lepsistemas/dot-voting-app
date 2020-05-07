import { Injectable } from '@angular/core';
import { INewRoom } from '../model/new-room';
import { IRoom, Room } from '../model/room';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class NewRoomService {

  constructor() { }

  create(newRoom: INewRoom): IRoom {
    return new Room({
      id: 1,
      locked: false,
      roomname: newRoom.roomname,
      numberOfGuests: newRoom.numberOfGuests,
      admin: new User({
        username: newRoom.username,
        admin: true
      })
    });
  }
}
