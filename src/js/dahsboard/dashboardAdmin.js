import { Companies } from "./companies.js";
import { Departments } from "./departments.js";
import { Sectors } from "./sectors.js";

export class DashboardAdmin {
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

  static logout() {
    const logout = document.querySelector("#logout");

    logout.addEventListener("click", () => {
      localStorage.clear();

      window.location.replace("../../index.html");
    });
  }

  static createMenu(button, area) {
    button.addEventListener("click", () => {
      setTimeout(() => {
        area.innerHTML = "";

        const actionsList = document.createElement("ul");
        const sectors = document.createElement("li");
        const companies = document.createElement("li");
        const departments = document.createElement("li");

        sectors.classList.add("grey2");
        sectors.classList.add("text2");
        sectors.classList.add("button");
        companies.classList.add("grey2");
        companies.classList.add("text2");
        companies.classList.add("button");
        departments.classList.add("grey2");
        departments.classList.add("text2");
        departments.classList.add("button");

        actionsList.id = "actions_list";
        sectors.id = "sectors_button";
        companies.id = "companies_button";
        departments.id = "departments_button";

        sectors.innerText = "Setores";
        companies.innerText = "Empresas";
        departments.innerText = "Departamentos";

        actionsList.append(sectors, companies, departments);
        area.append(actionsList);

        Sectors.openSectors();
        Companies.openCompanies();
        Departments.openDepartments();
      }, 1000);
    });
  }

  static async returnMain2() {
    const returnMain2 = document.querySelector("#return_main2");
    const actionsList = document.querySelector("#actions_list");

    this.createDepartmentsMenu(returnMain2, actionsList);
  }
}

DashboardAdmin.verification();
DashboardAdmin.logout();
