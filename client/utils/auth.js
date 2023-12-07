import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if saved token and if valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // Saves token to localStorage
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  logout() {
    // Clears token and profile data from localStorage
    localStorage.removeItem("id_token");
    // reloads the page and resets the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
