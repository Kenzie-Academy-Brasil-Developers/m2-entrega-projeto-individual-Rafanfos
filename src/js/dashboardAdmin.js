import { ApiRequests } from "./requests.js";

class Dashboard {
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

  static openSectors() {
    const sectorsButton = document.querySelector("#sectors_button");
    const actionsList = document.querySelector("#actions_list");

    sectorsButton.addEventListener("click", () => {
      console.log("setores");
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

    returnMain.addEventListener("click", () => {
      setTimeout(() => {
        actionsList.innerHTML = "";

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

        sectors.id = "sectors_button";
        companies.id = "companies_button";
        departments.id = "departments_button";

        sectors.innerText = "Setores";
        companies.innerText = "Empresas";
        departments.innerText = "Departamentos";

        actionsList.append(sectors, companies, departments);

        this.openSectors();
      }, 2000);
    });
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
        companies.id = "company_button";
        departments.id = "departments_button";

        presentation.innerText = "Navegue entre as opções abaixo";
        sectors.innerText = "Setores";
        companies.innerText = "Empresas";
        departments.innerText = "Departamentos";

        sectorList.append(sectors, companies, departments);

        returnMenu.remove();

        this.openSectors();
      }, 2000);
    });
  }

  static openCompanies() {
    const companiesButton = document.querySelector("#companies_button");
    const actionsList = document.querySelector("#actions_list");

    companiesButton.addEventListener("click", () => {
      setTimeout(() => {
        actionsList.innerHTML = "";

        const createCompany = document.createElement("li");
        const listCompanies = document.createElement("li");
        const returnMain = document.createElement("li");

        createCompany.classList.add("grey2");
        createCompany.classList.add("text2");
        createCompany.classList.add("button");
        listCompanies.classList.add("grey2");
        listCompanies.classList.add("text2");
        listCompanies.classList.add("button");
        returnMain.classList.add("grey2");
        returnMain.classList.add("text2");
        returnMain.classList.add("button");

        createCompany.id = "create_company";
        listCompanies.id = "list_sectors";
        returnMain.id = "return_main";

        createCompany.innerText = "Criar Empresa";
        listCompanies.innerText = "Listar Empresas";
        returnMain.innerText = "Voltar";

        actionsList.append(createCompany, listCompanies, returnMain);
        this.createCompanyForm();
        this.returnMain();
      }, 2000);
    });
  }

  static async createCompanyForm() {
    const sectors = await ApiRequests.getSectors();
    const presentation = document.querySelector("#presentation");
    const actions = document.querySelector(".actions");
    const createCompany = document.querySelector("#create_company");

    createCompany.addEventListener("click", () => {
      setTimeout(() => {
        actions.innerHTML = "";
        presentation.innerText =
          "Preencha com as informações abaixo e solicite a criação";

        const companyCreationTitle = document.createElement("h2");
        const companyForm = document.createElement("form");
        const companyName = document.createElement("input");
        const opennningHours = document.createElement("div");
        const opennningHoursTitle = document.createElement("label");
        const opennningHoursContent = document.createElement("select");
        const companyDescription = document.createElement("input");
        const companySector = document.createElement("div");
        const companySectorTitle = document.createElement("label");
        const companySectorContent = document.createElement("select");
        const createButton = document.createElement("button");

        companyForm.id = "company_form";
        companyName.id = "company_name";
        opennningHours.id = "openning_hours";
        companyDescription.id = "company_description";
        createButton.id = "#create_button";

        companyForm.classList.add("admin-form");
        companyCreationTitle.classList.add("title2");
        companyCreationTitle.classList.add("white");
        opennningHoursTitle.classList.add("white");
        companySectorTitle.classList.add("white");

        companySector.classList.add("div-form");
        opennningHours.classList.add("div-form");
        createButton.classList.add("button");
        createButton.classList.add("grey1");

        companyCreationTitle.innerText = "Cadastro de criação de empresa";
        companySectorTitle.innerText = "Setor";
        opennningHoursTitle.innerText = "Horário de funcionamento";
        createButton.innerText = "Criar";

        companyName.placeholder = "Digite o nome da empresa";
        companyDescription.placeholder = "Digite o slogan da empresa";

        for (let hour = 1; hour <= 24; hour++) {
          const hoursOption = document.createElement("option");

          if (hour < 10) {
            hoursOption.innerText = `0${hour}:00`;
          } else {
            hoursOption.innerText = `${hour}:00`;
          }

          opennningHoursContent.append(hoursOption);
          opennningHours.append(opennningHoursTitle, opennningHoursContent);
        }

        sectors.forEach(({ description, uuid }) => {
          const sectorsOptions = document.createElement("option");
          sectorsOptions.id = uuid;
          sectorsOptions.innerText = description;

          companySectorContent.append(sectorsOptions);
        });

        companySector.append(companySectorTitle, companySectorContent);

        companyForm.append(
          companyCreationTitle,
          companyName,
          opennningHours,
          companyDescription,
          companySector,
          createButton
        );

        actions.append(companyForm);
      }, 2000);
    });
  }
}

Dashboard.openSectors();
Dashboard.verification();
Dashboard.logout();
Dashboard.openCompanies();
