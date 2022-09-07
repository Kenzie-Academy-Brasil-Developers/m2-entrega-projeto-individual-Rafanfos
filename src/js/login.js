class Login {
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
}

Login.openLogin();
Login.closeLogin();
