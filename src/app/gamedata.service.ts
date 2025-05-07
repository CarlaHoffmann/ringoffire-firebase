import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamedataService {
  public players: string[] = [];
  public stack: string[] = ['gvh', 'jhiuo', 'bjk'];
  public playedCards: string[] = [];
  public current: number = 0;

  constructor() { }

  
}
