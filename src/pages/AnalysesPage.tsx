import { useState } from "react";
import Button from "../components/Button";
import { twMerge } from "tailwind-merge";
import { predictHeart, predictPneumonia } from "../api/predict";
import Input from "../components/Input";
import TabGroup from "../components/TabGroup";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

const Field = ({ className, ...props }: DivProps) => (
  <div
    className={twMerge(
      "flex flex-col flex-wrap items-start gap-y-2",
      className,
    )}
    {...props}
  />
);

const HR = ({ className, ...props }: DivProps) => (
  <hr
    className={twMerge(
      "min-w-16 max-w-44 border border-neutral-400 dark:border-gray-400",
      className,
    )}
    {...props}
  />
);

const Select = ({ className, ...props }: SelectProps) => (
  <select
    className={twMerge(
      "rounded bg-white p-1 shadow-md dark:bg-black",
      className,
    )}
    {...props}
  />
);

const Label = (props: LabelProps) => <label {...props} />;

const HeartFields = () => (
  <>
    <Field>
      <Label htmlFor="age">Возраст</Label>
      <Input type="number" name="age" id="age" required />
    </Field>

    <Field>
      <Label htmlFor="sex">Пол</Label>
      <Select name="sex" id="sex" required>
        <option value="0">Женский</option>
        <option value="1">Мужской</option>
      </Select>
    </Field>

    <Field>
      <Label htmlFor="cp">Боль в грудной клетке</Label>
      <Select name="cp" id="cp" required>
        <option value="0">Отсутствует</option>
        <option value="3">Типичная ангинальная</option>
        <option value="1">Нетипичная ангинальная</option>
        <option value="2">Неангинальная</option>
      </Select>
    </Field>

    <Field>
      <Label htmlFor="trestbps">Артериальное давление при покое</Label>
      <div>
        <Input type="number" name="trestbps" id="trestbps" required /> мм.рт.ст.
      </div>
    </Field>

    {/* <Field>
      <Label htmlFor="chol">Холестерин</Label>
      <div>
        <Input type="number" name="chol" id="chol" required /> мг/дл
      </div>
    </Field> */}

    {/* <Field>
      <Label htmlFor="fbs">Глюкоза натощак &gt; 120мг/дл?</Label>
      <Select name="fbs" id="fbs" required>
        <option value="0">Нет</option>
        <option value="1">Да</option>
      </Select>
    </Field> */}

    <Field>
      <Label htmlFor="restecg">Результаты ЭКГ в покое</Label>
      <Select name="restecg" id="restecg" required>
        <option value="1">Норма</option>
        <option value="2">Аномалия ST-T</option>
        <option value="0">Гипертрофия левого желудочка</option>
      </Select>
    </Field>

    <Field>
      <Label htmlFor="thalch">Максимальный пульс</Label>
      <Input type="number" id="thalch" name="thalch" required />
    </Field>

    <Field>
      <Label htmlFor="exang">Стенокардия, вызванная физнагрузкой</Label>
      <Select name="exang" id="exang" required>
        <option value="0">Нет</option>
        <option value="1">Да</option>
      </Select>
    </Field>

    <Field>
      <Label htmlFor="oldpeak">Депрессия ST, вызванная физнагрузкой</Label>
      <Input type="number" step="0.01" id="oldpeak" name="oldpeak" required />
    </Field>

    <Field>
      <Label htmlFor="slope">Наклон сегмента ST при пиковой нагрузке</Label>
      <Select name="slope" id="slope" required>
        <option value="0">Вверх</option>
        <option value="1">Ровно</option>
        <option value="2">Вниз</option>
      </Select>
    </Field>

    <Field>
      <Label htmlFor="ca">
        Кол-во крупных сосудов, окрашенных при флюороскопии
      </Label>
      <Input type="number" id="ca" name="ca" required />
    </Field>

    <Field>
      <Label htmlFor="thal">Талассемия</Label>
      <Select name="thal" id="thal" required>
        <option value="1">Нормальная</option>
        <option value="0">Фиксированный дефект</option>
        <option value="2">Обратимый дефект</option>
      </Select>
    </Field>
  </>
);

const GreenText = (props: SpanProps) => (
  <span className="font-bold text-green-600 dark:text-teal-400" {...props} />
);

const RedText = (props: SpanProps) => (
  <span className="font-bold text-red-700 dark:text-red-500" {...props} />
);

const PneumoniaFields = () => (
  <>
    <Field className="flex-wrap gap-2">
      <Label htmlFor="lung_scan">Флюорография грудной клетки:</Label>
      <Input type="file" name="lung_scan" id="lung_scan" accept="image/*" />
    </Field>
  </>
);

