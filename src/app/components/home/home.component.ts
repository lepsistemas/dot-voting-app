import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';

import { Room } from '../../model/room';
import { RoomService } from '../../service/room/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newRoomForm: FormGroup;
  enterRoomForm: FormGroup;

  newRoom: Room;

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.newRoomForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      numberOfGuests: new FormControl('', Validators.required)
    });

    this.enterRoomForm = new FormGroup({
      username: new FormControl('', Validators.required),
      roomname: new FormControl('', Validators.required),
    });
  }

  onCreate(): void {
    if (this.newRoomForm.invalid) {
      return;
    }
    this.newRoom = new Room(this.newRoomForm.value);
    this.roomService.create(this.newRoom)
    .subscribe(
      (result) => {
        console.log(result);
        // this.router.navigate([`/rooms/${this.newRoom.roomname}`]);
      }
    );
  }

  onEnter(): void {
    if (this.enterRoomForm.invalid) {
      return;
    }
  }

  get formControls() {
    return this.newRoomForm.controls;
  }

}
