import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploaderService {
  constructor(private httpClient: HttpClient) {}

  upload(data, url): Observable<any> {
    return this.httpClient.post(url, data, { responseType: 'text' });
  }
}