const pneumoniaResult = {
  negative: (
    <p>
      По результатам анализа флюорографии{" "}
      <GreenText>вероятность наличия патологии низкая.</GreenText> Рекомендуется
      провести дополнительное обследование при появлении симптомов или по
      указаниям врача.
    </p>
  ),
  positive: (
    <p>
      По результатам анализа флюорографии{" "}
      <RedText>обнаружены признаки возможного заболевания.</RedText>{" "}
      Настоятельно рекомендуется проконсультироваться с врачом для подтверждения
      диагноза и назначения лечения.
    </p>
  ),
};

const heartResult = {
  negative: (
    <div>
      Результаты анализа медицинских показателей:
      <ul className="list-inside list-disc">
        <li className="list-item">
          Оценка состояния: На основе проведённого анализа сердечно-сосудистые
          заболевания <GreenText>не обнаружены</GreenText>.
        </li>
      </ul>
      Рекомендации:
      <ul className="list-inside list-disc">
        <li>
          Продолжать поддерживать здоровый образ жизни, включая сбалансированное
          питание и регулярные упражнения.
        </li>
        <li>
          Регулярно проходить медицинские обследования для раннего выявления
          возможных изменений в состоянии здоровья.
        </li>
      </ul>
    </div>
  ),
  positive: (
    <div>
      Результаты анализа медицинских показателей:
      <ul className="list-inside list-disc">
        <li>
          Оценка состояния: Проведённый анализ показывает{" "}
          <RedText>возможное наличие сердечно-сосудистого заболевания.</RedText>
        </li>
      </ul>
      Рекомендации:
      <ul className="list-inside list-disc">
        <li>
          Обратиться к кардиологу для детального обследования и подтверждения
          диагноза.
        </li>
        <li>
          Следить за своим здоровьем и избегать факторов риска, таких как
          курение, высокое артериальное давление и повышенный холестерин.
        </li>
      </ul>
    </div>
  ),
};

type Tab = {
  value: string;
  label: string;
};

export default function AnalysesPage() {
  const tabs: Tab[] = [
    // { value: "none", label: "Выберите опцию..." },
    { value: "heart", label: "Заболевания сердца" },
    { value: "pneumonia", label: "Флюорография" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [apiResponse, setApiResponse] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setApiResponse(null);
    setApiError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData);

    const fetchFn = (() => {
      switch (activeTab.value) {
        case "heart":
          return predictHeart;
        case "pneumonia":
          return predictPneumonia;
        default:
          return null;
      }
    })();

    if (!fetchFn) {
      return;
    }

    if (activeTab.value === "pneumonia") {
      const file = formData.get("lung_scan") as File | null;
      if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.decode().then(() => {
          img.style.maxWidth = "40%";
          document.getElementById("lung-scan-wrapper")?.replaceChildren(img);
        });
      }
    }

    fetchFn(formData).then((val) => {
      console.log(`api response (of type ${typeof val}): ${val.toString()}`);
      if (typeof val === "string") {
        setApiError(val);
      } else {
        setApiResponse(val);
      }
    });
  };

  const result =
    apiResponse !== null &&
    (() => {
      switch (activeTab.value) {
        case "heart":
          return apiResponse > 0.5
            ? heartResult.positive
            : heartResult.negative;
        case "pneumonia":
          return apiResponse > 0.5
            ? pneumoniaResult.positive
            : pneumoniaResult.negative;
        default:
          return "Неизвестный тип анализа";
      }
    })();

  return (
    <main className={twMerge("flex flex-auto flex-col items-center px-3")}>
      <h2 className="mb-3 text-2xl font-bold">Аналитика</h2>

      <TabGroup
        activeTab={activeTab}
        tabs={tabs}
        onChange={(t) => setActiveTab(t)}
      />

      <div className="flex max-w-2xl flex-col items-center justify-stretch gap-y-6 pb-10">
        <form
          // className="flex flex-wrap gap-3"
          className={twMerge(
            "flex flex-col items-start justify-center gap-5 rounded-lg p-3",
            "shadow-inner",
            // "sm:w-100",
            "bg-neutral-200 dark:bg-neutral-900",
          )}
          onSubmit={onSubmit}
        >
          {activeTab.value === "heart" && <HeartFields />}

          {activeTab.value === "pneumonia" && <PneumoniaFields />}

          <div className="mx-auto">
            <Button type="submit" disabled={activeTab.value === "none"}>
              Отправить
            </Button>
          </div>
        </form>

        {activeTab.value === "pneumonia" && <div id="lung-scan-wrapper" />}

        {result && (
          <>
            <HR />
            <div>
              <h3 className="font-semibold">Результат</h3>
              {result}
            </div>
          </>
        )}
        {apiError && (
          <>
            {" "}
            <HR />
            <div>Error: {apiError}</div>
          </>
        )}
      </div>
    </main>
  );
}
