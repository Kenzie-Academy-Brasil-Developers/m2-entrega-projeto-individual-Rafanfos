import { ApiRequests } from "../requests.js";
import { DashboardAdmin } from "./dashboardAdmin.js";
import { Sectors } from "./sectors.js";

export class Companies {
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
        filterBySector.id = "filter_by_sector";
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
        this.createFilterBySector();
        this.returnMain();
      }, 3000);
    });
  }

  static async returnMain() {
    const returnMain = document.querySelector("#return_main");
    const actionsList = document.querySelector("#actions_list");

    DashboardAdmin.createMenu(returnMain, actionsList);
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
        const returnButton = document.createElement("button");

        companyForm.id = "company_form";
        companyName.id = "company_name";
        openingHoursContent.id = "opening_hours";
        companySectorContent.id = "company_sector";
        companyDescription.id = "company_description";
        createButton.id = "create_company_button";
        returnButton.id = "return_menu";

        returnButton.classList.add("button");
        returnButton.classList.add("white");
        companyForm.classList.add("admin-form");
        companyCreationTitle.classList.add("title2");
        companyCreationTitle.classList.add("white");
        openingHoursTitle.classList.add("white");
        companySectorTitle.classList.add("white");
        companySector.classList.add("div-form");
        openingHours.classList.add("div-form");
        createButton.classList.add("button");
        createButton.classList.add("grey1");
        returnButton.classList.add("button");
        returnButton.classList.add("white");

        companyCreationTitle.innerText = "Cadastro de empresa";
        companySectorTitle.innerText = "Setor:";
        openingHoursTitle.innerText = "Horário de funcionamento:";
        createButton.innerText = "Criar";
        returnButton.innerText = "Voltar";

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
          createButton,
          returnButton
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
          const employeesTitle = document.createElement("h4");
          const employeesList = document.createElement("ul");
          const openingHours = document.createElement("span");
          const companySector = document.createElement("span");

          card.classList.add("card3");
          companyName.classList.add("title3");
          companyName.classList.add("grey1");
          departmentsTitle.classList.add("grey1");
          departmentsTitle.classList.add("text1");
          departmentsList.classList.add("departments_list");
          employeesTitle.classList.add("grey1");
          employeesTitle.classList.add("text1");
          employeesList.classList.add("employees_list");
          openingHours.classList.add("text2");
          openingHours.classList.add("grey1");
          companySector.classList.add("text2");
          companySector.classList.add("grey1");

          companyName.innerText = name;
          departmentsTitle.innerText = "Departamentos";
          employeesTitle.innerText = "Empregados";
          openingHours.innerText = `Horário de funcionamento: ${opening_hours}h`;
          companySector.innerText = `Setor: ${sectors.description}`;

          companiesList.append(card);
          card.append(
            companyName,
            departmentsTitle,
            departmentsList,
            employeesTitle,
            employeesList,
            openingHours,
            companySector
          );
          const departments = await ApiRequests.companyDepartments(uuid);

          if (departments.length > 0) {
            departments.forEach(({ name, description }) => {
              const littleCard = document.createElement("li");
              const departmentName = document.createElement("span");
              const departmentDescription = document.createElement("p");

              littleCard.classList.add("card4");
              departmentName.classList.add("text1");
              departmentName.classList.add("white");
              departmentDescription.classList.add("text2");
              departmentDescription.classList.add("white");

              departmentName.innerText = name;
              departmentDescription.innerText = description;

              littleCard.append(departmentName, departmentDescription);
              departmentsList.append(littleCard);
            });

            const users = await ApiRequests.getUsers();
            const employees = [];

            departments.forEach(({ uuid }) => {
              users.forEach((user) => {
                if (user.department_uuid == uuid) {
                  employees.push(user);
                }
              });
            });

            employees.forEach(
              ({
                username,
                kind_of_work,
                professional_level,
                department_uuid,
              }) => {
                const departmentName = departments.filter(
                  ({ uuid }) => uuid == department_uuid
                )[0].name;

                const littleCard2 = document.createElement("li");
                const employeeName = document.createElement("span");
                const workDepartment = document.createElement("span");
                const kindWork = document.createElement("span");
                const profLevel = document.createElement("span");

                littleCard2.classList.add("card4");
                employeeName.classList.add("text1");
                employeeName.classList.add("white");
                workDepartment.classList.add("text2");
                workDepartment.classList.add("white");
                kindWork.classList.add("text2");
                kindWork.classList.add("white");
                profLevel.classList.add("text2");
                profLevel.classList.add("white");

                employeeName.innerText = username;
                workDepartment.innerText = `Departamento: ${departmentName}`;
                kindWork.innerText = `Regime: ${kind_of_work}`;
                profLevel.innerText = `Nível: ${professional_level} `;

                littleCard2.append(
                  employeeName,
                  profLevel,
                  workDepartment,
                  kindWork
                );
                employeesList.append(littleCard2);
              }
            );

            actions.append(companiesList, returnButton);
            this.returnToMenu2();
          }
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
        companies.id = "companies_button";
        departments.id = "departments_button";

        presentation.innerText = "Navegue entre as opções abaixo";
        sectors.innerText = "Setores";
        companies.innerText = "Empresas";
        departments.innerText = "Departamentos";

        actionsList.append(sectors, companies, departments);
        actionsArea.append(actionsList);

        returnMenu.remove();

        Sectors.openSectors();
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
        const returnButton = document.createElement("button");

        searchForm.classList.add("admin-form");
        returnButton.classList.add("button");
        returnButton.classList.add("white");

        searchForm.id = "search_form";
        returnButton.id = "return_menu";
        input.id = "company_name";

        returnButton.innerText = "Voltar";

        input.placeholder = "Digite o nome da empresa";

        searchForm.append(input);
        actionArea.append(searchForm, returnButton);

        this.listCompany();
        this.returnToMenu2();
      }, 2000);
    });
  }

  static async listCompany() {
    const searchForm = document.querySelector("#search_form");
    const companyNameInput = document.querySelector("#company_name");
    const companies = await ApiRequests.companiesRequest();
    const companyArea = document.createElement("div");
    companyArea.id = "company_area";

    companyNameInput.addEventListener("input", (event) => {
      companyArea.innerHTML = "";

      const listed = companies.filter((element) =>
        element.name.toLowerCase().includes(event.target.value.toLowerCase())
      )[0];

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

  static async createFilterBySector() {
    const companies = await ApiRequests.companiesRequest();
    const extractSectors = [];
    companies.forEach(({ sectors }) =>
      extractSectors.push(sectors.description)
    );
    const sectors = Array.from(new Set(extractSectors));

    const actions = document.querySelector(".actions");
    const filterBySector = document.querySelector("#filter_by_sector");

    filterBySector.addEventListener("click", () => {
      setTimeout(() => {
        actions.innerHTML = "";
        const filterArea = document.createElement("div");
        const filterTitle = document.createElement("label");
        const filterSector = document.createElement("select");
        const emptyOption = document.createElement("option");

        filterSector.append(emptyOption);

        sectors.forEach((sector) => {
          const filterOption = document.createElement("option");
          filterOption.innerText = sector;
          filterSector.append(filterOption);
        });

        filterSector.id = "filter_sector";

        filterArea.append(filterTitle, filterSector);
        actions.append(filterArea);
        this.filterBySector();
      }, 2000);
    });
  }

  static filterBySector() {
    const companiesArea = document.querySelector(".actions");
    const filterSector = document.querySelector("#filter_sector");
    const companiesList = document.createElement("ul");
    const returnButton = document.createElement("button");
    returnButton.classList.add("button");
    returnButton.classList.add("white");

    returnButton.id = "return_menu";
    companiesList.id = "companies";

    returnButton.innerText = "Voltar";

    companiesArea.append(companiesList, returnButton);

    filterSector.addEventListener("change", async (event) => {
      companiesList.innerHTML = "";
      const selected = event.target.value;
      const filtered = await ApiRequests.filterBySector(selected);
      this.createCompanyCards(filtered);
    });
    this.returnToMenu2();
  }

  static createCompanyCards(companies) {
    const companiesList = document.querySelector("#companies");

    companies.forEach(({ description, name, sectors }) => {
      const card = document.createElement("li");
      const companyName = document.createElement("h3");
      const companySector = document.createElement("span");
      const companyDescription = document.createElement("p");

      card.classList.add("card1");
      card.classList.add("card_filter");
      companyName.classList.add("title3");
      companyName.classList.add("grey1");
      companySector.classList.add("text3");
      companyDescription.classList.add("text2");
      companyDescription.classList.add("grey1");

      companyName.innerText = name;
      companySector.innerText = sectors.description;
      companyDescription.innerText = description;

      card.append(companyName, companySector, companyDescription);
      companiesList.append(card);
    });
  }
}

Companies.openCompanies();
