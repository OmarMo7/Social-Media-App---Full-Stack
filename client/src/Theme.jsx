import React from "react"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App'
import { ColorModeContext } from './App'
import { brown, grey, deepOrange, blue } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import fakebook_white from "./images/fakebook-white.png"
import fakebook_blue from "./images/fakebook-blue.png"

const ToggleColorMode = () => {
  const pre_mode = localStorage.getItem("theme") === null ? 'light' : localStorage.getItem("theme")
  const [mode, setMode] = React.useState(pre_mode);
  localStorage.setItem("theme", mode)

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // palette values for light mode
              primary: { main: red[900] },
              divider: brown[200],
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
              background: { default: "#fff", paper: "#fff" },
              buttons: { main: blue[200] },
              appBar: { main: "#fff" },
              title: { main: 'rgba(0,183,255, 1)' },
              modeButton: { main: '#121212' },
              images: { appBar: fakebook_blue },
              card: { main: "#fff" },
              form: { main: "#fff" }
            }
            : {
              // palette values for dark mode
              primary: { main: deepOrange[500] },
              divider: deepOrange[700],
              text: {
                primary: '#fff',
                secondary: grey[500],
              },
              background: { default: "#121212", paper: "#121212" },
              buttons: { main: grey[200] },
              appBar: { main: grey[500] },
              title: { main: red[700] },
              images: { appBar: fakebook_white },
              modeButton: { main: '#121212' },
              card: { main: grey[400] },
              form: { main: grey[300] }
            }),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default ToggleColorMode