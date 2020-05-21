import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';

import { RoomComponent } from './room.component';
import { SharedModule } from '../../shared/shared.module';
import { MainRoomComponent } from '../main-room/main-room.component';
// import { OnlineUsersComponent } from '../online-users/online-users.component';

@NgModule({
  declarations: [RoomComponent, MainRoomComponent],
  imports: [CommonModule, SharedModule, RoomRoutingModule]
})
export class RoomModule {}
