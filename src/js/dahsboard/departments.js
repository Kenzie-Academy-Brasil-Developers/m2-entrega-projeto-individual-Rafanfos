import { ApiRequests } from "../requests.js";
import { Companies } from "./companies.js";
import { Dashboard } from "./dashboardAdmin.js";
import { Sectors } from "./sectors.js";

export class Departments {
  static openDepartments() {
    const departmentsButton = document.querySelector("#departments_button");
    const actionsList = document.querySelector("#actions_list");

    this.createDepartmentsMenu(departmentsButton, actionsList);
  }

  static listDepartments() {
    const listDepartments = document.querySelector("#list_departments");
    const actionsList = document.querySelector("#actions_list");

    listDepartments.addEventListener("click", () => {
      setTimeout(() => {
        actionsList.innerHTML = "";

        const listAllDepartments = document.createElement("li");
        const searchDepartment = document.createElement("li");
        const returnMain = document.createElement("li");

        listAllDepartments.classList.add("grey2");
        listAllDepartments.classList.add("text2");
        listAllDepartments.classList.add("button");
        searchDepartment.classList.add("grey2");
        searchDepartment.classList.add("text2");
        searchDepartment.classList.add("button");
        returnMain.classList.add("grey2");
        returnMain.classList.add("text2");
        returnMain.classList.add("button");

        listAllDepartments.id = "list_all_departments";
        searchDepartment.id = "search_department";
        returnMain.id = "return_main2";

        listAllDepartments.innerText = "Listar todos";
        searchDepartment.innerText = "Buscar departamento";
        returnMain.innerText = "Voltar";

        actionsList.append(listAllDepartments, searchDepartment, returnMain);

        this.allDepartmentsForm();
        this.returnMain2();
      }, 2000);
    });
  }

  static async returnMain() {
    const returnMain = document.querySelector("#return_main");
    const actionsList = document.querySelector("#actions_list");

    Dashboard.createMenu(returnMain, actionsList);
  }

  static async returnMain2() {
    const returnMain2 = document.querySelector("#return_main2");
    const actionsList = document.querySelector("#actions_list");

    this.createDepartmentsMenu(returnMain2, actionsList);
  }

  static createDepartmentsMenu(button, area) {
    button.addEventListener("click", () => {
      setTimeout(() => {
        area.innerHTML = "";

        const createDepartmens = document.createElement("li");
        const listDepartments = document.createElement("li");
        const employers = document.createElement("li");
        const returnMain = document.createElement("li");

        createDepartmens.classList.add("grey2");
        createDepartmens.classList.add("text2");
        createDepartmens.classList.add("button");
        listDepartments.classList.add("grey2");
        listDepartments.classList.add("text2");
        listDepartments.classList.add("button");
        employers.classList.add("grey2");
        employers.classList.add("text2");
        employers.classList.add("button");
        returnMain.classList.add("grey2");
        returnMain.classList.add("text2");
        returnMain.classList.add("button");

        createDepartmens.id = "create_departments";
        listDepartments.id = "list_departments";
        employers.id = "employers";
        returnMain.id = "return_main";

        createDepartmens.innerText = "Criar departamento";
        listDepartments.innerText = "Listar departamentos";
        employers.innerText = "Funcionários";
        returnMain.innerText = "Voltar";

        area.append(createDepartmens, listDepartments, employers, returnMain);

        this.newDepartments();
        this.listDepartments();
        this.returnMain();
      }, 2000);
    });
  }

  static async newDepartments() {
    const companies = await ApiRequests.companiesRequest();
    const createDepartments = document.querySelector("#create_departments");
    const presentation = document.querySelector("#presentation");
    const actions = document.querySelector(".actions");

    createDepartments.addEventListener("click", () => {
      setTimeout(() => {
        presentation.innerText =
          "Preencha o formulário abaixo para criar um departamento em uma empresa:";
        actions.innerHTML = "";

        const createDepartmentForm = document.createElement("form");
        const formTitle = document.createElement("h3");
        const filterCompanyArea = document.createElement("div");
        const filterCompanyTitle = document.createElement("label");
        const filterCompany = document.createElement("select");
        const emptyOption = document.createElement("option");
        const departmentName = document.createElement("input");
        const departmentDescription = document.createElement("input");
        const createButton = document.createElement("button");
        const returnButton = document.createElement("button");

        filterCompany.append(emptyOption);

        companies.forEach(({ name }) => {
          const companyOption = document.createElement("option");
          companyOption.innerText = name;
          companyOption.classList.add("text3");
          filterCompany.append(companyOption);
        });

        createDepartmentForm.classList.add("admin-form");
        filterCompanyArea.classList.add("div-form");
        filterCompanyTitle.classList.add("white");
        createButton.classList.add("button");
        createButton.classList.add("grey1");
        returnButton.classList.add("button");
        returnButton.classList.add("white");
        returnButton.classList.add("return_menu");

        departmentName.placeholder = "Digite o nome do departamento";
        departmentDescription.placeholder = "Digite a descrição";

        filterCompany.addEventListener("input", () => {
          const companyselelected = filterCompany.value;
          const companyId = companies.filter(
            (company) => companyselelected == company.name
          )[0].uuid;
          filterCompany.id = companyId;
        });

        departmentName.id = "department_name";
        departmentDescription.id = "department_description";
        createButton.id = "create_department_button";
        returnButton.id = "return_main";

        filterCompanyTitle.innerText = "Empresa:";
        createButton.innerText = "Criar";
        returnButton.innerText = "Voltar";

        filterCompanyArea.append(filterCompanyTitle, filterCompany);
        createDepartmentForm.append(
          formTitle,
          filterCompanyArea,
          departmentName,
          departmentDescription,
          createButton,
          returnButton
        );

        actions.append(createDepartmentForm);
        this.createDepartment();
        this.returnMain();
      }, 2000);
    });
  }

