import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ParamMap, Params } from '@angular/router';

@Injectable()
export class CurrentRoute {
    constructor(private router: Router) { }

    getPathParam(key: string): string | null {
        return this.findParam(this.router.routerState.snapshot.root, key, (r) => r.params);
    }

    getQueryParam(key: string): string | null {
        return this.findParam(this.router.routerState.snapshot.root, key, (r) => r.queryParams);
        // return this.router.routerState.snapshot.root.queryParams[key];
    }

    matches(pattern: string) {
        return this.router.routerState.snapshot.url.match(new RegExp(pattern.replace(/[*]/g, '.*')));
    }

    url() {
        return this.router.routerState.snapshot.url;
    }

    private findParam(route: ActivatedRouteSnapshot, key: string, accessor: (route: ActivatedRouteSnapshot) => Params): string | null {
        const found = this.flatten(route.children)
                .map(accessor)
                .find((p) => key in p);
        if (found) {
            return found[key];
        }
        return null;
    }

    private flatten(arr: ActivatedRouteSnapshot[]): ActivatedRouteSnapshot[] {
        return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flatten(val.children)) : acc.concat(val), []);
    }

}
