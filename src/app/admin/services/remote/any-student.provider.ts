import { Observable, of, scheduled } from 'rxjs';
import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';

@Injectable()
export class AnyStudentProvider implements AutoCompleteService {
  labelAttribute = 'name';

  getResults(keyword: string): Observable<any[]> {
    return of([{name: 'Bientôt disponible'}]);
  }

}
