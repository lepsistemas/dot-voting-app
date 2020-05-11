import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../model/room';
import { RoomService } from '../../service/room/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  id: number;
  room$: Room;

  constructor(private route: ActivatedRoute, private roomService: RoomService) {}
  
  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe(params => {
      this.id = parseInt(params.get('id'))
      this.roomService.get(this.id)
      .subscribe(result => {
        this.room$ = result;
      })
    });
  }

}
