import { CustomError } from "../errors/CustomError";
// exercicio 3
export class CharacterModel {
  constructor(
    private nome: string,
    private vida: number,
    private defesa: number,
    private forca: number
  ) {}

  public getNome(): string {
    return this.nome;
  }
  public getVida(): number {
    return this.vida;
  }
  public setVida(vida: number): void {
    this.vida = vida;
  }
  public getDefesa(): number {
    return this.defesa;
  }
  public getForca(): number {
    return this.forca;
  }
}

export const validateCharacter = (character: CharacterModel): boolean => {
  return (
    character.getNome() !== "" &&
    character.getVida() > 0 &&
    character.getForca() > 0 &&
    character.getDefesa() > 0
  );
};
