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
        this.openCompanies();
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
        this.openCompanies();
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
        const searchCompany = document.createElement("li");
        const filterBySector = document.createElement("li");
        const returnMain = document.createElement("li");

        createCompany.classList.add("grey2");
        createCompany.classList.add("text2");
        createCompany.classList.add("button");
        listCompanies.classList.add("grey2");
        listCompanies.classList.add("text2");
        listCompanies.classList.add("button");
        searchCompany.classList.add("grey2");
        searchCompany.classList.add("text2");
        searchCompany.classList.add("button");
        filterBySector.classList.add("grey2");
        filterBySector.classList.add("text2");
        filterBySector.classList.add("button");
        returnMain.classList.add("grey2");
        returnMain.classList.add("text2");
        returnMain.classList.add("button");

        createCompany.id = "create_company";
        listCompanies.id = "list_companies";
        searchCompany.id = "search_company";
        filterBySector.id = "filterBySector";
        returnMain.id = "return_main";

        createCompany.innerText = "Criar Empresa";
        listCompanies.innerText = "Listar Empresas";
        searchCompany.innerText = "Buscar Empresa";
        filterBySector.innerText = "Filtrar por setor";
        returnMain.innerText = "Voltar";

        actionsList.append(
          createCompany,
          listCompanies,
          searchCompany,
          filterBySector,
          returnMain
        );
        this.createCompanyForm();
        this.listCompanies();
        this.searchCompanyForm();
        this.returnMain();
      }, 3000);
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
        const openingHours = document.createElement("div");
        const openingHoursTitle = document.createElement("label");
        const openingHoursContent = document.createElement("select");
        const companyDescription = document.createElement("input");
        const companySector = document.createElement("div");
        const companySectorTitle = document.createElement("label");
        const companySectorContent = document.createElement("select");
        const createButton = document.createElement("button");

        companyForm.id = "company_form";
        companyName.id = "company_name";
        openingHoursContent.id = "opening_hours";
        companySectorContent.id = "company_sector";
        companyDescription.id = "company_description";
        createButton.id = "create_company_button";

        companyForm.classList.add("admin-form");
        companyCreationTitle.classList.add("title2");
        companyCreationTitle.classList.add("white");
        openingHoursTitle.classList.add("white");
        companySectorTitle.classList.add("white");

        companySector.classList.add("div-form");
        openingHours.classList.add("div-form");
        createButton.classList.add("button");
        createButton.classList.add("grey1");

        companyCreationTitle.innerText = "Cadastro de empresa";
        companySectorTitle.innerText = "Setor:";
        openingHoursTitle.innerText = "Horário de funcionamento:";
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

          openingHoursContent.append(hoursOption);
          openingHours.append(openingHoursTitle, openingHoursContent);
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
          openingHours,
          companyDescription,
          companySector,
          createButton
        );

        actions.append(companyForm);

        this.createCompany();
      }, 2000);
    });
  }

  static async createCompany() {
    const sectors = await ApiRequests.getSectors();
    const companyName = document.querySelector("#company_name");
    const companyDescription = document.querySelector("#company_description");
    const openingHours = document.querySelector("#opening_hours");
    const companySector = document.querySelector("#company_sector");
    const createCompanyButton = document.querySelector(
      "#create_company_button"
    );

    createCompanyButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const sectorselected = companySector.value;

      const uuidSelected = sectors.filter(
        ({ description }) => description == sectorselected
      )[0].uuid;

      const body = {
        name: companyName.value,
        opening_hours: openingHours.value,
        description: companyDescription.value,
        sector_uuid: uuidSelected,
      };

      await ApiRequests.createNewCompany(body);
    });
  }

  static async listCompanies() {
    const companies = await ApiRequests.companiesRequest();
    const presentation = document.querySelector("#presentation");
    const listCompanies = document.querySelector("#list_companies");
    const actions = document.querySelector(".actions");

    listCompanies.addEventListener("click", () => {
      setTimeout(() => {
        presentation.innerText = "Empresas parceiras";

        actions.innerHTML = "";

        const companiesList = document.createElement("ul");
        companiesList.classList.add("companies_list");
        const returnButton = document.createElement("button");

        returnButton.classList.add("button");
        returnButton.classList.add("white");
        returnButton.id = "return_menu";
        returnButton.innerText = "Voltar";

        companies.forEach(async ({ uuid, name, opening_hours, sectors }) => {
          const card = document.createElement("li");
          const companyName = document.createElement("h3");
          const departmentsTitle = document.createElement("h4");
          const departmentsList = document.createElement("ul");
          const employersTitle = document.createElement("h4");
          const employersList = document.createElement("ul");
          const openingHours = document.createElement("span");
          const companySector = document.createElement("span");

          card.classList.add("card3");
          companyName.classList.add("title3");
          companyName.classList.add("grey1");
          departmentsTitle.classList.add("grey1");
          departmentsTitle.classList.add("text1");
          employersTitle.classList.add("grey1");
          employersTitle.classList.add("text1");
          openingHours.classList.add("text2");
          companySector.classList.add("text2");

          companyName.innerText = name;
          departmentsTitle.innerText = "Departamentos";
          employersTitle.innerText = "Empregados";
          openingHours.innerText = `Horário de funcionamento: ${opening_hours}h`;
          companySector.innerText = `Setor: ${sectors.description}`;

          const departments = await ApiRequests.listCompanyDepartments(uuid);

          if (departments.length > 0) {
            departments.forEach(({ name, description }) => {
              const littleCard = document.createElement("li");
              const departmentName = document.createElement("span");
              const departmentDescription = document.createElement("p");

              departmentName.classList.add("text1");
              departmentName.classList.add("grey1");
              departmentDescription.classList.add("text2");
              departmentDescription.classList.add("grey1");

              departmentName.innerText = name;
              departmentDescription.innerText = description;

              littleCard.append(departmentName, departmentDescription);
            });

            const users = await ApiRequests.getUsers();
            const employers = [];

            departments.forEach((uuid) => {
              const filtered = users.filter(
                ({ department_uuid }) => department_uuid == uuid
              );

              filtered.forEach((employer) => {
                employers.push(employer);
              });
            });
          }
          card.append(
            companyName,
            departmentsTitle,
            departmentsList,
            employersTitle,
            employersList,
            openingHours,
            companySector
          );
          companiesList.append(card);
          actions.append(companiesList, returnButton);
          this.returnToMenu2();
        });
      }, 2000);
    });
  }
  static returnToMenu2() {
    const returnMenu = document.querySelector("#return_menu");
    const presentation = document.querySelector("#presentation");
    const actionsArea = document.querySelector(".actions");

    returnMenu.addEventListener("click", () => {
      setTimeout(() => {
        actionsArea.innerHTML = "";

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
        companies.id = "company_button";
        departments.id = "departments_button";

        presentation.innerText = "Navegue entre as opções abaixo";
        sectors.innerText = "Setores";
        companies.innerText = "Empresas";
        departments.innerText = "Departamentos";

        actionsList.append(sectors, companies, departments);
        actionsArea.append(actionsList);

        returnMenu.remove();

        this.openSectors();
        this.openCompanies();
      }, 2000);
    });
  }

  static searchCompanyForm() {
    const actionArea = document.querySelector(".actions");
    const presentation = document.querySelector("#presentation");
    const searchCompany = document.querySelector("#search_company");

    searchCompany.addEventListener("click", () => {
      setTimeout(() => {
        presentation.innerText = "Pesquise abaixo a empresa que deseja:";

        actionArea.innerHTML = "";

        const searchForm = document.createElement("form");
        const input = document.createElement("input");

        searchForm.classList.add("admin-form");

        searchForm.id = "search_form";

        input.id = "company_name";

        input.placeholder = "Digite o nome da empresa";

        searchForm.append(input);
        actionArea.append(searchForm);

        this.listCompany();
      }, 2000);
    });
  }

  static async listCompany() {
    const searchForm = document.querySelector("#search_form");
    const companyNameInput = document.querySelector("#company_name");
    const companies = await ApiRequests.companiesRequest();
    const companyArea = document.createElement("div");
    companyNameInput.addEventListener("input", (event) => {
      companyArea.innerHTML = "";
      console.log(companyNameInput.value);

      const listed = companies.filter((element) =>
        element.name.toLowerCase().includes(event.target.value.toLowerCase())
      )[0];

      console.log(listed);

      const card = document.createElement("div");
      const companyName = document.createElement("h3");
      const companySector = document.createElement("span");
      const companyDescription = document.createElement("p");

      card.classList.add("card1");
      companyName.classList.add("title3");
      companyName.classList.add("grey1");
      companySector.classList.add("text3");
      companyDescription.classList.add("text2");
      companyDescription.classList.add("grey1");

      companyName.innerText = listed.name;
      companySector.innerText = listed.sectors.description;
      companyDescription.innerText = listed.description;

      card.append(companyName, companySector, companyDescription);
      companyArea.append(card);
      searchForm.append(companyArea);
    });
  }
}

Dashboard.openSectors();
Dashboard.verification();
Dashboard.logout();
Dashboard.openCompanies();
