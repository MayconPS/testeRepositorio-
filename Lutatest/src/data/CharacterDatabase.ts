import BaseDataBase from "./BaseDatabase";
import { CharacterModel } from "../model/CharacterModel";
// exercicio 3
export class CharacterDataBase extends BaseDataBase {
  protected tableName: String = "character";

  // Método para validar se o personagem é válido
  public validateCharacter(character: CharacterModel): boolean {
    return (
      character.getNome() !== "" &&
      character.getVida() > 0 &&
      character.getForca() > 0 &&
      character.getDefesa() > 0
    );
  }
}
