import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user';
import { Room } from '../../model/room';

@Component({
  selector: 'app-main-room',
  templateUrl: './main-room.component.html',
  styleUrls: ['./main-room.component.css']
})
export class MainRoomComponent implements OnInit {

  @Input() me: User;
  @Input() room: Room;

  constructor() { }

  ngOnInit(): void {
  }

  isAdmin(): boolean {
    if (this.room && this.me) {
      return this.room.owner.username === this.me.username;
    }
    return false;
  }

}
