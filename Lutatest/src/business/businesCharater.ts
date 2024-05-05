import { CustomError } from "../errors/CustomError";
import { CharacterDataBase } from "../data/CharacterDatabase";
import { CharacterModel } from "../model/CharacterModel";

export class CharacterBusiness {
  constructor(private characterDatabase: CharacterDataBase){}

  private async performAttack(
    attacker: CharacterModel,
    defender: CharacterModel,
    validationFunction: (character: CharacterModel) => boolean
  ): Promise<string | number> {
    if (!attacker || !defender) {
      throw new CustomError(422, "Missing input!");
    }

    if (!validationFunction(attacker) || !validationFunction(defender)) {
      throw new CustomError(422, "Character Invalid");
    }

    if (defender.getDefesa() > attacker.getForca()) {
      return 'Defesa maior, nenhuma vida tirada!';
    }

    let vidaAtual = defender.getVida();
    let novaVida = vidaAtual - attacker.getForca();
    defender.setVida(novaVida);

    return defender.getVida();
  }

  public async performAttackWithDatabase(
    attacker: CharacterModel,
    defender: CharacterModel
  ): Promise<string | number> {
    return this.performAttack(attacker, defender, this.characterDatabase.validateCharacter.bind(this.characterDatabase));
  }

  public async performAttackWithCustomValidation(
    attacker: CharacterModel,
    defender: CharacterModel,
    validateCharacter: (character: CharacterModel) => boolean
  ): Promise<string | number> {
    return this.performAttack(attacker, defender, validateCharacter);
  }
}
