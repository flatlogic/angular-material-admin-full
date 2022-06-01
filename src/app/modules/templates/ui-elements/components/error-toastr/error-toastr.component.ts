import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-error-toastr',
  templateUrl: './error-toastr.component.html',
  styleUrls: ['./error-toastr.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      state('removed', style({ opacity: 0 })),
      transition(
        'inactive => active',
        animate('{{ easeTime }}ms {{ easing }}')
      ),
      transition(
        'active => removed',
        animate('{{ easeTime }}ms {{ easing }}')
      )
    ])
  ],
  preserveWhitespaces: false
})
export class ErrorToastrComponent extends Toast {
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }
}
