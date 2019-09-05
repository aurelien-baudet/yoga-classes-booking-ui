import { Place, PlaceId } from './../../booking/domain/reservation';

export abstract class PlaceService {
    async abstract list(): Promise<Place[]>;
    async abstract getPlaceInfo(place: PlaceId): Promise<Place>;
}
