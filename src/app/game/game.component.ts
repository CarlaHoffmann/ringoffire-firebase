import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, addDoc, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, GameInfoComponent, MatButtonModule,
    MatIconModule, MatDialogModule, DialogAddPlayerComponent, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  // pickCardAnimation = false;
  // currentCard: string = '';
  game!: Game;
  gameId!: string;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.newGame();
    // const ref = collection(this.firestore, 'games');
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];
      // collectionData(ref)
      // .subscribe((game) => { 
      //   console.log('Game update', game);
      // });

      const docRef = doc(this.firestore, 'games', this.gameId);
      docData(docRef).subscribe((game: any) => {
        console.log('Gameupdate', game);
        this.game.currentPlayer = game['currentPlayer'] ?? 0;
        this.game.stack = game['stack'] ?? [];
        this.game.playedCards = game['playedCards'] ?? [];
        this.game.players = game['players'] ?? [];
        this.game.pickCardAnimation = game['pickCardAnimation'] ?? [];
        this.game.currentCard = game['currentCard'] ?? [];
      });
    });
  }

  async newGame() {
    this.game = new Game();
    // console.log(this.game);
  }

  takeCard() {
    if(!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || ''; // pop() nimmt den letzten Wert im Array
      this.game.pickCardAnimation = true;
      console.log('New card:' + this.game.currentCard);
      console.log('Game is', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // Rest-Opperator: 3/3 = 1 Rest 0;
      this.saveGame();

      setTimeout(()=>{
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent
    //   , {
    //   data: {name: this.name, animal: this.animal},
    // }
    );

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  // updateGame() {
  //   const docRef = doc(this.firestore, 'games', this.gameId);
  //   docData(docRef).update(this.game.toJson());
  // }
  async saveGame() {
    const docRef = doc(this.firestore, 'games', this.gameId);
    // try {
      await updateDoc(docRef, this.game.toJson());
    //   console.log('Spiel erfolgreich aktualisiert!');
    // } catch (err) {
    //   console.error('Fehler beim Aktualisieren:', err);
    // }
  }
}