  static async createDepartment() {
    const filterCompany = document.querySelector("select");
    const departmentName = document.querySelector("#department_name");
    const departmentDescription = document.querySelector(
      "#department_description"
    );
    const createButton = document.querySelector("#create_department_button");

    createButton.addEventListener("click", async (event) => {
      event.preventDefault();
      setTimeout(async () => {
        const companyId = filterCompany.id;

        const body = {
          name: departmentName.value,
          description: departmentDescription.value,
          company_uuid: companyId,
        };

        await ApiRequests.createDepartmentRequest(body);
      }, 2000);
    });
  }

  static async allDepartmentsForm() {
    const companies = await ApiRequests.companiesRequest();
    const listAllDepartments = document.querySelector("#list_all_departments");
    const presentation = document.querySelector("#presentation");
    const actions = document.querySelector(".actions");

    listAllDepartments.addEventListener("click", async () => {
      setTimeout(async () => {
        presentation.innerText =
          "Selecione uma empresa para listar todos seus departamentos";
        actions.innerHTML = "";

        const allDepartamentsForm = document.createElement("form");
        const filterCompanyArea = document.createElement("div");
        const filterCompanyTitle = document.createElement("label");
        const filterCompany = document.createElement("select");
        const emptyOption = document.createElement("option");
        const filterDepartmentArea = document.createElement("div");
        const filterdepartmentTitle = document.createElement("label");
        const filterDepartment = document.createElement("select");
        const returnButton = document.createElement("button");
        const departmentsList = document.createElement("ul");

        allDepartamentsForm.classList.add("admin-form");
        filterCompanyArea.classList.add("div-form");
        filterCompanyTitle.innerText = "Empresa";
        filterdepartmentTitle.innerText = "Departamento";

        filterCompanyTitle.classList.add("white");
        filterdepartmentTitle.classList.add("white");
        returnButton.classList.add("button");
        returnButton.classList.add("white");
        returnButton.classList.add("return_menu");

        departmentsList.id = "departments_list";
        returnButton.id = "return_main";
        returnButton.innerText = "Voltar";

        filterCompany.append(emptyOption);

        companies.forEach(({ name }) => {
          const companyOption = document.createElement("option");
          companyOption.innerText = name;
          companyOption.classList.add("text3");
          filterCompany.append(companyOption);
        });

        filterCompany.addEventListener("input", async () => {
          const companyselelected = filterCompany.value;
          const companyId = companies.filter(
            (company) => companyselelected == company.name
          )[0].uuid;
          filterCompany.id = companyId;
        });

        filterCompanyArea.append(filterCompanyTitle, filterCompany);
        filterDepartmentArea.append(filterdepartmentTitle, filterDepartment);

        allDepartamentsForm.append(
          filterCompanyArea,
          departmentsList,
          returnButton
        );

        actions.append(allDepartamentsForm);

        this.returnMain();
        this.listCompanyDepartments();
      }, 2000);
    });
  }

  static async listCompanyDepartments() {
    const company = document.querySelector("select");
    const departmentsList = document.querySelector("#departments_list");

    company.addEventListener("input", async () => {
      departmentsList.innerHTML = "";
      const companyId = company.id;
      const departments = await ApiRequests.companyDepartments(companyId);

      departments.forEach(({ name, description, uuid }) => {
        const departmentCard = document.createElement("li");
        const departmentName = document.createElement("h3");
        const departmentDescription = document.createElement("span");
        const deleteButton = document.createElement("button");

        departmentCard.classList.add("card1");
        departmentName.classList.add("title3");
        departmentDescription.classList.add("text2");
        deleteButton.classList.add("button");
        deleteButton.classList.add("white");
        deleteButton.classList.add("delete_button");

        departmentName.innerText = name;
        departmentDescription.innerText = description;
        deleteButton.innerText = "Apagar";

        deleteButton.id = uuid;

        departmentCard.append(
          departmentName,
          departmentDescription,
          deleteButton
        );
        departmentsList.append(departmentCard);

        this.deleteDepartment();
      });
    });
  }

  static deleteDepartment() {
    const departmentsList = document.querySelector("#departments_list");

    departmentsList.addEventListener("click", async (event) => {
      event.preventDefault();
      const clicked = event.target;

      if (clicked.tagName == "BUTTON") {
        const id = clicked.id;
        this.openDeleteModal(id);
      }
    });
  }

  static openDeleteModal(id) {
    const deleteButton = document.querySelector(".delete_button");
    const modal = document.querySelector(".delete_verification");

    deleteButton.addEventListener("click", () => {
      this.closeModal();

      modal.classList.toggle("hidden");

      const yes = document.querySelector(".yes");
      const no = document.querySelector(".no");

      yes.addEventListener("click", async () => {
        await ApiRequests.deleteDepartmentRequest(id);
      });

      no.addEventListener("click", () => {
        modal.classList.toggle("hidden");
      });
    });
  }

  static closeModal() {
    const close = document.querySelector(".close");
    const modal = document.querySelector(".delete_verification");

    close.addEventListener("click", () => {
      modal.classList.toggle("hidden");
    });
  }
}

Departments.openDepartments();
