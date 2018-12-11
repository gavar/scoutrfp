import { exchange } from "$/actions";
import { Latest } from "$/api";
import { Rate } from "$/state";
import { expect } from "$/test";
import latest from "./latest";

describe("reducers", function () {
  describe("exchange.latest", function () {
    let date: Date;
    let data: Latest;
    let error: Error;
    let rate: Rate;

    beforeEach(function () {
      date = new Date();
      error = new Error("test error");
      rate = {base: "X", quote: "Y", rate: 0.5};
      data = {
        base: rate.base,
        date: date.toString(),
        rates: {[rate.quote]: rate.rate},
      };
    });

    it("initial state", function () {
      const state = latest(null, null);
      expect(state).toBeTruthy();
      expect(state.base).toBeDefined();
      expect(state.rates).toBeTruthy();
      expect(state.fetching).toBe(false);
      expect(state.updatedAt).toBeFalsy();
      expect(state.error).toBeFalsy();
    });

    it("should set fetching state", function () {
      const action = exchange.latest.isFetching();
      const state = latest(null, action);
      expect(state.fetching).toBe(true);
    });

    it("should handle latest rates", function () {
      // setup
      const initial = {
        ...latest(null, null),
        fetching: true,
      };

      // invoke
      const action = exchange.latest.receive(data);
      const state = latest(initial, action);

      // should have latest data
      expect(state.base).toBe(data.base);
      expect(state.rates).toEqual([rate]);
      expect(state.updatedAt).toBeTruthy();

      // should reset fetching flag
      expect(state.fetching).toBe(false);

      // should not set any new values
      expect(state.error).toBe(initial.error);
    });

    it("should handle error", function () {
      // setup
      const initial = {
        ...latest(null, null),
        fetching: true,
      };

      // invoke
      const action = exchange.latest.receive(data, error);
      const state = latest(initial, action);

      // should reset fetching flag and set error
      expect(state.fetching).toBe(false);
      expect(state.error).toBe(error);

      // should not save new data if error
      expect(state.base).toBe(initial.base);
      expect(state.rates).toBe(initial.rates);
      expect(state.updatedAt).toBe(initial.updatedAt);
    });

    it("should not previous values on error", function () {
      // setup
      const {...initial} = latest(null, exchange.latest.receive(data, null));

      // invoke
      const action = exchange.latest.receive(data, error);
      const state = latest(initial, action);

      // previous values should stay the same
      expect(state.base).toBe(initial.base);
      expect(state.rates).toBe(initial.rates);
      expect(state.updatedAt).toBe(initial.updatedAt);
    });
  });
});
