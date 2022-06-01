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
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent implements OnInit {
  selectedUsers;
  loading = false;
  public routes: typeof routes = routes;
  form: FormGroup;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;
  selectedId = this.route.snapshot.params.id;

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

      password: [''],
    });
  }

  ngOnInit(): void {
    this.getUsersById();
  }

  avatarAdd(val) {
    this.form.value.avatar.push(val);
  }
  avatarDel(id) {
    this.form.value.avatar = this.form.value.avatar.filter(
      (img) => img.id !== id,
    );
  }

  onSave(): void {
    this.usersService.update(this.form.value, this.selectedId).subscribe({
      next: (res) => {
        this.toastr.success('Users updated successfully');
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

  private getUsersById(): void {
    this.usersService.getById(this.selectedId).subscribe((res) => {
      this.form.patchValue(res);
    });
  }
}
