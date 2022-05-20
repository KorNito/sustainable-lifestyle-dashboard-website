describe("TA.1 Sukurti užduotį", () => {
  it("Atidaromas užduočių kūrimo langas", () => {
    cy.visit("http://localhost:3000/create-challenge");
  });

  it("Įvedamas užduoites pavadinimas", () => {
    cy.get('input[id="name"]').type("Test challenge name");
  });

  it("Įvedami užduoites taškai", () => {
    cy.get('input[id="points"]').type("10");
  });

  it("Įvedama užduoites pradžios data", () => {
    cy.get('input[id="startDate"]').type("2022-05-01");
  });

  it("Įvedama užduoites pabaigos data", () => {
    cy.get('input[id="endDate"]').type("2022-06-01");
  });

  it("Paspausti sukūrimo mygtuką", () => {
    cy.get('button[type="Submit"]').click();
  });

  it("Atvaizduojamas sėkmingas užduoties sūkurimo pranešimas", () => {
    cy.get("div").contains("Challenge created");
  });
});

describe("TA.2 Formos įrašo kūrimo informavimas", () => {
  it("Atidaromas užduočių kūrimo langas", () => {
    cy.visit("http://localhost:3000/create-challenge");
  });

  it("Įvedamas užduoites pavadinimas", () => {
    cy.get('input[id="name"]').type("Test challenge name");
  });

  it("Įvedami užduoites taškai", () => {
    cy.get('input[id="points"]').type("10");
  });

  it("Įvedama užduoites pradžios data", () => {
    cy.get('input[id="startDate"]').type("2022-05-01");
  });

  it("Įvedama užduoites pabaigos data", () => {
    cy.get('input[id="endDate"]').type("2022-06-01");
  });

  it("Paspausti sukūrimo mygtuką", () => {
    cy.get('button[type="Submit"]').click();
  });

  it("Mygtukas informuoja apie užduoties kūrimą", () => {
    cy.get("button").contains("Creating challenge...");
  });
});

describe("TA.3 Neįvestas užduoties formos laukas", () => {
  it("Atidaromas užduočių kūrimo langas", () => {
    cy.visit("http://localhost:3000/create-challenge");
  });

  it("Formos įvesties laukai yra tušti", () => {
    cy.get('input[id="name"]').should("be.empty");

    cy.get('input[id="name"]').click();

    cy.get('input[id="points"]').click();
  });

  it("Atvaizduojamas neįvesto lauko pranešimas", () => {
    cy.get("p").contains("Please enter challenge name");
  });
});

describe("TA.4 Užduočių atvaizdavimas", () => {
  it("Atidaromas atvaizdavimo langas", () => {
    cy.visit("http://localhost:3000/view-challenges");
  });

  it("Ekrane yra matomos užduotys", () => {
    cy.get("td").contains("q");
    cy.get("td").contains("2");
    cy.get("td").contains("2022-05-04");
    cy.get("td").contains("2022-05-11");
  });
});

describe("TA.5 Ištrinti užduotį", () => {
  it("Atidaromas užduočių atvaizdavimo langas", () => {
    cy.visit("http://localhost:3000/view-challenges");
  });

  it("Paspaudžiamas ištrinimo mygtukas", () => {
    cy.get('button[class="btn btn-delete"]');
  });
});

describe("TA.6 Sukurti apdovanojimą", () => {
  it("Atidaromas užduočių kūrimo langas", () => {
    cy.visit("http://localhost:3000/create-reward");
  });

  it("Įvedamas apdovanojimo pavadinimas", () => {
    cy.get('input[id="name"]').type("Test reward name");
  });

  it("Įvedami apdovanojimo taškai", () => {
    cy.get('input[id="points"]').type("10");
  });

  it("Paspausti sukūrimo mygtuką", () => {
    cy.get('button[type="Submit"]').click();
  });

  it("Atvaizduojamas sėkmingas apdovanojimo sūkurimo pranešimas", () => {
    cy.get("div").contains("Reward created");
  });
});

describe("TA.7 Neįvestas apdovanojimo formos laukas", () => {
  it("Atidaromas apdovanojimų kūrimo langas", () => {
    cy.visit("http://localhost:3000/create-reward");
  });

  it("Formos įvesties laukai yra tušti", () => {
    cy.get('input[id="name"]').should("be.empty");

    cy.get('input[id="name"]').click();

    cy.get('input[id="points"]').click();
  });

  it("Atvaizduojamas neįvesto lauko pranešimas", () => {
    cy.get("p").contains("Please enter reward name");
  });
});

describe("TA.8 Apdovanojimų atvaizdavimas", () => {
  it("Atidaromas atvaizdavimo langas", () => {
    cy.visit("http://localhost:3000/view-rewards");
  });

  it("Ekrane yra matomi apdovanojimai", () => {
    cy.get("td").contains("q");
    cy.get("td").contains("3");
  });
});

describe("TA.9 Ištrinti apdovanojimą", () => {
  it("Atidaromas apdovanojimų atvaizdavimo langas", () => {
    cy.visit("http://localhost:3000/view-rewards");
  });

  it("Paspaudžiamas ištrinimo mygtukas", () => {
    cy.get('button[class="btn btn-delete"]');
  });
});

describe("TA.10 Sukurti vietovę", () => {
  it("Atidaromas vietovių kūrimo langas", () => {
    cy.visit("http://localhost:3000/create-place");
  });

  it("Įvedamas vietovės pavadinimas", () => {
    cy.get('input[id="name"]').type("Test place name");
  });

  it("Įvedama ilguma", () => {
    cy.get('input[id="longitude"]').type("10");
  });

  it("Įvedama platuma", () => {
    cy.get('input[id="latitude"]').type("11");
  });

  it("Paspausti sukūrimo mygtuką", () => {
    cy.get('button[type="Submit"]').click();
  });

  it("Atvaizduojamas sėkmingas vietovės sūkurimo pranešimas", () => {
    cy.get("div").contains("Place created");
  });
});

describe("TA.11 Neįvestas vietovės formos laukas", () => {
  it("Atidaromas apdovanojimų kūrimo langas", () => {
    cy.visit("http://localhost:3000/create-place");
  });

  it("Formos įvesties laukai yra tušti", () => {
    cy.get('input[id="name"]').should("be.empty");

    cy.get('input[id="name"]').click();

    cy.get('input[id="longitude"]').click();
  });

  it("Atvaizduojamas neįvesto lauko pranešimas", () => {
    cy.get("p").contains("Please enter place name");
  });
});

describe("TA.12 Vietovių atvaizdavimas", () => {
  it("Atidaromas atvaizdavimo langas", () => {
    cy.visit("http://localhost:3000/view-places");
  });

  it("Ekrane yra matomi apdovanojimai", () => {
    cy.get("td").contains("Test place name");
    cy.get("td").contains("10");
    cy.get("td").contains("10");
  });
});

describe("TA.13 Ištrinti vietovę", () => {
  it("Atidaromas apdovanojimų atvaizdavimo langas", () => {
    cy.visit("http://localhost:3000/view-places");
  });

  it("Paspaudžiamas ištrinimo mygtukas", () => {
    cy.get('button[class="btn btn-delete"]');
  });
});
