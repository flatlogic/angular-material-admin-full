import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-delete-popup',
    templateUrl: './delete-popup.component.html',
    styleUrls: ['./delete-popup.component.scss'],
    standalone: true,
    imports: [MatButtonModule]
})
export class DeletePopupComponent implements OnInit {

  @Output() deleteConfirmed = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<DeletePopupComponent>) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.deleteConfirmed.emit();
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
