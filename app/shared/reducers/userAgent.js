/** @flow */
function userAgent(state: string = "") {
  if (!state && typeof navigator !== "undefined") {
    return navigator.userAgent;
  }

  return state;
}

export default userAgent;
