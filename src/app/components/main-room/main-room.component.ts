import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardService } from '../../service/card/card.service';
import { User } from '../../model/user';
import { Room } from '../../model/room';
import { Card } from '../../model/card';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-room',
  templateUrl: './main-room.component.html',
  styleUrls: ['./main-room.component.css']
})
export class MainRoomComponent implements OnInit {

  @Input() me: User;
  @Input() room: Room;
  @Input() admin: boolean;

  @Input() cards: Card[];
  @Output() cardsChange = new EventEmitter<Card[]>();

  newCardForm: FormGroup;

  Arr = Array;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.newCardForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      roomId: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required)
    });
    this.updateCards();
  }

  private updateCards() {
    if (this.room) {
      this.cardService.fromRoom(this.room.id)
        .subscribe(result => {
          this.cards = result;
          this.cardsChange.emit(result);
        })
    }
  }

  onCreate(): void {
    this.newCardForm?.patchValue({roomId: this.room?.id});
    this.newCardForm?.patchValue({userId: this.me?.id});
    if (this.newCardForm.invalid) {
      return;
    }
    this.cardService.create(this.newCardForm.value)
    .subscribe(
      () => {
        this.updateCards();
      }
    );
  }

  onVote(cardId: number) {
    console.log(cardId);
  }

}
