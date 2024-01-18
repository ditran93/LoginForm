import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import { Box } from "@mui/material";
function App() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <LoginForm />
      </Box>
      <Footer />
    </>
  );
}

export default App;
