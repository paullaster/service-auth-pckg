class AuthService {
  constructor() {
    this.obj = {
      token: `${process.env.VUE_APP_NAME}_token`,
      user: `${process.env.VUE_APP_NAME}_user`,
      // company: `${process.env.VUE_APP_NAME}_company`
    };
    this.token = window.localStorage.getItem(this.obj.token);
    this.user = JSON.parse(window.localStorage.getItem(this.obj.user));
    // this.company = JSON.parse(window.localStorage.getItem(this.obj.company))
  }

  check() {
    return !!this.token;
  }

  token() {
    return !!this.token;
  }

  user() {
    return !!this.user;
  }

  // company () {
  //   return !!this.company
  // }

  logout() {
    window.localStorage.removeItem(this.obj.token);
    window.localStorage.removeItem(this.obj.user);
    location.reload();
  }

  login({ token, user }) {
    window.localStorage.setItem(this.obj.token, token);
    window.localStorage.setItem(this.obj.user, JSON.stringify(user));
    this.token = token;
    this.user = user;
    // this.setCompany(user.company)
    window.location = "/";
  }

  setUser(user) {
    window.localStorage.removeItem(this.obj.user);
    window.localStorage.setItem(this.obj.user, JSON.stringify(user));
    this.user = user;
    // this.setCompany(user.company)
    location.reload();
  }

  setUserOTP(user) {
    window.localStorage.removeItem(this.obj.user);
    window.localStorage.setItem(this.obj.user, JSON.stringify(user));
    this.user = user;
  }

  // setCompany (company) {
  //   window.localStorage.removeItem(this.obj.company)
  //   window.localStorage.setItem(this.obj.company, JSON.stringify(company))
  //   this.company = company
  // }
}

export default new AuthService();
