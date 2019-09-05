import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Place, PlaceId } from './../../../booking/domain/reservation';
import { PlaceService } from '../place.service';
import { Injectable } from '@angular/core';
import { ServerConfig } from 'src/environments/config';

@Injectable()
export class RestPlaceService implements PlaceService {

    constructor(private http: HttpClient,
                private serverConfig: ServerConfig) {}

    async list(): Promise<Place[]> {
        return this.http.get<Place[]>(`${this.serverConfig.url}/places`)
            .pipe(first())
            .toPromise();
    }

    async getPlaceInfo(place: PlaceId): Promise<Place> {
        return this.http.get<Place>(`${this.serverConfig.url}/places/${place.id}`)
            .pipe(first())
            .toPromise();
    }
}
