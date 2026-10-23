import { isAxiosError } from "axios";

export function isShortUrlAlreadyExistsError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 409;
}

export function getApiErrorMessage(error: unknown) {
  if (isShortUrlAlreadyExistsError(error)) {
    return "Essa URL encurtada já existe.";
  }

  if (isAxiosError(error) && !error.response) {
    return "Não foi possível conectar ao servidor. Tente novamente.";
  }

  return "Não foi possível salvar o link. Tente novamente.";
}
