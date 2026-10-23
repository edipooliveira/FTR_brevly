import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateLink } from "../hooks/use-create-link";
import {
  type CreateLinkFormData,
  createLinkFormSchema,
} from "../schemas/create-link-form";
import {
  getApiErrorMessage,
  isShortUrlAlreadyExistsError,
} from "../utils/get-api-error-message";
import { WarningIcon } from "./icons/warning";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export function NewLinkForm() {
  const { mutateAsync: createLink, isPending } = useCreateLink();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkFormSchema),
    defaultValues: { originalUrl: "", shortUrl: "" },
  });

  const [originalUrl, shortUrl] = watch(["originalUrl", "shortUrl"]);
  const isFormEmpty = !originalUrl || !shortUrl;

  async function handleCreateLink(data: CreateLinkFormData) {
    try {
      await createLink(data);

      reset();
    } catch (error) {
      const message = getApiErrorMessage(error);

      if (isShortUrlAlreadyExistsError(error)) {
        setError("shortUrl", { message });
      } else {
        setError("root", { message });
      }
    }
  }

  return (
    <Card asChild>
      <form
        onSubmit={handleSubmit(handleCreateLink)}
        noValidate
        className="flex flex-col gap-5 md:gap-6"
      >
        <h2 className="text-lg font-bold text-gray-600">Novo link</h2>

        <div className="flex flex-col gap-4">
          <Input
            label="Link original"
            type="url"
            placeholder="www.exemplo.com.br"
            autoComplete="off"
            error={errors.originalUrl?.message}
            {...register("originalUrl")}
          />

          <Input
            label="Link encurtado"
            prefix="brev.ly/"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            error={errors.shortUrl?.message}
            {...register("shortUrl")}
          />
        </div>

        {errors.root && (
          <p
            role="alert"
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <WarningIcon className="size-4 shrink-0 text-danger" />
            {errors.root.message}
          </p>
        )}

        <Button type="submit" disabled={isFormEmpty} isLoading={isPending}>
          {isPending ? "Salvando..." : "Salvar link"}
        </Button>
      </form>
    </Card>
  );
}
