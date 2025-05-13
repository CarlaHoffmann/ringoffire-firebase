import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
// import { GamedataService } from '../gamedata.service';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, addDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, GameInfoComponent, MatButtonModule, 
    MatIconModule, MatDialogModule, DialogAddPlayerComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  // gamedata = inject(GamedataService);
  currentCard: string = '';
  game!: Game;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.newGame();
    // const ref = collection(this.firestore, 'games');
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      // collectionData(ref)
      // .subscribe((game) => { 
      //   console.log('Game update', game);
      // });

      const docRef = doc(this.firestore, 'games', params['id']);
      docData(docRef).subscribe((game: any) => {
        console.log('Gameupdate', game);
        this.game.currentPlayer = game['currentPlayer'] ?? 0;
        this.game.stack = game['stack'] ?? [];
        this.game.playedCards = game['playedCards'] ?? [];
        this.game.players = game['players'] ?? [];
      });
    });
  }

  async newGame() {
    this.game = new Game();
    // console.log(this.game);
    // const ref = collection(this.firestore, 'games');
    // await addDoc(ref, this.game.toJson());
  }

  takeCard() {
    if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || ''; // pop() nimmt den letzten Wert im Array
      this.pickCardAnimation = true;
      console.log('New card:' + this.currentCard);
      console.log('Game is', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // Rest-Opperator: 3/3 = 1 Rest 0;
      setTimeout(()=>{
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
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
      }
    });
  }
}
