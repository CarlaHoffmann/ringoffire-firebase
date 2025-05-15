import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  allProfilePics = ['female-blue.png', 'male-blue.png', 'female-red.png', 'male-red.png', 'female-yellow.png', 'male-yellow.png', 'girl-red.png', 'boy-grey.png', 'firefighter.png', 'bear.png', 'bird.png', 'chicken.png', 'mouse.png', 'ox.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
