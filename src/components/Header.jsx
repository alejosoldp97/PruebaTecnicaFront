import { TextField } from '@mui/material'
import React from 'react'
import { Button } from '../src/components/ui/button'

const Header = ({handleItemsChange, handleSumbitItems, error}) => {
  return (
    <div>
    <div>
        <h1 className=' text-5xl mt-8 text-center'>Información Sísmica</h1>
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