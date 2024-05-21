import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { uploadImagesArchive } from "../api/images";
import { InvalidMessage } from "../components/InvalidMessage";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import useAuth from "../contexts/AuthContext";
import { Navigate, useLoaderData } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Upload } from "@mui/icons-material";

type Inputs = {
  dirname: string;
  file: File[];
};

export default function UploadPage() {
  const { roles } = useAuth();

  const [success, setSuccess] = useState(false);
  const { dirname } = useLoaderData() as { dirname: string | null };

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    clearErrors,
    reset,
  } = useForm<Inputs>();

  if (!roles.includes("admin")) {
    return <Navigate to="/" />;
  }

  const onSubmit: SubmitHandler<Inputs> = async ({ file, dirname }) => {
    clearErrors();
    setSuccess(false);
    const error = await uploadImagesArchive(file[0], dirname);
    if (error) {
      setError("root", { message: error });
    } else {
      setSuccess(true);
      reset();
    }
  };

  return (
    <main className={twMerge("flex flex-auto flex-col items-center px-3")}>
      <h2 className="mb-3 text-2xl font-bold">Загрузка</h2>

      <div className={twMerge("flex flex-col items-start justify-center")}>
        <form
          className={twMerge(
            "flex flex-col items-center gap-y-3 rounded-lg p-5",
            "shadow-inner",
            "bg-neutral-300 dark:bg-neutral-900",
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap items-center gap-x-2">
            <label htmlFor="dirname">Введите идентификатор папки:</label>
            <input
              {...register("dirname", { required: true })}
              id="dirname"
              placeholder="Идентификатор..."
              aria-invalid={errors.dirname ? "true" : "false"}
              defaultValue={dirname ?? undefined}
              className="rounded bg-white p-1 shadow-md dark:bg-black"
            />
            {errors.dirname && (
              <InvalidMessage>
                {errors.dirname.message || "Это поле обязательно"}
              </InvalidMessage>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2">
            <label htmlFor="file">Выберите архив:</label>

            <input
              {...register("file", { required: true })}
              className="shadow-none"
              type="file"
              id="file"
              accept=".zip,application/zip"
              multiple={false}
              onChange={(e) => {
                const filename = e.target.files?.[0].name;
                const dirname = getValues("dirname");
                if (filename && dirname == "") {
                  setValue(
                    "dirname",
                    filename.substring(0, filename.lastIndexOf(".")),
                  );
                }
              }}
              aria-invalid={errors.file ? "true" : "false"}
            />
            {errors.file && (
              <InvalidMessage>
                {errors.file.message || "Это поле обязательно"}
              </InvalidMessage>
            )}
          </div>

          <Button
            className="flex items-center gap-1 py-1 pl-1 pr-2"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <CircularProgress color="inherit" size="1.5rem" thickness={6} />
            ) : (
              <Upload />
            )}
            Загрузить
          </Button>
          {errors.root?.message && (
            <InvalidMessage>{errors.root.message}</InvalidMessage>
          )}
          {success && <div>Успешно!</div>}
        </form>
      </div>
    </main>
  );
}
