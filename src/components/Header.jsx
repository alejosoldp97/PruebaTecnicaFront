import { TextField, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { Button } from "../src/components/ui/button";
import { IconMoon, IconSunHigh } from "@tabler/icons-react";
import PaginationComponent from "./PaginationComponent";

const Header = ({
  handleItemsChange,
  handleSumbitItems,
  error,
  setTheme,
  theme,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const themeConfig = createTheme({
    palette: {
      mode: theme,
    },
  });

  

  return (
    <div>
      <div className=" flex justify-center items-center">
        <h1 className=" w-[80%] text-5xl mt-8 text-center ml-5">
          Información Sísmica
        </h1>
        <div className="flex justify-end items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="border-[1px] mt-8 mr-8"
          >
            <IconSunHigh className="size-6 dark:hidden " />
            <IconMoon className="hidden size-6 dark:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
      <div className=" mt-10 flex w-full items-center justify-center gap-5">
        <div className="w-[50%] space-x-3 flex items-baseline ">
          <span className=" ml-5">
            Selecciona el número de items por página:{" "}
          </span>
          <ThemeProvider theme={themeConfig}>
            <TextField
              className="text-white border border-white rounded-md px-4 py-2 shadow-md bg-transparent"
              type="number"
              onChange={(e) => handleItemsChange(e)}
              error={error}
              required
              id="outlined-required"
              label="Items por página"
              defaultValue={10}
            />
          </ThemeProvider>
          <Button onClick={() => handleSumbitItems()}>Establecer Valor</Button>
        </div>
        <div className="w-[50%] mr-4">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
