import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {routes} from '../../../../consts';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatSidenav} from '@angular/material/sidenav';

const TREE_DATA: any = [
  {
    name: 'Getting Started',
    children: [
      {name: 'Overview', route: routes.OVERVIEW, active: 'active'},
      {name: 'Licences', route: routes.LICENCES, active: 'active'},
      {name: 'Quick start', route: routes.QUICK_START, active: 'active'},
    ]
  },
  {
    name: 'Components',
    children: [
      {name: 'Charts', route: routes.CHARTS, active: 'active'},
      {name: 'Forms', route: routes.FORMS, active: 'active'},
      {name: 'UI', route: routes.UI, active: 'active'},
      {name: 'Maps', route: routes.MAPS, active: 'active'},
      {name: 'Tables', route: routes.TABLES, active: 'active'},
    ]
  }
];

@Component({
  selector: 'app-documentation-page',
  templateUrl: './documentation-page.component.html',
  styleUrls: ['./documentation-page.component.scss']
})
export class DocumentationPageComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  public isShowSidebar: boolean;
  public mobileQuery: MediaQueryList;
  public routes: typeof routes = routes;
  private mobileQueryListener: () => void;


  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      route: node.route,
      active: node.active
    };
  }

  treeControl = new FlatTreeControl<any>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: any) => node.expandable;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.dataSource.data = TREE_DATA;
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    this.isShowSidebar = !this.mobileQuery.matches;
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);

    this.sidenav.close();
  }
}
