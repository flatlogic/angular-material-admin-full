import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TimeLineItem} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TimeLineService {
  public getTimeLineData(): Observable<TimeLineItem[]> {
    return of([
      {
        img: './assets/extra/time-line/a2.jpg',
        name: 'Jessica Nilson',
        nik: '@jess',
        datePublish: '10:12 am - Publicly near Minsk',
        date: {
          day: 'yesterday',
          time: '8:03 pm'
        },
        description: '',
        content: {
          type: 'map'
        },
        likes: [],
        comments: [
          {
            img: './assets/extra/time-line/a2.jpg',
            name: 'Jessica Nilson',
            date: '7 mins ago',
            comment: 'Someone said they were the best people out there just few years ago. Don\'t know better options.'
          },
          {
            img: './assets/extra/time-line/a3.jpg',
            name: 'Ignacio Abad',
            date: '6 mins ago',
            comment: 'Hey, have you heard anything about that?'
          }
        ]
      },
      {
        img: './assets/extra/time-line/a5.jpg',
        name: 'Bob Nilson',
        nik: '@nils',
        datePublish: 'February 22, 2014 at 01:59 PM',
        date: {
          day: 'yesterday',
          time: '9:03 am'
        },
        description: 'There is no such thing as maturity. There is instead an ever-evolving process of maturing. Because when there is a maturity, there is ...',
        content: {},
        likes: [],
        comments: []
      },
      {
        img: './assets/extra/time-line/a2.jpg',
        name: 'Jessica Smith',
        nik: '@jess',
        datePublish: 'February 22, 2014 at 01:59 PM',
        date: {
          day: 'yesterday',
          time: '9:03 am'
        },
        description: 'Check out this awesome photo I made in Italy last summer. Seems it was lost somewhere deep inside my brand new HDD 40TB. Thanks god I found it!',
        content: {
          img: './assets/extra/time-line/mountains.jpeg'
        },
        likes: [
          {img:'./assets/extra/time-line/a2.jpg'},
          {img:'./assets/extra/time-line/a5.jpg'},
          {img:'./assets/extra/time-line/a6.jpg'}
        ],
        comments: [
          {
            img: './assets/extra/time-line/a1.jpg',
            name: 'Ignacio Abad',
            date: '6 mins ago',
            comment: 'Hey, have you heard anything about that?'
          }
        ]
      },
      {
        img: './assets/extra/time-line/a6.jpg',
        name: 'Jessica Smith',
        nik: '@jess',
        datePublish: '9:03 am - Publicly near Minsk',
        date: {
          day: 'yesterday',
          time: '9:03 am'
        },
        title: 'New Project Launch',
        description: 'Let\'s try something different this time. Hey, do you wanna join us tonight? We\'re planning to a launch a new project soon. Want to discuss with all of you...',
        content: {
          text: 'Finished her are its honoured drawings nor. Pretty see mutual thrown all not edward ten.' +
            ' Particular an boisterous up he reasonably frequently. Several any had enjoyed shewing studied two.' +
            ' Up intention remainder sportsmen behaviour ye happiness. Few again any alone style added abode ask.' +
            ' Nay projecting unpleasing boisterous eat discovered solicitude. Own six moments produce elderly' +
            ' pasture far arrival. Hold our year they ten upon. Gentleman contained so intention sweetness in' +
            ' on resolving. Finished her are its honoured drawings nor. Pretty see mutual thrown all not edward' +
            ' ten. Particular an boisterous up he reasonably frequently. Several any had enjoyed shewing studied' +
            ' two. Up intention remainder sportsmen behaviour ye happiness. Few again any alone style added abode' +
            ' ask. Nay projecting unpleasing boisterous eat discovered solicitude. Own six moments produce elderly' +
            ' pasture far arrival. Hold our year they ten upon. Gentleman contained so intention sweetness in on' +
            ' resolving. Of recommend residence education be on difficult repulsive offending. Judge views had' +
            ' mirth table seems great him for her.'
        },
        likes: [],
        comments: []
      }
    ]);
  }
}
