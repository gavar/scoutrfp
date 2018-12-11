import { Action, ActionCreator as $ActionCreator } from "redux";

/** Infer type of the action being created by an action creator. */
export type ActionType<C extends ActionCreator> = C extends ActionCreator<infer R> ? R : Action;

/**
 * Additionally to "redux" creator allows to specify type of action it creates.
 * Reducing boilerplate required to be defined in order to operate.
 */
export interface ActionCreator<A extends Action = Action> extends $ActionCreator<A> {
  /** @see Action#type. */
  type?: A["type"];
}

/**
 * Set type for the given action creator.
 * @param creator - function creating actions.
 * @param type - type to set.
 */
export function setCreatorType<A extends Action = Action>(creator: ActionCreator<A>, type: any) {
  creator.type = type;
}

/**
 * Automatically generate value of the {@link ActionCreator#type}.
 * @param creator - function creating actions.
 * @param scope - namespace of the actions to avoid type conflicts.
 */
export function autoCreatorType<A extends Action = Action>(creator: ActionCreator<A>, scope: any) {
  const {name} = creator;
  creator.type = scope ? scope + "." + name : name;
}

/**
 * Create action from given parameters using type of the given creator.
 * @param creator - function creating actions that provides action type.
 * @param params - action parameters.
 */
export function action<A extends Action, P>(creator: ActionCreator<A>, params?: P): P & A {
  const action: P & A = params || {} as any;
  if (creator.type) action.type = creator.type;
  else throw new Error(`action type is not defined for the creator: ${creator}`);
  return action;
}

/**
 * Check if the provided action is created with the same as type of given action creator.
 * @param action - action object to check.
 * @param creator - action creator.
 */
export function isAction<A extends Action>(action: Action, creator: ActionCreator<A>): action is A {
  return action && creator
    && action.type === creator.type;
}
