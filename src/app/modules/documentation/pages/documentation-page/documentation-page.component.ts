import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {routes} from '../../../../consts';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatSidenav} from '@angular/material/sidenav';

interface DocumentationNode {
  name: string;
  route?: string;
  active?: string;
  children?: DocumentationNode[];
}

interface DocumentationFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  route?: string;
  active?: string;
}

const TREE_DATA: DocumentationNode[] = [
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
    standalone: false,
  templateUrl: './documentation-page.component.html',
  styleUrls: ['./documentation-page.component.scss']
})
export class DocumentationPageComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public isShowSidebar: boolean;
  public mobileQuery: MediaQueryList;
  public routes: typeof routes = routes;
  private mobileQueryListener: () => void;


  private _transformer = (node: DocumentationNode, level: number): DocumentationFlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      route: node.route,
      active: node.active
    } as DocumentationFlatNode;
  };

  treeControl = new FlatTreeControl<DocumentationFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener<DocumentationNode, DocumentationFlatNode>(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource<DocumentationNode, DocumentationFlatNode>(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: DocumentationFlatNode): boolean => node.expandable;

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
