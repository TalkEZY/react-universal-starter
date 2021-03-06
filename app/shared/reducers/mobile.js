/** @flow */

function mobile(state: boolean = true, action: Object) {
  if (action.type === "LAYOUT_MOBILE") {
    const isMobile = action.data;

    return typeof isMobile !== "undefined" ? action.data : state;
  }

  return state;
}

export default mobile;
