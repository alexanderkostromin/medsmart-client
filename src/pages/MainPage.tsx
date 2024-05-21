export default function MainPage() {
  return (
    <main className="flex flex-auto flex-col items-center px-5 pb-10 dark:bg-black">
      <style>
        {`.animated-logo {
            background-image: linear-gradient(
              -100deg,
              #231557 0%,
              #44107a 15%,
              #ff1361 30%,
              #ff1361 60%,
              #44107a 80%,
              #231557 100%
            );
            background-size: auto auto;
            background-clip: border-box;
            background-size: 200% auto;
            color: #fff;
            background-clip: text;
            text-fill-color: transparent;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: textclip 2s linear infinite;
            display: inline-block;
          }
          
          @media (prefers-color-scheme: light) {
            .animated-logo {
              background-image: linear-gradient(
                -100deg,
                #081d7a 0%,
                #2844c4 15%,
                #2faef2 30%,
                #2faef2 60%,
                #2844c4 80%,
                #081d7a 100%
              );              
              background-size: auto auto;
              background-clip: border-box;
              background-size: 200% auto;
              color: #fff;
              background-clip: text;
              text-fill-color: transparent;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: textclip 2s linear infinite;
              display: inline-block;
            }
          }

          @keyframes textclip {
            to {
              background-position: 200% center;
            }
          }`}
      </style>
      <h1 className="mb-20 mt-20 text-5xl font-bold">
        Добро пожаловать в <span className="animated-logo">MedSmart</span>
      </h1>
      <div className="flex max-w-3xl flex-col gap-y-3 text-xl">
        <p className="mt-5">
          <b>MedSmart</b> — это веб-платформа, созданная для поддержки в
          обработке и анализе медицинских данных. Приложение предлагает базовые
          инструменты для управления данными, что может способствовать более
          эффективной подготовке диагностических заключений.
        </p>
        <h3 className="mt-2 font-bold">Основные возможности</h3>
        <ul className="list-inside list-disc">
          <li className="mb-1">Просмотр и загрузка данных</li>
          <p className="mb-3">
            Простой интерфейс позволяет пользователям загружать и просматривать
            медицинские данные.
          </p>
          <li className="mb-1">Аналитический инструментарий</li>
          <p className="mb-3">
            Функции для базового анализа данных обеспечивают поддержку в
            интерпретации и формировании предварительных заключений.
          </p>
        </ul>
      </div>
    </main>
  );
}
