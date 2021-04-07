interface HasId {
  id: string;
}

export interface Entity<T> {
  [id: string]: T;
}

export const mapToEntity = <T extends HasId>(
  payload: T[],
  stateEntities: Entity<T>
) => {
  payload.reduce(
    (entities: Entity<T>, entity: T) => {
      return {
        ...entities,
        [entity.id]: entity
      };
    },
    { ...stateEntities }
  );
};

export interface BaseEntityInterface<T> {
  entities: Entity<T>;
  loading: boolean;
  loaded: boolean;
}
