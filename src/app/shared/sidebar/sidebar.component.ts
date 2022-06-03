import { Component } from '@angular/core';
import { routes } from '../../consts';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { ChatPopupComponent } from '../popups/chat-popup/chat-popup.component';


const TREE_DATA: any = [
  {
    name: 'E-commerce',
    children: [
      {name: 'Product Manage', route: routes.MANAGEMENT, active: 'active'},
      {name: 'Products Grid', route: routes.PRODUCTS, active: 'active'},
      {name: 'Product Page', route: routes.PRODUCT, active: 'active'},
    ]
  },
  {
    name: 'User',
    children: [
      { name: 'User List', route: routes.Users, active: 'active' },
      { name: 'User Add', route: routes.Users_CREATE, active: 'active' },
      { name: 'User Edit', route: routes.Users_EDIT, active: 'active' },
    ]
  }
];

const TemplateNode: any = [
  {
    name: 'Core',
    children: [
      { name: 'Typography', route: routes.TYPOGRAPHY, active: 'active' },
      { name: 'Colors', route: routes.COLORS, active: 'active' },
      { name: 'Grid', route: routes.GRID, active: 'active' },
    ]
  },
  {
    name: 'Tables',
    children: [
      { name: 'Tables Basic', route: routes.TABLES_BASIC, active: 'active' },
      { name: 'Tables Dynamic', route: routes.TABLES_DYNAMIC, active: 'active' },
    ]
  },
  {
    name: 'UI Elements',
    children: [
      { name: 'Icon', route: routes.ICONS, active: 'active' },
      { name: 'Badge', route: routes.BADGE, active: 'active' },
      { name: 'Carousel', route: routes.CAROUSEL, active: 'active' },
      { name: 'Cards', route: routes.CARDS, active: 'active' },
      { name: 'Modal', route: routes.MODAL, active: 'active' },
      { name: 'Notification', route: routes.NOTIFICATION, active: 'active' },
      { name: 'Navbar', route: routes.NAVBAR, active: 'active' },
      { name: 'Tooltips', route: routes.TOOLTIPS, active: 'active' },
      { name: 'Tabs', route: routes.TABS, active: 'active' },
      { name: 'Pagination', route: routes.PAGINATION, active: 'active' },
      { name: 'Progress', route: routes.PROGRESS, active: 'active' },
      { name: 'Widget', route: routes.WIDGET, active: 'active' },
    ]
  },
  {
    name: 'Forms',
    children: [
      { name: 'Form Elements', route: routes.FORMS_ELEMENTS, active: 'active' },
      { name: 'Form Validation', route: routes.FORMS_VALIDATION, active: 'active' },
    ]
  },
  {
    name: 'Charts',
    children: [
      { name: 'Charts Overview', route: routes.OVERVIEW_CHARTS, active: 'active' },
      { name: 'Line Charts', route: routes.LINE_CHARTS, active: 'active' },
      { name: 'Bar Charts', route: routes.BAR_CHARTS, active: 'active' },
      { name: 'Pie Charts', route: routes.PIE_CHARTS, active: 'active' },
    ]
  },
  {
    name: 'Maps',
    children: [
      { name: 'Google Map', route: routes.GOOGLE_MAP, active: 'active' },
      { name: 'Vector Map', route: routes.VECTOR_MAP, active: 'active' }
    ]
  },
  {
    name: 'Extra',
    children: [
      { name: 'Calendar', route: routes.CALENDAR, active: 'active' },
      { name: 'Invoice', route: routes.INVOICE, active: 'active' },
      { name: 'Login Page', route: routes.LOGIN_PAGE, active: 'active' },
      { name: 'Error Page', route: routes.ERROR_PAGE, active: 'active' },
      { name: 'Gallery', route: routes.GALLERY, active: 'active' },
      { name: 'Search Result', route: routes.SEARCH_RESULT, active: 'active' },
      { name: 'Time Line', route: routes.TIME_LINE, active: 'active' }
    ]
  },
  {
    name: 'Menu Levels',
    children: [
      { name: 'Level 1.1' },
      {
        name: 'Level 1.2',
        children: [
          { name: 'Level 2.1' },
          {
            name: 'Level 2.2',
            children: [
              { name: 'Level 3.1'}
            ]
          }
        ]
      }
    ]
  }
];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public routes: typeof routes = routes;
  public isOpenUiElements = false;


  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      route: node.route,
      active: node.active
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  templateDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
    this.templateDataSource.data = TemplateNode;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  public openUiElements() {
    this.isOpenUiElements = !this.isOpenUiElements;
  }

  public openChat(): void {
    this.dialog.open(ChatPopupComponent, {
      width: '436px'
    });
  }

  public stopPropagation(event){
    event.stopPropagation();
  }
}
