import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoomService } from '../../service/room/room.service';
import { UserService } from '../../service/user/user.service';
import { CardService } from '../../service/card/card.service';

import { Room } from '../../model/room';
import { User } from '../../model/user';
import { Card } from '../../model/card';
import { Socket } from 'ngx-socket-io';
import { RoomExit } from '../../model/room-exit';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {

  room$: Room;
  user$: User;
  cards$: Card[];
  
  left: boolean;

  constructor(private socket: Socket, private router: Router, private route: ActivatedRoute, private roomService: RoomService, private userService: UserService, private cardService: CardService) {}
  
  ngOnInit(): void {
    this.socket.connect();

    this.route.queryParamMap
    .subscribe(params => {
      const id = parseInt(params.get('roomId'));
      this.roomService.get(id)
      .subscribe(result => {
        this.room$ = result;
        this.cardService.fromRoom(this.room$.id)
        .subscribe(result => {
          this.cards$ = result;
        });
        this.roomEntranceListener();
        this.roomDeletingListener();
        this.cardsChangedListener();
      });

      const userId = parseInt(params.get('userId'));
      this.userService.get(userId)
      .subscribe(result => {
        this.user$ = result;
      });
    });
  }

  private roomEntranceListener(): void {
    this.socket.on(`ROOM:${this.room$.id}_ROOM-CHANGED`, () => {
      this.roomService.get(this.room$.id)
      .subscribe(result => {
        this.room$ = result;
      });
    });
  }

  private roomDeletingListener(): void {
    this.socket.once(`ROOM:${this.room$.id}_ROOM-DELETED`, () => {
      this.left = true;
      if (!this.isAdmin()) {
        window.alert('Admin left the room.');
      }
      this.socket.disconnect();
      this.exit();
    });
  }

  private cardsChangedListener(): void {
    this.socket.on(`ROOM:${this.room$.id}_CARDS-CHANGED`, () => {
      this.cardService.fromRoom(this.room$.id)
      .subscribe(result => {
        this.cards$ = result;
      });
    });
  }

  ngOnDestroy(): void {
    if (!this.left) {
      const roomExit: RoomExit = {
        id: this.room$.id,
        userId: this.user$.id
      }
      this.roomService.leave(roomExit)
      .subscribe(() => {
        this.socket.disconnect();
      });
    }
  }

  isAdmin(): boolean {
    if (this.room$ && this.user$) {
      return this.room$.owner.username === this.user$.username;
    }
    return false;
  }

  isLocked(): boolean {
    return this.room$.locked ? true : false;
  }

  lock(): void {
    this.roomService.lock(this.room$.id)
    .subscribe(result => {
      this.room$ = result;
    });
  }

  unlock(): void {
    this.roomService.unlock(this.room$.id)
    .subscribe(result => {
      this.room$ = result;
    });
  }

  exit(): void {
    this.router.navigate(['/home']);
  }

}
