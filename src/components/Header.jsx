import { TextField } from '@mui/material'
import React from 'react'
import { Button } from '../src/components/ui/button'
import { IconMoon, IconSunHigh } from '@tabler/icons-react'

const Header = ({handleItemsChange, handleSumbitItems, error, setTheme, theme}) => {
  return (
    <div>
    <div className=' flex justify-center items-center'>
        <h1 className=' text-5xl mt-8 text-center'>Información Sísmica</h1>
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
      <div className=' mt-5 flex items-center justify-center gap-5'>
        <span className=' '>Selecciona el número de items por página: </span>
        <TextField className="text-white border border-white rounded-md px-4 py-2 shadow-md bg-transparent"
            type="number"
            onChange={(e) => handleItemsChange(e)}
            error = {error}
            required
            id="outlined-required"
            label="Items por página"
            defaultValue={10}
          />
          <Button onClick={() => handleSumbitItems()}>Establecer Valor</Button>
    </div>
    </div>
  )
}

export default Header