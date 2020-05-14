import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';

import { RoomComponent } from './room.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoomComponent } from '../admin-room/admin-room.component';

@NgModule({
  declarations: [RoomComponent, AdminRoomComponent],
  imports: [CommonModule, SharedModule, RoomRoutingModule]
})
export class RoomModule {}
