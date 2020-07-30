import {Component} from '@angular/core';
import {routes} from '../../../../../consts';
import {Observable} from 'rxjs';
import {SearchResult} from '../../models';
import {SearchResultService} from '../../services';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent {
  public routes: typeof routes = routes;
  public searchResults$: Observable<SearchResult[]>

  constructor(public service: SearchResultService) {
    this.searchResults$ = this.service.getSearchResult();
  }
}
