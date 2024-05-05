// Mock de validateCharacter para saída de sucesso
export const validateCharacterSuccessMock = jest.fn((character) => {
  return true;
});

// Mock de validateCharacter para saída de erro/falha
export const validateCharacterErrorMock = jest.fn((character) => {
  return false;
});
