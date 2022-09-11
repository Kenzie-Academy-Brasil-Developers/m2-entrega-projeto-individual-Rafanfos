class DashboardUser {
  static verification() {
    const body = document.querySelector("body");
    const token = localStorage.getItem("@QubitCompany:token") || "";

    body.classList.add("forbidden");

    if (!token) {
      window.location.replace("../../index.html");
    } else {
      body.classList.toggle("forbidden");
    }
  }
}
