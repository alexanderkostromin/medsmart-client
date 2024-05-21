import { Navigate, RouteObject } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import ImagesLayout from "./layouts/ImagesLayout.tsx";
import { fetchImageListWithPath, fetchImageList } from "./api/images.ts";
import ImageGallery from "./pages/ImageGallery.tsx";
import UploadPage from "./pages/UploadPage.tsx";
import UsersLayout from "./layouts/UsersLayout.tsx";
import { changeUserRole, fetchAllUsers, fetchUser } from "./api/users.ts";
import UserPage from "./pages/UserPage.tsx";
import AnalysesPage from "./pages/AnalysesPage.tsx";
import ImagesIndex from "./pages/ImagesIndex.tsx";

export const routes = (): RouteObject[] => [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    loader: async () => fetch("/api/auth/logout"),
    element: <Navigate to="/login" />,
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <MainPage />,
          },
          {
            path: "/images",
            loader: fetchImageList,
            element: <ImagesLayout />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                loader: fetchImageList,
                element: <ImagesIndex />,
              },
              {
                path: "*",
                loader: fetchImageListWithPath,
                element: <ImageGallery />,
              },
            ],
          },
          {
            path: "/upload",
            element: <UploadPage />,
            loader: ({ request }) => {
              const url = new URL(request.url);
              const dirname = url.searchParams.get("dirname");
              return { dirname };
            },
          },
          {
            path: "/users",
            loader: fetchAllUsers,
            element: <UsersLayout />,
            children: [
              { index: true, element: <div>Выберите пользователя...</div> },
              {
                path: ":username",
                loader: fetchUser,
                action: changeUserRole,
                element: <UserPage />,
              },
            ],
          },
          {
            path: "/analyses",
            element: <AnalysesPage />,
          },
        ],
      },
    ],
  },
];
