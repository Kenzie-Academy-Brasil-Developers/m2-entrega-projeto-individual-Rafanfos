import { Toast } from "./toast.js";

export class ApiRequests {
  static token = localStorage.getItem("@QubitCompany:token") || "";
  static baseUrl = "http://localhost:6278/";
  static headers = {
    "Content-type": "application/json",
    Authorization: `Bearer: ${this.token}`,
  };

  static async companiesRequest() {
    const companies = await fetch(`${this.baseUrl}companies`, {})
      .then((resp) => resp.json())
      .then((resp) => {
        return resp;
      })
      .catch((erro) => console.log(erro));

    return companies;
  }

  static async filterBySector(selected) {
    const sectors = await fetch(`${this.baseUrl}companies/${selected}`)
      .then((resp) => resp.json())
      .then((resp) => {
        return resp;
      })
      .catch((erro) => console.log(erro));

    return sectors;
  }

  static async registerRequest(body) {
    const loginBody = {
      email: body.email,
      password: body.password,
    };

    const registerResp = await fetch(`${this.baseUrl}auth/register/user`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.uuid) {
          Toast.createSucess("Cadastro efetuado com sucesso!");
          setTimeout(() => {
            return this.loginRequest(loginBody, "Bem vindo!");
          }, 2000);
        } else {
          Toast.createError("Insira dados válidos!");
        }
      })
      .catch((erro) => console.log(erro));
  }

  static async loginRequest(body, msg) {
    const loginResp = await fetch(`${this.baseUrl}auth/login`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.token !== undefined) {
          localStorage.setItem("@QubitCompany:token", resp.token);
          localStorage.setItem("@QubitCompany:uuid", resp.uuid);

          Toast.createSucess(msg);

          setTimeout(() => {
            if (resp.is_admin) {
              window.location.replace("./src/pages/dashboardAdmin.html");
            } else {
              window.location.replace("./src/pages/dashboardUser.html");
            }
          }, 2000);
        } else {
          Toast.createError("Usuário não existente, dados inválidos!");
        }
      })
      .catch((erro) => console.log(erro));
  }

  static async getSectors() {
    const sectors = await fetch(`${this.baseUrl}sectors`, {
      method: "GET",
      headers: this.headers,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        return resp;
      })
      .catch((erro) => console.log(erro));

    return sectors;
  }

  static async createNewCompany(body) {
    await fetch(`${this.baseUrl}companies/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.error) {
          Toast.createError("Preencha todos os campos!");
        } else {
          Toast.createSucess(`${body.name} criada com sucesso!`);
        }
      })
      .catch((erro) => console.log(erro));
  }

  static async getUsers() {
    const users = await fetch(`${this.baseUrl}users`, {
      method: "GET",
      headers: this.headers,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        return resp;
      })
      .catch((erro) => console.log(erro));

    return users;
  }

  static async createDepartmentRequest(body) {
    await fetch(`${this.baseUrl}departments`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.error) {
          Toast.createError("Preencha todos os campos!");
        } else {
          Toast.createSucess(`Departamento ${body.name.toLowerCase()} criado!`);
        }
      })
      .catch((erro) => console.log(erro));
  }

  static async allDepartments() {
    const departments = await fetch(`${this.baseUrl}departments`, {
      method: "GET",
      headers: this.headers,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        return resp;
      })
      .catch((erro) => console.log(erro));

    return departments;
  }

  static async companyDepartments(id) {
    const departments = await fetch(`${this.baseUrl}departments/${id}`, {
      method: "GET",
      headers: this.headers,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        return resp;
      })
      .catch((erro) => console.log(erro));

    return departments;
  }

  static async deleteDepartmentRequest(id) {
    await fetch(`${this.baseUrl}departments/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        Toast.createError("Departamento apagado!");
      })
      .catch((erro) => console.log(erro));
  }

  static async getWaitList() {
    const waitList = await fetch(`${this.baseUrl}admin/out_of_work`, {
      method: "GET",
      headers: this.headers,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        return resp;
      })
      .catch((erro) => console.log(erro));

    return waitList;
  }

  static async hireRequest(body) {
    await fetch(`${this.baseUrl}departments/hire/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        Toast.createSucess("Funcionário contratado!");
      })
      .catch((erro) => console.log(erro));
  }

  static async fireRequest(id) {
    await fetch(`${this.baseUrl}departments/dismiss/${id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        Toast.createError("Funcionário demitido!");
      })
      .catch((erro) => console.log(erro));
  }

  static async modifyRequest(id, body) {
    await fetch(`${this.baseUrl}admin/update_user/${id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        Toast.createSucess("Dados modificados!");
      })
      .catch((erro) => console.log(erro));
  }

  static async getEmployeesDepartment() {
    const employees = await fetch(
      `${this.baseUrl}users/departments/coworkers`,
      {
        method: "GET",
        headers: this.headers,
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        return resp;
      })
      .catch((erro) => console.log(erro));

    return employees;
  }

  static async getUserProfile() {
    const user = await fetch(`${this.baseUrl}users/profile`, {
      method: "GET",
      headers: this.headers,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        return resp;
      })
      .catch((erro) => console.log(erro));

    return user;
  }

  static async upgradeUserData(body) {
    await fetch(`${this.baseUrl}users`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.error) {
          Toast.createError("E-mail já existente, insira um e-mail novo!");
        } else {
          Toast.createSucess("Dados atualizados!");
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
}
