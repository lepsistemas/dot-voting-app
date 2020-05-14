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

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.newRoomForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });

    this.enterRoomForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      key: new FormControl('', Validators.required)
    });
  }

  onCreate(): void {
    if (this.newRoomForm.invalid) {
      return;
    }
    this.roomService.create(this.newRoomForm.value)
    .subscribe(
      (result) => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            id: result.id,
            userId: result.owner.id
          }
        };
        this.router.navigate(['/room'], navigationExtras);
      }
    );
  }

  onEnter(): void {
    if (this.enterRoomForm.invalid) {
      return;
    }
      this.roomService.enter(this.enterRoomForm.value)
      .subscribe(
        result => {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              id: result.id,
              userId: result.guest.id
            }
          };
          this.router.navigate(['/room'], navigationExtras);
        }
      );
  }

}
