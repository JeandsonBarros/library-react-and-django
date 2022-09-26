import { createTheme, NextUIProvider } from '@nextui-org/react';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Layouts/Footer';
import Header from './components/Layouts/Header';
import NavbarCom from './components/Layouts/Navbar';
import Login from './components/screens/auth/Login';
import Register from './components/screens/auth/Register';
import BookDetails from './components/screens/book/BookDetails';
import Books from './components/screens/book/Books';
import Clients from './components/screens/client/Clients';
import Loans from './components/screens/loan/Loans';
import Container from './components/screens/Container';


const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      // brand colors
      primaryLight: '$purple200',
      primaryLightHover: '$purple300',
      primaryLightActive: '$purple400',
      primaryLightContrast: '$purple600',
      primary: '#9750DD',
      secondary: '#06B7DB',
      primaryBorder: '$$purple600500',
      primaryBorderHover: '#06B7DB',
      primarySolidHover: '$purple700',
      primarySolidContrast: '$white',
      primaryShadow: '#9750DD',
      secondaryShadow: '#06B7DB',

      background: '#fff',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#000',

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
      primaryLight: '$purple200',
      primaryLightHover: '$purple300',
      primaryLightActive: '$purple400',
      primaryLightContrast: '$purple600',
      primary: '#9750DD',
      secondary: '#06B7DB',
      primaryBorder: '$purple600n500',
      primaryBorderHover: '$$purple600600',
      primarySolidHover: '$$purple600700',
      primarySolidContrast: '$white',
      primaryShadow: '#9750DD',
      secondaryShadow: '#06B7DB',

      background: '#080008',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#fff',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {},

  }
})


export default function App() {

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useState(darkThemeMq.matches)

  return (

    <NextUIProvider theme={isDark ? darkTheme : lightTheme}>

      <BrowserRouter>

        <Header setIsDark={setIsDark} isDark={isDark} />
        <hr className='ms-2 me-2' />

        <NavbarCom />

        <Container>
          
          <Routes>

            <Route path="/" element={<Books />} />
            <Route path="/livro/:id/" element={<BookDetails />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/clientes/" element={<Clients />} />
            <Route path="/emprestimos/" element={<Loans />} />

          </Routes>

        </Container>


        <Footer />

      </BrowserRouter>


    </NextUIProvider>

  )

}