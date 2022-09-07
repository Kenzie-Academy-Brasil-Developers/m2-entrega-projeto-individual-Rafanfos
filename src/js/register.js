import { ApiRequests } from "./requests.js";

class Register {
  static openRegister() {
    const register = document.querySelector("#register");
    const modal = document.querySelector(".register");

    register.addEventListener("click", () => {
      modal.classList.toggle("hidden");
    });
  }

  static closeRegister() {
    const close = document.querySelector("#close-register");
    const modal = document.querySelector(".register");

    close.addEventListener("click", () => {
      modal.classList.toggle("hidden");
    });
  }

  static createRegister() {
    const registerButton = document.querySelector("#register-button");
    const username = document.querySelector("#register_username");
    const email = document.querySelector("#register_email");
    const password = document.querySelector("#register_password");
    const proflevel = document.querySelector("#register_proflevel");

    registerButton.addEventListener("click", (event) => {
      event.preventDefault();

      const body = {
        password: password.value,
        email: email.value,
        professional_level: proflevel.value.toLowerCase(),
        username: username.value,
      };

      ApiRequests.registerRequest(body);
    });
  }
}

Register.openRegister();
Register.closeRegister();
Register.createRegister();
