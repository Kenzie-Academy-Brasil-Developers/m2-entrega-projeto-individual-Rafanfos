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
    const registerResp = await fetch(`${this.baseUrl}auth/register/user`, {
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
}
