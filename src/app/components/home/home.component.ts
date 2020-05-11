import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from  '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

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
  enterRoom: Room;

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.newRoomForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      numberOfGuests: new FormControl('', Validators.required)
    });

    this.enterRoomForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      owner: new FormControl('', Validators.required)
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
        this.newRoom = result;
        const navigationExtras: NavigationExtras = {
          queryParams: { 'id': this.newRoom.id }
        };
        this.router.navigate(['/room'], navigationExtras);
      }
    );
  }

  onEnter(): void {
    if (this.enterRoomForm.invalid) {
      return;
    }
    this.roomService.getByOwnerAndName(this.enterRoomForm.value.owner, this.enterRoomForm.value.name)
    .subscribe(
      (result) => {
        this.enterRoom = result;
        const navigationExtras: NavigationExtras = {
          queryParams: { 'id': this.enterRoom.id }
        };
        this.router.navigate(['/room'], navigationExtras);
      }
    );
  }

}
