
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
import './components/GlobalStyles/GlobalStyles.css'
import { publicRoutes } from './routes'

import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const theme = createTheme();

  return (
    <>
     <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component
                // để biến thường nó bị lỗi.. nên viết hoa.
                return <Route key={index} path={route.path} element={<Page />}></Route>
              })}
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
