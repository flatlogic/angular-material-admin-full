import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {routes} from '../../../../consts';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

const TREE_DATA: any = [
  {
    name: 'Getting Started',
    children: [
      {name: 'Overview', route: routes.OVERVIEW, active: 'active'},
      {name: 'Licences', route: routes.LICENCES, active: 'active'},
      {name: 'Quick start', route: routes.QUICK_START, active: 'active'},
    ]
  }
];

@Component({
  selector: 'app-documentation-page',
  templateUrl: './documentation-page.component.html',
  styleUrls: ['./documentation-page.component.scss']
})
export class DocumentationPageComponent implements OnDestroy {
  public isShowSidebar: boolean;
  public mobileQuery: MediaQueryList;
  public routes: typeof routes = routes;
  private mobileQueryListener: () => void;
  public isOpenUiElements = false;


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

    // this.sidenav.close();
  }
}
