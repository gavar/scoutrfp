import { Latest } from "$/api";
import { configureContext, Context } from "$/context";
import { isAction } from "$/core";
import { LatestState } from "$/state";
import { expect } from "$/test";
import { exchange } from "./exchange";
import FetchAction = exchange.latest.FetchAction;
import IsFetchingAction = exchange.latest.IsFetchingAction;
import LatestStateRef = exchange.latest.LatestStateRef;
import ReceiveAction = exchange.latest.ReceiveAction;

describe("exchange action creators", function () {

  const error = new Error();
  const latest: Latest = {
    base: "TEST",
    rates: {
      "EUR": 1,
    },
    date: new Date().toString(),
  };

  it("isFetching", function () {
    const action: IsFetchingAction = exchange.latest.isFetching();
    expect(action.type).toBe("exchange.latest.isFetching");
  });

  it("receive", function () {
    const action: ReceiveAction = exchange.latest.receive(latest, error);
    expect(action.type).toBe("exchange.latest.receive");
    expect(action.error).toBe(error);
    expect(action.latest).toBe(latest);
  });

  describe("fetch", function () {
    let context: Context;
    let state: LatestState;
    let stateRef: LatestStateRef;

    beforeEach(function () {
      state = {} as any;
      stateRef = () => state;
      context = configureContext();
    });

    it("creates action", function () {
      const action: FetchAction = exchange.latest.fetch();
      expect(action.type).toBe("exchange.latest.fetch");
      expect(typeof action).toBe("function");
    });

    it("initial fetch", async function () {
      // spy
      const spyLatest = context.exchange.latest = jasmine.createSpy().and.returnValue(Promise.resolve(latest));
      const spyDispatch = jasmine.createSpy("dispatch");

      // invoke
      const action: FetchAction = exchange.latest.fetch();
      await action(spyDispatch, stateRef, context);
      const actions = spyDispatch.calls.allArgs().map(x => x[0]);

      // should dispatch fetching action
      const fetching = actions.find(x => isAction(x, exchange.latest.isFetching));
      expect(fetching).toBeTruthy();

      // should call method on exchange service
      expect(spyLatest.calls.count()).toBe(1);

      // should dispatch receive action
      const receive: ReceiveAction = actions.find(x => isAction(x, exchange.latest.receive));
      expect(receive).toBeTruthy();
      expect(receive.latest).toBe(latest);
      expect(receive.error).toBeUndefined();
    });

    it("should not fetch when already fetching", async function () {
      // setup state
      state.fetching = true;

      // spy
      const spyLatest = context.exchange.latest = jasmine.createSpy().and.returnValue(Promise.resolve(latest));
      const spyDispatch = jasmine.createSpy("dispatch");

      // invoke
      const lazy: FetchAction = exchange.latest.fetch();
      await lazy(spyDispatch, stateRef, context);
      const force: FetchAction = exchange.latest.fetch(true);
      await force(spyDispatch, stateRef, context);

      // should not dispatch actions
      expect(spyDispatch.calls.count()).toBe(0);

      // should not call exchange service
      expect(spyLatest.calls.count()).toBe(0);
    });

    it("should not lazy fetch when already has rates", async function () {
      // setup state
      state.rates = [{} as any];

      // spy
      const spyLatest = context.exchange.latest = jasmine.createSpy().and.returnValue(Promise.resolve(latest));
      const spyDispatch = jasmine.createSpy("dispatch");

      // invoke
      const action: FetchAction = exchange.latest.fetch();
      await action(spyDispatch, stateRef, context);

      // should not dispatch actions
      expect(spyDispatch.calls.count()).toBe(0);

      // should not call exchange service
      expect(spyLatest.calls.count()).toBe(0);
    });

    it("should handle fetch exceptions", async function () {
      // spy
      const message = "unable to fetch";
      const spyLatest = context.exchange.latest = jasmine.createSpy().and.throwError(message);
      const spyDispatch = jasmine.createSpy("dispatch");

      // invoke
      const action: FetchAction = exchange.latest.fetch();
      await action(spyDispatch, stateRef, context);
      const actions = spyDispatch.calls.allArgs().map(x => x[0]);

      // should dispatch receive with error
      const receive: ReceiveAction = actions.find(x => isAction(x, exchange.latest.receive));
      expect(receive).toBeTruthy();
      expect(receive.latest).toBeNull();
      expect(receive.error).toBeDefined();
      expect(receive.error.message).toBe(message);
    });
  });
});
