import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { routes, AUTO_COMPLETE_LIMIT } from '../../../consts';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';
import { AutoCompleteItem } from '../../../shared/models/common';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss'],
})
export class UsersCreateComponent implements OnInit {
  loading = false;
  public routes: typeof routes = routes;
  form: FormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  imgFile: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataFormatterService: DataFormatterService,

    private usersService: UsersService,
  ) {
    this.form = this.formBuilder.group({
      firstName: [''],

      lastName: [''],

      phoneNumber: [''],

      email: [''],

      role: [false],

      disabled: [false],

      avatar: [[]],
    });
  }

  ngOnInit(): void {}

  avatarAdd(val) {
    this.form.value.avatar.push(val);
  }
  avatarDel(id) {
    this.form.value.avatar = this.form.value.avatar.filter(
      (img) => img.id !== id,
    );
  }

  onCreate(): void {
    this.usersService.create(this.form.value).subscribe({
      next: (res) => {
        this.toastr.success('Users created successfully');
        this.router.navigate([this.routes.Users]);
      },
      error: (err) => {
        this.toastr.error('Something was wrong. Try again');
      },
    });
  }

  onCancel(): void {
    this.router.navigate([this.routes.Users]);
  }
}
