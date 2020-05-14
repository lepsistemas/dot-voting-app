import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../model/room';
import { RoomService } from '../../service/room/room.service';
import { UserService } from '../../service/user/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room$: Room;
  user$: User;

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService, private userService: UserService) {}
  
  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe(params => {
      const id = parseInt(params.get('id'));
      this.roomService.get(id)
      .subscribe(result => {
        this.room$ = result;
      });

      const userId = parseInt(params.get('userId'));
      this.userService.get(userId)
      .subscribe(result => {
        this.user$ = result;
      });
    });
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
    if (this.isAdmin()) {
      this.roomService.delete(this.room$.id)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
    } else {
      this.router.navigate(['/home']);
    }
  }

}
