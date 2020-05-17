import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../model/user';
import { Room } from '../../model/room';
import { RoomService } from '../../service/room/room.service';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {

  @Input() me: User;
  @Input() room: Room;
  @Output() roomChange = new EventEmitter<Room>();

  constructor(private roomService: RoomService) { }
  
  ngOnInit(): void {
    this.updateOnlineUsers();
  }

  private updateOnlineUsers() {
    if (this.room) {
      this.roomService.get(this.room.id)
      .subscribe(result => {
        this.room = result;
        this.roomChange.emit(result);
      });
    }
  }

}
