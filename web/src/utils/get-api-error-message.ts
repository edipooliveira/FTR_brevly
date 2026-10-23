import { isAxiosError } from "axios";

export function getApiErrorMessage(error: unknown) {
  if (isAxiosError(error) && error.response?.status === 409) {
    return "Essa URL encurtada já existe.";
  }

  return "Não foi possível salvar o link. Tente novamente.";
}
