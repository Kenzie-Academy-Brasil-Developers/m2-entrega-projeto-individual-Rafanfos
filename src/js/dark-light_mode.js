class DarkLight {
  static handleDarkMode() {
    const modeButton = document.querySelector(".mode-button");
    const html = document.querySelector("html");

    modeButton.addEventListener("click", () => {
      html.classList.toggle("dark-mode");
      DarkLight.changeModeBtn();
    });
  }

  static changeModeBtn() {
    const modeButton = document.querySelector(".mode-button");
    const html = document.querySelector("html");

    if (html.classList.contains("dark-mode")) {
      modeButton.innerText = "Light Mode";
    } else {
      modeButton.innerText = "Dark Mode";
    }
  }
}

DarkLight.handleDarkMode();
DarkLight.changeModeBtn();
