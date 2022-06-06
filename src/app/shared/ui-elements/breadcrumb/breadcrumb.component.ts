import { Component, Input, OnInit } from '@angular/core';
import { routes } from '../../../consts';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() public path: string;
  public routes: typeof routes = routes;
  public pathElements: string[] = [];
  public lastElement: string;

  ngOnInit(): void {
    this.pathElements = this.path.slice(1).split('/');

    this.lastElement = this.pathElements
      .pop()
      .replace(/(^|\s)\S/g, (a: string) => a.toUpperCase());
  }
}
