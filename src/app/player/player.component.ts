import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  
  @Input() name!: string;
  @Input() image: string = 'firefighter.png';
  @Input() activePlayer: boolean = false;

}
