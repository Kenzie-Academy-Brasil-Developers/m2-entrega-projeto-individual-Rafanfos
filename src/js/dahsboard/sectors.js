import { ApiRequests } from "../requests.js";
import { Companies } from "./companies.js";
import { DashboardAdmin } from "./dashboardAdmin.js";
import { Departments } from "./departments.js";

export class Sectors {
  static openSectors() {
    const sectorsButton = document.querySelector("#sectors_button");
    const actionsList = document.querySelector("#actions_list");

    sectorsButton.addEventListener("click", () => {
      setTimeout(() => {
        actionsList.innerHTML = "";

        const listSectors = document.createElement("li");
        const returnMain = document.createElement("li");

        listSectors.classList.add("grey2");
        listSectors.classList.add("text2");
        listSectors.classList.add("button");
        returnMain.classList.add("grey2");
        returnMain.classList.add("text2");
        returnMain.classList.add("button");

        listSectors.id = "list_sectors";
        returnMain.id = "return_main";

        listSectors.innerText = "Listar setores";
        returnMain.innerText = "Voltar";

        actionsList.append(listSectors, returnMain);

        this.listSectors();
        this.returnMain();
      }, 2000);
    });
  }

  static async returnMain() {
    const returnMain = document.querySelector("#return_main");
    const actionsList = document.querySelector("#actions_list");

    DashboardAdmin.createMenu(returnMain, actionsList);
  }

  static async listSectors() {
    const sectors = await ApiRequests.getSectors();
    const presentation = document.querySelector("#presentation");
    const sectorsButton = document.querySelector("#list_sectors");
    const actions = document.querySelector(".actions");
    const actionsList = document.querySelector("#actions_list");

    const returnButton = document.createElement("button");

    returnButton.classList.add("button");
    returnButton.classList.add("white");
    returnButton.id = "return_menu";
    returnButton.innerText = "Voltar";

    sectorsButton.addEventListener("click", () => {
      setTimeout(() => {
        actionsList.innerHTML = "";

        sectors.forEach(({ description }) => {
          const card = document.createElement("li");
          const name = document.createElement("span");
          const img = document.createElement("img");

          card.classList.add("card2");
          name.classList.add("text2");
          name.classList.add("grey2");

          actions.classList.replace("actions", "sectors");

          actionsList.id = "sector_list";

          name.id = `name_${description}`;
          img.id = `image_${description}`;

          name.innerText = description;
          presentation.innerText =
            " Atualmente trabalhamos com os seguintes setores:";

          img.src = `../assets/icons/${description}_icon.png`;

          card.append(name, img);

          actionsList.append(card);
        });
        actions.append(returnButton);
        this.returnToMenu();
      }, 2000);
    });
  }

  static returnToMenu() {
    const returnMenu = document.querySelector("#return_menu");
    const presentation = document.querySelector("#presentation");
    const sectorsArea = document.querySelector(".sectors");
    const sectorList = document.querySelector("#sector_list");

    returnMenu.addEventListener("click", () => {
      setTimeout(() => {
        sectorList.innerHTML = "";

        const sectors = document.createElement("li");
        const companies = document.createElement("li");
        const departments = document.createElement("li");

        sectorsArea.classList.replace("sectors", "actions");

        sectors.classList.add("grey2");
        sectors.classList.add("text2");
        sectors.classList.add("button");
        companies.classList.add("grey2");
        companies.classList.add("text2");
        companies.classList.add("button");
        departments.classList.add("grey2");
        departments.classList.add("text2");
        departments.classList.add("button");

        sectorList.id = "actions_list";
        sectors.id = "sectors_button";
        companies.id = "companies_button";
        departments.id = "departments_button";

        presentation.innerText = "Navegue entre as opções abaixo";
        sectors.innerText = "Setores";
        companies.innerText = "Empresas";
        departments.innerText = "Departamentos";

        sectorList.append(sectors, companies, departments);

        returnMenu.remove();

        this.openSectors();
        Companies.openCompanies();
        Departments.openDepartments();
      }, 2000);
    });
  }
}

Sectors.openSectors();
