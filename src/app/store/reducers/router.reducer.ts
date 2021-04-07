import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';

import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    return {
      url: routerState.url,
      params: mergeRouteParams(routerState.root, (r) => r.params),
      queryParams: mergeRouteParams(routerState.root, (r) => r.queryParams),
    };
  }
}

function mergeRouteParams(
  route: ActivatedRouteSnapshot,
  getter: (r: ActivatedRouteSnapshot) => Params
): Params {
  if (!route) {
    return {};
  }

  const currentParams = getter(route);
  const primaryChild =
    route.children.find((c) => c.outlet === 'primary') || route.firstChild;

  return {
    ...currentParams,
    ...mergeRouteParams(primaryChild, getter),
  };
}
