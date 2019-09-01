import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CurrentRoute {
    constructor(private router: Router) { }

    getQueryParam(key: string): string {
        return this.router.routerState.snapshot.root.queryParams[key];
    }
}
