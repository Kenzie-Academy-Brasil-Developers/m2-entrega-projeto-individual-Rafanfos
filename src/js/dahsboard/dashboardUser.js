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
    const workDepartment = await ApiRequests.getEmployeesDepartment();

    const workCompany = companies.filter(
      ({ uuid }) => uuid == workDepartment[0].company_uuid
    )[0];

    console.log(workDepartment[0].users);

    const main = document.querySelector("main");

    const greetings = document.createElement("h1");
    const company = document.createElement("h2");
    const department = document.createElement("h2");
    const team = document.createElement("h2");
    const employeesList = document.createElement("ul");
    const editInformation = document.createElement("button");

    greetings.classList.add("grey1");
    greetings.classList.add("title1");
    company.classList.add("grey1");
    company.classList.add("text1");
    department.classList.add("grey1");
    department.classList.add("text1");
    team.classList.add("grey1");
    team.classList.add("text1");
    employeesList.classList.add("employees_list");
    editInformation.classList.add("button");
    editInformation.classList.add("white");
    editInformation.classList.add("edit_information");

    greetings.innerText = `Bem vindo ${logged.username}!`;
    team.innerText = `Equipe:`;
    editInformation.innerText = "Editar informações pessoais";

    if (workCompany) {
      company.innerText = `Trabalha em: ${workCompany.name}`;

      department.innerText = `No departamento: ${workDepartment[0].name}`;
      workDepartment[0].users.forEach(
        ({ username, professional_level, kind_of_work }) => {
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

          userName.innerText = username;
          kindOfWork.innerText = `Regime: ${kind_of_work}`;
          profLevel.innerText = `Nível: ${professional_level}`;

          user.append(userName, profLevel, kindOfWork);
          employeesList.append(user);
        }
      );
    } else {
      company.innerText = `Você não foi contratado ainda :(`;
    }

    main.append(
      greetings,
      company,
      department,
      team,
      employeesList,
      editInformation
    );

    this.openInformations();
  }

  static openInformations() {
    const editInformation = document.querySelector(".edit_information");
    const modal = document.querySelector(".modal-wrapper");
    const inputUsername = document.querySelector("#username");
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");

    editInformation.addEventListener("click", async () => {
      modal.classList.toggle("hidden");

      const logged = await ApiRequests.getUserProfile();

      inputUsername.value = logged.username;
      inputEmail.value = logged.email;

      this.upgradeInformations();
    });
  }

  static async upgradeInformations() {
    const upgradeButton = document.querySelector("#upgrade-button");
    const inputUsername = document.querySelector("#username");
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");

    upgradeButton.addEventListener("click", async (event) => {
      event.preventDefault;

      const body = {
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value,
      };

      await ApiRequests.upgradeUserData(body);
    });
  }

  static closeModal() {
    const close = document.querySelector("#close_upgrade");
    const modal = document.querySelector(".modal-wrapper");

    close.addEventListener("click", () => {
      modal.classList.toggle("hidden");
    });
  }
}

DashboardUser.verification();
DashboardUser.logout();
DashboardUser.renderUserDashboard();
DashboardUser.closeModal();
