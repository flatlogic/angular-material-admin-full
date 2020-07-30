import { Component } from '@angular/core';
import {routes} from '../../../../../consts';
import {MatDialog} from '@angular/material/dialog';
import {GridComponent, LocationComponent, LongContentComponent, SubscribedComponent} from '../../popups';
import {FormComponent} from '../../popups/form/form.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss']
})
export class ModalPageComponent {
  public routes: typeof routes = routes;

  constructor(
    public dialog: MatDialog
  ) {}

  public openDialog(): void {
    this.dialog.open(LocationComponent, {
      width: '700px'
    });
  }

  public openLargeDialog(): void {
    this.dialog.open(LocationComponent, {
      width: '992px'
    });
  }

  public openSmallDialog(): void {
    this.dialog.open(LocationComponent, {
      width: '512px'
    });
  }

  public openScrollingDialog(): void {
    this.dialog.open(LongContentComponent, {
      width: '700px'
    });
  }

  public openFormDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '700px',
      data: {email: ''}
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result.length !== 0) {
        this.dialog.open(SubscribedComponent, {
          width: '700px',
          data: {email: result}
        })
      }
    });
  }

  public openGridDialog(): void {
    this.dialog.open(GridComponent, {
      width: '700px'
    });
  }
}
