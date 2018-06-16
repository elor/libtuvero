import { expect } from "chai";

import dpv from "./dpv";

const excel_exported_dpv_masters = `Teamnummer;Name1;Vorname1;LizNr1;SpielerID1;Verein1;Name2;Vorname2;LizNr2;SpielerID2;Verein2;Name3;Vorname3;LizNr3;SpielerID3;Verein3;Pseudonym;RLpunkteTeam;Setzposition;Gesetzt;Anmeldender Verein
1;Schorr;Thomas;10-001-150;0;BC Saarlouis;Kempf;Andreas;10-001-199;0;BC Saarlouis;Schwander;Thomas ;10-001-198;0;BC Saarlouis;;0;;Nein;
;;;;;;;;;;;;;;;;;;;;`;
const decoded_dpv_masters = [
  {
    "Anmeldender Verein": "",
    Gesetzt: "Nein",
    Pseudonym: "",
    RLpunkteTeam: "0",
    Setzposition: "",
    Spieler: [
      {
        importID: 1,
        Name: "Schorr",
        Vorname: "Thomas",
        LizNr: "10-001-150",
        SpielerID: "0",
        Verein: "BC Saarlouis"
      },
      {
        importID: 2,
        Name: "Kempf",
        Vorname: "Andreas",
        LizNr: "10-001-199",
        SpielerID: "0",
        Verein: "BC Saarlouis"
      },
      {
        importID: 3,
        Name: "Schwander",
        Vorname: "Thomas",
        LizNr: "10-001-198",
        SpielerID: "0",
        Verein: "BC Saarlouis"
      }
    ],
    Teamnummer: "1"
  }
];

describe("io/dpv.ts", () => {
  describe("import.csv()", () => {
    it("imports Reference CSV", () => {
      expect(dpv.import.csv(excel_exported_dpv_masters)).to.deep.equal(
        decoded_dpv_masters
      );
    });
  });
});
