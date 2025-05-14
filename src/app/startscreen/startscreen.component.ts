import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {
  
  constructor(private firestore: Firestore, private router: Router) {}

  async goToGame() {
    let game = new Game();
    const ref = collection(this.firestore, 'games');
    await addDoc(ref, game.toJson())
      .then((gameInfo: any) => {
        // console.log(gameInfo);

        this.router.navigate(['/game/' + gameInfo.id]);
      });
  }
}