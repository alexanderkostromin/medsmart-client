import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import LinkButton from "../components/LinkButton";
import { InvalidMessage } from "../components/InvalidMessage";
import { z } from "zod";

interface Inputs {
  username: string;
  password: string;
}

const ErrorResponse = z.object({
  detail: z.string(),
});
type ErrorResponse = z.infer<typeof ErrorResponse>;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    resetField,
  } = useForm<Inputs>();

  const heading = isLogin ? "Вход" : "Регистрация";
  const subheading = isLogin ? "Нет аккаунта?" : "Уже зарегистрированы?";
  const url = isLogin ? "/api/auth/login" : "/api/auth/register";

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let errorMessage = "Неизвестная ошибка";
      try {
        const data = await res.json();
        const errorResponse = ErrorResponse.parse(data);
        errorMessage = capitalize(errorResponse.detail);
      } catch {
        console.error(res);
      }
      resetField("password");
      setError("root", { message: errorMessage });
    } else {
      const url = `${state?.pathname ?? "/"}` + `${state?.search ?? ""}`;
      return navigate(url);
    }
  };

  return (
    <div
      id="login-page"
      className="flex h-full w-full flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-1 pb-5">
        <h3 className="text-3xl">{heading}</h3>
        <div>
          <LinkButton
            onClick={() => {
              clearErrors();
              setIsLogin((v) => !v);
            }}
          >
            {subheading}
          </LinkButton>
        </div>
      </div>

      <form
        action="/api/login"
        method="post"
        className={twMerge(
          "flex flex-col items-center gap-y-3 rounded-lg p-5",
          "shadow-inner",
          "bg-neutral-200 dark:bg-neutral-900",
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            {...register("username", { required: true })}
            placeholder="Логин"
            className="rounded p-1 shadow-md"
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username && (
            <InvalidMessage>This field is required</InvalidMessage>
          )}
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Пароль"
            className="rounded p-1 shadow-md"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <InvalidMessage>This field is required</InvalidMessage>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {errors.root?.message && (
            <InvalidMessage>{errors.root.message}</InvalidMessage>
          )}
          <Button type="submit">{isLogin ? "Войти" : "Создать аккаунт"}</Button>
        </div>
      </form>
    </div>
  );
}
