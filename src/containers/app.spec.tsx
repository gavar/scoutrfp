import { expect, renderWithRedux } from "$/test";
import React from "react";
import { AppConnect } from "./app";

beforeEach(function () {
  spyOn(console, "error");
});

describe("App", function () {
  it("can render with default store", function () {
    const {container} = renderWithRedux(<AppConnect/>);
    expect(container).not.toBeEmpty();
    expect(console.error).not.toHaveBeenCalled();
  });
});

