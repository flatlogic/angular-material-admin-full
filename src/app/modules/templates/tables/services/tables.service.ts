import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Customer, Employee} from '../models';
import {Nutrition} from '../models/nutrition';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  public loadEmployeeTableData(): Observable<Employee[]> {
    return of([
      {name: 'Joe James', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'John Walsh', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Bob Herm', company: 'Example Inc.', city: 'Tampa', state: 'FL'},
      {name: 'James Houston', company: 'Example Inc.', city: 'Dallas', state: 'TX'},
      {name: 'Prabhakar Linwood', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Kaui Ignace', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Esperanza Susanne', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Christian Birgitte', company: 'Example Inc.', city: 'Tampa', state: 'FL'},
      {name: 'Meral Elias', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Deep Pau', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Sebastiana Hani', company: 'Example Inc.', city: 'Dallas', state: 'TX'},
      {name: 'Marciano Oihana', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Brigid Ankur', company: 'Example Inc.', city: 'Dallas', state: 'TX'},
      {name: 'Anna Siranush', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Avram Sylva', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Serafima Babatunde', company: 'Example Inc.', city: 'Tampa', state: 'FL'},
      {name: 'Gaston Festus', company: 'Example Inc.', city: 'Tampa', state: 'FL'}
    ]);
  }

  public loadMaterialTableData(): Observable<Customer[]> {
    return of([
      {
        name: 'Mark Otto',
        email: 'ottoto@wxample.com',
        product: 'ON the Road',
        price: '$25 224.2',
        date: '11 May 2017',
        city: 'Otsego',
        status: 'send'
      },
      {
        name: 'Jacob Thornton',
        email: 'thornton@wxample.com',
        product: 'HP Core i7',
        price: '$1 254.2',
        date: '4 Jun 2017',
        city: 'Fivepointville',
        status: 'send'
      },
      {
        name: 'Larry the Bird',
        email: 'bird@wxample.com',
        product: 'Air Pro',
        price: '$1 570.0',
        date: '27 Aug 2017',
        city: 'Leadville North',
        status: 'pending'
      },
      {
        name: 'Joseph May',
        email: 'josephmay@wxample.com',
        product: 'Version Control',
        price: '$5 224.5',
        date: '19 Feb 2018',
        city: 'Seaforth',
        status: 'declined'
      },
      {
        name: 'Peter Horadnia',
        email: 'horadnia@wxample.com',
        product: 'Let\'s Dance',
        price: '$43 594.7',
        date: '1 Mar 2018',
        city: 'Hanoverton',
        status: 'send'
      }
    ]);
  }

  public loadNutritionTableData(): Observable<Nutrition[]> {
    return of([
      { name: 'Jelly Bean', calories: '375', fat: '0', cards: '94', protein: '0'},
      { name: 'Lollipop', calories: '392', fat: '0.2', cards: '98', protein: '0'},
      { name: 'Marshmallow', calories: '318', fat: '0', cards: '81', protein: '2'},
      { name: 'Gingerbread', calories: '356', fat: '16', cards: '49', protein: '3.9'},
      { name: 'Frozen yoghurt', calories: '159', fat: '6', cards: '24', protein: '4'},
      { name: 'Oreo', calories: '437', fat: '18', cards: '63', protein: '4'},
      { name: 'Cupcake', calories: '305', fat: '3.7', cards: '67', protein: '4.3'},
      { name: 'Ice cream sandwich', calories: '237', fat: '9', cards: '37', protein: '4.3'},
      { name: 'Donut', calories: '452', fat: '25', cards: '51', protein: '4.9'},
      { name: 'Eclair', calories: '262', fat: '16', cards: '24', protein: '6'},
      { name: 'Honeycomb', calories: '408', fat: '3.2', cards: '87', protein: '6.5'},
      { name: 'KitKat', calories: '518', fat: '26', cards: '65', protein: '7'},
      { name: 'Nougat', calories: '360', fat: '19', cards: '9', protein: '37'}
    ]);
  }
}
