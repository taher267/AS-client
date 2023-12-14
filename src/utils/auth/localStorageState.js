class CredeltialsState {
  state;
  constructor() {
    if (typeof window !== "undefined") {
      this.state = window.localStorage;
    }
  }

  //Token
  getAccessToken() {
    return this.state.getItem("pzatd-accessToken");
  }
  getRefreshToken() {
    return this.state.getItem("pzatd-refreshToken");
  }
  setAccessToken(accessToken) {
    return this.state.setItem("pzatd-accessToken", accessToken);
  }
  setRefreshToken(refreshToken) {
    return this.state.setItem("pzatd-refreshToken", refreshToken);
  }
  deleteAccessToken() {
    this.state.removeItem("pzatd-accessToken");
  }
  deleteRefreshToken() {
    this.state.removeItem("pzatd-refreshToken");
  }
  removeBoth() {
    this.deleteAccessToken();
    this.deleteRefreshToken();
  }
  clear() {
    this.clear();
  }
}

export default new CredeltialsState();
// deleteCookie("cmbs-accessToken");
