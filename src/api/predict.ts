import { APIError, Prediction } from "./common";

export const predictHeart = async (
  formData: FormData,
): Promise<number | string> => {
  const res = await fetch("/api/predict/heart", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    const error = APIError.safeParse(data);
    return error.success ? error.data.detail : `unknown error (${res.status})`;
  }
  const data = await res.json();
  const { prediction } = Prediction.parse(data);
  return prediction;
};

export const predictPneumonia = async (
  formData: FormData,
): Promise<number | string> => {
  const res = await fetch("/api/predict/pneumonia", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    const error = APIError.safeParse(data);
    return error.success ? error.data.detail : `unknown error (${res.status})`;
  }
  const data = await res.json();
  const { prediction } = Prediction.parse(data);
  return prediction;
};
