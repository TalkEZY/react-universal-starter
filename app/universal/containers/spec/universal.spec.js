import React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { TestMode } from "radium";
import Universal from "../universal";

TestMode.enable();

const reducer = (state = {}) => {
  return state;
};

describe("<Universal />", () => {
  it("renders a top choice header with a bookmark and a link", () => {
    const wrapper = shallow(
      <Universal store={createStore(reducer)} />
    );

    const rendered = wrapper.html();

    expect(rendered.match(/Universal render/).length).toEqual(1);
  });
});
