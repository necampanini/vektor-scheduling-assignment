interface HasId {
  id: string;
}

export interface Entity<T> {
  [id: string]: T;
}

// helper function, takes array from 'backend' and flattens to object
export const mapToEntity = <T extends HasId>(
  payload: T[],
  stateEntities: Entity<T>
): Entity<T> =>
  payload.reduce(
    (entities: Entity<T>, entity: T) => {
      return {
        ...entities,
        [entity.id]: entity
      };
    },
    { ...stateEntities }
  );

export interface BaseEntityInterface<T> {
  entities: Entity<T>;
  loading: boolean;
  loaded: boolean;
}
