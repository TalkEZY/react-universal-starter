/** @flow */

function layoutMobile(isMobile: boolean) {
  return {
    type: "LAYOUT_MOBILE",
    data: isMobile,
  };
}

export {
  layoutMobile,
};
