import { ApiRequests } from "./requests.js";

export class Login {
  static openLogin() {
    const login = document.querySelector("#login");
    const modal = document.querySelector(".login");

    login.addEventListener("click", () => {
      modal.classList.toggle("hidden");
    });
  }

  static closeLogin() {
    const close = document.querySelector("#close-login");
    const modal = document.querySelector(".login");

    close.addEventListener("click", () => {
      modal.classList.toggle("hidden");
    });
  }

  static CreateLogin() {
    const loginButton = document.querySelector("#login-button");
    const email = document.querySelector("#login_email");
    const password = document.querySelector("#login_password");

    loginButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const body = {
        email: email.value,
        password: password.value,
      };

      await ApiRequests.loginRequest(body);
    });
  }
}

Login.openLogin();
Login.closeLogin();
Login.CreateLogin();