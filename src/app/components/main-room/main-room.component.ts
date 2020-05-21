import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CardService } from '../../service/card/card.service';
import { RoomService } from '../../service/room/room.service';
import { VoteService } from '../../service/vote/vote.service';

import { User } from '../../model/user';
import { Room } from '../../model/room';
import { Card } from '../../model/card';
import { Vote } from '../../model/vote';

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
  @Output() cardsChange: EventEmitter<Card[]> = new EventEmitter<Card[]>();

  votesGiven: number = 0;
  @Output() onVoteGiven: EventEmitter<number> = new EventEmitter<number>();

  newCardForm: FormGroup;

  constructor(private cardService: CardService, private roomService: RoomService, private voteService: VoteService) { }

  ngOnInit(): void {
    this.newCardForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      roomId: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required)
    });
    this.updateCards();
  }

  ngOnChanges(): void {
    this.cards = this.room?.showResults 
                  ? this.cards.sort((previous, current) => previous.votes < current.votes ? 1 : -1) 
                  : this.cards;
    this.cardsChange.emit(this.cards);
  }

  private updateCards(): void {
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

  onNumberOfVotesChanges(numberOfVotes: number): void {
    this.roomService.updateNumberOfVotes(this.room.id, numberOfVotes)
    .subscribe((result) => {
      this.room = result;
    });
  }

  onToggleMultipleVotesPerCard(allowMultipleVotesPerCard: boolean): void {
    this.roomService.updateMultipleVotesPerCard(this.room.id, allowMultipleVotesPerCard)
    .subscribe((result) => {
      this.room = result;
    });
  }

  onToggleShowResults(showResults: boolean): void {
    this.roomService.updateShowResults(this.room.id, showResults)
    .subscribe((result) => {
      this.room = result;
      this.updateCards();
    });
  }

  onVote(cardId: number) {
    const vote: Vote = {
      cardId: cardId,
      voterId: this.me.id
    }
    this.voteService.give(vote)
    .subscribe(() => {
      this.votesGiven++;
      this.onVoteGiven.emit(this.votesGiven);
      this.updateCards();
    });
  }

}
