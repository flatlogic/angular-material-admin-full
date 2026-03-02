import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploaderService {
  constructor(private httpClient: HttpClient) {}

  upload(data: FormData, url: string): Observable<string> {
    return this.httpClient.post<string>(url, data, { responseType: 'text' as 'json' });
  }
}
