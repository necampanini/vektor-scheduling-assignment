interface HasId {
  id: string;
}

export interface Entity<T> {
  [id: string]: T;
}

// helper function, takes array from 'backend' and flattens to object
export const mapToEntity = <T extends HasId>(
  payload: T[],
  stateEntitiesObject: Entity<T>
): Entity<T> =>
  payload.reduce(
    (entitiesObject: Entity<T>, entity: T) => {
      return {
        ...entitiesObject,
        [entity.id]: entity,
      };
    },
    { ...stateEntitiesObject }
  );

export interface BaseEntityInterface<T> {
  entities: Entity<T>;
  loading: boolean;
  loaded: boolean;
}
