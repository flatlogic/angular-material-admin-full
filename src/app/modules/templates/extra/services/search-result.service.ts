import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SearchResult} from '../models';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {
  public getSearchResult(): Observable<SearchResult[]> {
    return of([
      {
        title: 'Next generation admin template',
        subtitle: 'New York, NY 2018',
        description:
          'Not just usual Metro. But something bigger. Not just usual widgets, but real widgets.' +
          ' Not just yet another admin template, but next generation admin template.',
        price: '$9700',
        img: './assets/extra/search-result/1.png'
      },
      {
        title: 'Try. Posted by Okendoken',
        subtitle: 'Los Angeles, NY 20188',
        description:
          'You will never know exactly how something will go until you try it. You can think three hundred' +
          ' times and still have no precise result.',
        price: '$10300',
        img: './assets/extra/search-result/2.png'
      },
      {
        title: 'Vitaut the Great',
        subtitle: 'New York, NY 20188',
        description:
          'The Great Prince of the Grand Duchy of Lithuania he had stopped the invasion to Europe' +
          ' of Timur (Tamerlan) from Asia heading a big Army of Belarusians, Lithuanians.',
        price: '$3200',
        img: './assets/extra/search-result/3.png'
      },
      {
        title: 'Can I use CSS3 Radial-Gradient?',
        subtitle: 'Minsk, NY 20188',
        description:
          'Yes you can! Further more, you should! It let`s you create really beautiful images either for' +
          ' elements or for the entire background.',
        price: '$2400',
        img: './assets/extra/search-result/4.png'
      }
    ]);
  }
}
