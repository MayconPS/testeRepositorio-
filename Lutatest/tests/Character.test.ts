import { Character, validateCharacter } from "../src/Character";
import { CharacterBusiness } from "../src/business/businesCharater";
import { CharacterDataBase } from "../src/data/CharacterDatabase";
import { CharacterModel } from "../src/model/CharacterModel";

describe("CharacterBusiness Integration Tests", () => {
  describe("performAttack", () => {
    let characterDataBase: CharacterDataBase;
    let characterBusiness: CharacterBusiness;
    let validateCharacterMock: jest.Mock;

    beforeEach(() => {
      characterDataBase = new CharacterDataBase();
      characterBusiness = new CharacterBusiness(characterDataBase);
      validateCharacterMock = jest.fn();
    });

    test("successfully reduces defender's life by 200 when attack is greater than defense", async () => {
      validateCharacterMock.mockReturnValue(true);
      const attacker = new CharacterModel("TinkerCAD", 1500, 400, 600);
      const defender = new CharacterModel("RUBENS", 1500, 300, 200);

      const result = await characterBusiness.performAttack(attacker, defender, validateCharacterMock);

      expect(result).toBe(1300); 
      expect(validateCharacterMock).toHaveBeenCalledTimes(2);
    });

    test("throws error for invalid attacker information", async () => {
      validateCharacterMock.mockReturnValue(false); 
      const attacker = new CharacterModel("", 1500, 400, 600); 
      const defender = new CharacterModel("RUBENS", 1500, 300, 200);

      await expect(characterBusiness.performAttack(attacker, defender, validateCharacterMock))
        .rejects.toThrow("Character Invalid");

      expect(validateCharacterMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("validateCharacter Functionality", () => {
    test.each([
      ["empty name", { nome: "", vida: 1500, defesa: 200, forca: 300 }],
      ["zero life", { nome: "Herói", vida: 0, defesa: 100, forca: 200 }],
      ["zero strength", { nome: "Herói", vida: 1500, defesa: 100, forca: 0 }],
      ["zero defense", { nome: "Herói", vida: 1500, defesa: 0, forca: 200 }],
      ["negative life", { nome: "Herói", vida: -100, defesa: 0, forca: 200 }],
    ])("returns false for character with %s", (_, character) => {
      expect(validateCharacter(character)).toBe(false);
    });

    test("returns true for a valid character", () => {
      const validCharacter = { nome: "Herói", vida: 1500, defesa: 200, forca: 300 };
      expect(validateCharacter(validCharacter)).toBe(true);
    });
  });
});
