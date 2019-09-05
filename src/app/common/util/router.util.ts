import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ParamMap } from '@angular/router';

@Injectable()
export class CurrentRoute {
    constructor(private router: Router) { }

    getPathParam(key: string): string | null {
        return this.findParam(this.router.routerState.snapshot.root, key, (r) => r.paramMap);
    }

    getQueryParam(key: string): string | null {
        return this.findParam(this.router.routerState.snapshot.root, key, (r) => r.queryParamMap);
        // return this.router.routerState.snapshot.root.queryParams[key];
    }

    private findParam(route: ActivatedRouteSnapshot, key: string, accessor: (route: ActivatedRouteSnapshot) => ParamMap): string | null {
        const found = this.flatten(route.children)
                .map((c) => c.params)
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
