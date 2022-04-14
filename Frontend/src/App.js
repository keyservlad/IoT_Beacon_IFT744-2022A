import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Page404} from "./view/pages/Page404";
import {Main} from "./view/pages/Main";
import {MyHeader} from "./view/components/MyHeader";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useMemo, useState} from "react";
import {darkColorSchema, lightColorSchema} from "./view/styles/colorSchema";

function App() {

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
              ? lightColorSchema
              : darkColorSchema
      ),
    },
  });

  const [mode,setMode] = useState('light');
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <div style={{zIndex:99999}}>
            <MyHeader mode={mode} setMode={setMode}/>
          </div>
          <Routes>
            <Route exact path="/" element={<Main/>}/>
            <Route path="/" element={<Page404/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
