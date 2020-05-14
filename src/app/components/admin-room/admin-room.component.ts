import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user';
import { Room } from '../../model/room';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css']
})
export class AdminRoomComponent implements OnInit {

  @Input() admin: User;
  @Input() room: Room;

  constructor() { }

  ngOnInit(): void {
  }

}
