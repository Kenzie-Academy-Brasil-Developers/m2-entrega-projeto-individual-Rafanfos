import { ApiRequests } from "../requests.js";

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

  static logout() {
    const logout = document.querySelector("#logout");

    logout.addEventListener("click", () => {
      localStorage.clear();

      window.location.replace("../../index.html");
    });
  }

  static async renderUserDashboard() {
    const companies = await ApiRequests.companiesRequest();
    const logged = await ApiRequests.getUserProfile();
    const employers = await ApiRequests.getEmployersDepartment();

    const workCompany = companies.filter(
      ({ uuid }) => uuid == employers.department_uuid
    )[0];

    console.log(workCompany);

    const main = document.querySelector("main");

    const greetings = document.createElement("h1");
    const company = document.createElement("h2");
    const department = document.createElement("h2");
    const employersList = document.createElement("ul");
    const editInformation = document.createElement("button");

    greetings.classList.add("grey1");
    greetings.classList.add("title1");
    company.classList.add("grey1");
    company.classList.add("title2");
    department.classList.add("grey1");
    department.classList.add("title2");
    editInformation.classList.add("button");
    editInformation.classList.add("white");
    editInformation.classList.add("edit_information");

    greetings.innerText = `Bem vindo ${logged.username}`;
    editInformation.innerText = "Editar informações";

    if (workCompany) {
      company.innerText = workCompany.name;

      employers.forEach(() => {
        const user = document.createElement("li");
        const userName = document.createElement("h3");
        const kindOfWork = document.createElement("span");
        const profLevel = document.createElement("span");

        user.classList.add("card4");
        userName.classList.add("white");
        userName.classList.add("title3");
        kindOfWork.classList.add("white");
        kindOfWork.classList.add("text2");
        profLevel.classList.add("white");
        profLevel.classList.add("text2");
      });
    } else {
      company.innerText = "Não trabalha em nenhuma empresa parceira";
      department.innerText = "Não trabalha em nenhum departamento";
      employersList.innerText = "Não possui colegas de trabalho";
    }

    main.append(greetings, company, department, employersList, editInformation);
  }
}

DashboardUser.verification();
DashboardUser.logout();
DashboardUser.renderUserDashboard();
