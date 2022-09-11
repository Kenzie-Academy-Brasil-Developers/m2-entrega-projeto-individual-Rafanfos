export class ApiRequests {
  static token = localStorage.getItem("@QubitCompany:token") || "";
  static baseUrl = "http://localhost:6280/";
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
        console.log(resp);

        if (resp.uuid) {
          return this.loginRequest(loginBody);
        }
      })
      .catch((erro) => console.log(erro));
  }

  static async loginRequest(body) {
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

          if (resp.is_admin) {
            window.location.replace("./src/pages/dashboardAdmin.html");
          } else {
            window.location.replace("./src/pages/dashboardUser.html");
          }
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
        console.log(resp);
      })
      .catch((erro) => console.log(erro));
  }

  static async getUsers() {
    await fetch(`${this.baseUrl}users`, {
      method: "GET",
      headers: this.headers,
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((erro) => console.log(erro));
  }

  static async createDepartmentRequest(body) {
    await fetch(`${this.baseUrl}departments`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        debugger;
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
        console.log(resp);
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
        console.log(resp);
      })
      .catch((erro) => console.log(erro));
  }
}
