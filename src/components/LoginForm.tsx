import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "../assets/google-icon-logo.svg";
import AppleIcon from "../assets/apple-icon.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            color: "black",
            borderColor: "black",
            borderRadius: 0,
            textTransform: "none",
            padding: "16px",
          },
        },
      ],
    },
  },
});

export default function LoginForm() {
  //Yup validation schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be less than 15 characters")
      .required("Password is required"),
  });

  //React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Media Query
  const matches = useMediaQuery("(max-width:768px)");

  //Watch for fields input
  const watchAllFields = watch();

  //Password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () =>
    setShowPassword((prevShowState) => !prevShowState);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //Form submission
  const submitForm = (data: any): void => console.log(data);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography
          align="center"
          sx={{ fontWeight: 900 }}
          component="h5"
          variant="h5"
          margin={4}
        >
          Log Into This Website
        </Typography>
        <form onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={matches ? 12 : 5}>
              <Grid item xs={12} marginY={2}>
                <InputLabel htmlFor="email-address">EMAIL ADDRESS</InputLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Email Address"
                      name="email-address"
                      variant="standard"
                      required
                      fullWidth
                      id="email-address"
                      autoFocus
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </Grid>
              <Grid item xs={12} marginY={2}>
                <InputLabel htmlFor="password">PASSWORD</InputLabel>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      fullWidth
                      name="password"
                      id="password"
                      error={Boolean(errors.password)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  disabled={!watchAllFields.email || !watchAllFields.password}
                  style={{
                    border: "none",
                    backgroundColor:
                      watchAllFields.email && watchAllFields.password
                        ? "black"
                        : "lightgrey",
                    color: "white",
                  }}
                  type="submit"
                  fullWidth
                  variant="outlined"
                  size="large"
                >
                  LOG IN
                </Button>
              </Grid>
            </Grid>
            {!matches && (
              <>
                <Grid item xs={2}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                  >
                    <Box flexGrow={1} borderLeft={1} borderColor="grey.500" />
                    <Box py={2}>
                      <Typography variant="body1" color="textSecondary">
                        OR
                      </Typography>
                    </Box>
                    <Box flexGrow={1} borderLeft={1} borderColor="grey.500" />
                  </Box>
                </Grid>
              </>
            )}

            <Grid item xs={matches ? 12 : 5}>
              <Grid item xs={12} marginY={2}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  style={{ justifyContent: "flex-start" }}
                >
                  <Box display="flex" alignItems="center" flexGrow={1}>
                    <img
                      src={GoogleIcon}
                      alt="Google logo"
                      style={{ width: "24px" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center" flexGrow={20}>
                    Continue with Google
                  </Box>
                </Button>
              </Grid>
              <Grid item xs={12} marginY={2}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  style={{ justifyContent: "flex-start" }}
                >
                  <Box display="flex" alignItems="center" flexGrow={1}>
                    <img
                      src={AppleIcon}
                      alt="Apple logo"
                      style={{ width: "24px" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center" flexGrow={20}>
                    Continue with Apple
                  </Box>
                </Button>
              </Grid>
              <Grid item xs={12} marginY={2}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  style={{ paddingLeft: "50px" }}
                >
                  Continue with Facebook
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Box textAlign="center" margin={3} fontWeight={900}>
          <Link href="#" underline="none" style={{ color: "black" }}>
            CAN'T LOG IN?
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
