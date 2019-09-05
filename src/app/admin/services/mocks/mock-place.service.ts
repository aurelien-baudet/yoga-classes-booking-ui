import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Place, PlaceId, samePlacePredicate } from '../../../booking/domain/reservation';
import { PlaceService } from '../place.service';
import { Injectable } from '@angular/core';
import { ServerConfig } from 'src/environments/config';
import * as places from './data/places.json';

@Injectable()
export class MockPlaceService implements PlaceService {

    constructor() {}

    async list(): Promise<Place[]> {
        console.log('places', places);
        return places['default'];
    }

    async getPlaceInfo(place: PlaceId): Promise<Place> {
        return places['default'].find(samePlacePredicate(place));
    }
}
