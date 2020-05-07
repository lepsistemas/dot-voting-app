import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';

import { INewRoom, NewRoom } from '../model/new-room';
import { NewRoomService } from '../service/new-room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newRoomForm: FormGroup;
  enterRoomForm: FormGroup;

  newRoom: INewRoom;

  constructor(private newRoomService: NewRoomService, private router: Router) { }

  ngOnInit(): void {
    this.newRoomForm = new FormGroup({
      username: new FormControl('', Validators.required),
      roomname: new FormControl('', Validators.required),
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
    this.newRoom = new NewRoom(this.newRoomForm.value);
    this.newRoomService.create(this.newRoom);
    this.router.navigate([`/rooms/${this.newRoom.roomname}`]);
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
