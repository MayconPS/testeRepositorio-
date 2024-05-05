export interface Character {
  nome: string;
  vida: number;
  defesa: number;
  forca: number;
}

export const validateCharacter = (input: Character): boolean => {
  if (
    !input.nome ||
    input.nome.trim() === '' ||
    input.vida <= 0 ||
    input.defesa <= 0 ||
    input.forca <= 0
  ) {
    return false;
  }
  return true;
};

