import { ApiRequests } from "./requests.js";

class HomePage {
  static async getCompanies() {
    const companies = await ApiRequests.companiesRequest();
    console.log(companies);
    this.createCompanyCards(companies);
  }

  static createCompanyCards(companies) {
    const companiesList = document.querySelector("#companies");
    companiesList.innerHTML = "";

    companies.forEach(({ description, name, sectors }) => {
      const card = document.createElement("li");
      const companyName = document.createElement("h3");
      const companySector = document.createElement("span");
      const companyDescription = document.createElement("p");

      card.classList.add("card");
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

  static async getSectors() {
    const companies = await ApiRequests.companiesRequest();
    const extractSectors = [];
    companies.forEach(({ sectors }) =>
      extractSectors.push(sectors.description)
    );
    const sectors = Array.from(new Set(extractSectors));

    this.listSectors(sectors);
  }

  static async listSectors(sectors) {
    const filter = document.querySelector("#sector_filter");

    sectors.forEach((sector) => {
      const option = document.createElement("option");

      option.innerText = sector;

      filter.append(option);
    });
  }

  static filterCompanies() {
    const filter = document.querySelector("#sector_filter");

    filter.addEventListener("change", async (event) => {
      const selected = event.target.value;

      const filtered = await ApiRequests.filterBySector(selected);

      this.createCompanyCards(filtered);
    });
  }
}

HomePage.getCompanies();
HomePage.getSectors();
HomePage.filterCompanies();
