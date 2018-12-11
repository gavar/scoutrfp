import { Latest } from "$/api";
import { Context } from "$/context";
import { action, ActionType, autoCreatorType } from "$/core";
import { LatestState } from "$/state";
import { Dispatch } from "redux";

export namespace exchange {
  export const scope = "exchange";

  export namespace latest {
    const scope = `${exchange.scope}.latest`;

    // define types
    export type LatestStateRef = () => LatestState;
    export type ReceiveAction = ActionType<typeof receive>
    export type IsFetchingAction = ActionType<typeof isFetching>;
    export type FetchAction = ActionType<typeof fetch>;

    // set action types
    autoCreatorType(fetch, scope);
    autoCreatorType(receive, scope);
    autoCreatorType(isFetching, scope);

    /** Notify that latest rates has been requested from the API server. */
    export function isFetching() {
      return action(isFetching);
    }

    /**
     * Received response of the latest rates from the API server.
     * @param latest - latest rates
     * @param error - error if something went wrong.
     */
    export function receive(latest: Latest, error?: Error) {
      return action(receive, {latest, error});
    }

    /**
     * Request latest rates from the API server.
     * @param force - whether to forcibly fetch new data if already exists.
     */
    export function fetch(force?: boolean) {
      return action(fetch, async function (dispatch: Dispatch, stateRef: LatestStateRef, context: Context) {
        if (shouldFetch(stateRef(), force)) {
          dispatch(isFetching());
          try {
            const {exchange} = context;
            const latest = await exchange.latest();
            dispatch(receive(latest));
          }
          catch (error) {
            dispatch(receive(null, error));
          }
        }
      });
    }

    function shouldFetch(state: LatestState, force: boolean) {
      if (!state) return true;
      if (state.fetching) return false;
      if (force) return true;
      if (state.rates && state.rates.length) return false;
      return true;
    }
  }
}
