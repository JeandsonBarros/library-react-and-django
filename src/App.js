import { createTheme, NextUIProvider } from '@nextui-org/react';
import React, { useState } from 'react';

import Footer from './components/Layouts/Footer';
import Header from './components/Layouts/Header';
import Login from './components/screens/auth/Login';
import Register from './components/screens/auth/Register';
import Books from './components/screens/book/Books';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

// 1. Import `createTheme`
// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#9750DD',
      secondary: '#06B7DB',
      primaryBorder: '$green500',
      primaryBorderHover: '#06B7DB',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '#9750DD',

      background: '#fff',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#0072F5',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {}
  }

})

const darkTheme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#9750DD',
      secondary: '#06B7DB',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '#9750DD',

      background: '#301934',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: 'aqua',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
  },
  {
    path: "/login/",
    element: <Login />,
  },
  {
    path: "/register/",
    element: <Register />,
  },
]);

export default function App() {

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useState(darkThemeMq.matches)

  return (

    <NextUIProvider  theme={isDark ? darkTheme : lightTheme}>

      <Header setIsDark={setIsDark} isDark={isDark} />

        <RouterProvider router={router} />
        
      <Footer />

    </NextUIProvider>

  )

}