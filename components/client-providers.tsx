"use client";

import { createTheme, ThemeProvider } from "@mui/material";

// Separate the client providers to be used server side
function ClientProviders({ children }: { children: React.ReactNode }) {
  const defaultTheme = createTheme();
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}

export default ClientProviders;
