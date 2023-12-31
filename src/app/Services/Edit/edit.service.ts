import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http:HttpClient) { }

  downloadFile(filePath: string): Observable<Blob> {
    return this.http.get(filePath, {
      responseType: 'blob'
    });
  }
}
