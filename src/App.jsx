import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FilterSelector from './components/FilterSelector'
import { Button } from './src/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './src/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './src/components/ui/table'
import Select from 'react-select'
import PaginationComponent from './components/PaginationComponent'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from './src/components/ui/dialog'
import { Textarea } from './src/components/ui/textarea'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)
  const [earthquakes, setEarthquakes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [data, setData] = useState({
    earthquacke_id: '',
    body: ''
  })
  const [totalPages, setTotalPages] = useState()
  const inicio = 1;
  const options = [
    {value:"md", label:"md"},
    {value:"ms", label:"ms"},
    {value:"mw", label:"mw"},
    {value:"me", label:"me"},
    {value:"mi", label:"mi"},
    {value:"mb", label:"mb"},
    {value:"mlg", label:"mlg"}
  ]

  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  // const values = selectedOptions.map(option => option.value);
  //   setSelectedValues(values);
  const handleSelectChange = (selected) => {
      setSelectedOptions(selected);
      const values = selected.map(option => option.value);
      setSelectedValues(values);
      fetchData(values,inicio,perPage)
    };

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      fetchData(selectedValues,newPage);
    };

  const fetchData = async (values,actualPage,itemsPerPage) => {
    const params = new URLSearchParams();
    if (values.length > 0) {
      values.forEach((mag_type) => {
        params.append('filters[mag_type][]', mag_type);
      });
    }
    try {
      const response = await fetch(`http://localhost:3000/earthquackes?page=${actualPage}&items_per_page=${itemsPerPage}&${params}`);
      const data = await response.json();
      setEarthquakes(data.data);
      setCurrentPage(data.pagination.current_page);
      setPerPage(data.pagination.per_page);
      setTotalPages(data.pagination.total);
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }
  };
  useEffect(() => {
    const FirtsFetch = async () => {try {
      const response = await fetch(`http://localhost:3000/earthquackes`);
      const data = await response.json();
      setEarthquakes(data.data);
      setCurrentPage(data.pagination.current_page);
      setPerPage(data.pagination.per_page);
      setTotalPages(data.pagination.total);
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
    }}
    FirtsFetch()
  },[])

  const handleEarthquackeId = (eId) =>{
    setData({...data, earthquacke_id: eId, body:''})
  }

  const handleCommentArea = (e) =>{
    const {value} = e.target
    setData({...data, body: value})
  }
  const handleSubmitComment = async (id) => {
  
    
    const response = await fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Comentario creado correctamente
      //setContent(''); // Limpiar el campo de comentarios
      console.log('Comentario creado!');
      toast.success('Comentario creado!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: undefined,
        });
      setDialogMessage('Comentario creado correctamente');
    } else {
      // Error al crear el comentario
      const errorData = await response.json();
      console.error('Error al crear el comentario:', errorData);
      setDialogMessage('Error al crear el comentario');
      toast.error('Error al crear el comentario', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: undefined,
        });
    }

    setDialogVisible(true);

  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
  };

  return (
    <>
      <div>
        <h1 className=' text-5xl'>Información Sísmica</h1>
      </div>
      <div className=' py-6'>
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <Table className=' mt-5 text-left'>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >Titulo</TableHead>
              <TableHead >Lugar</TableHead>
              <TableHead>Magnitud</TableHead>
              <TableHead>
              <Select 
                placeholder='Tipo de Magnitud'
                options={options}
                isMulti
                value={selectedOptions}
                onChange={handleSelectChange}/>
              </TableHead>
              <TableHead>Latitud</TableHead>   
              <TableHead>Longitud</TableHead>  
              <TableHead>Comentarios</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              earthquakes.map((earthquake) =>(
                <TableRow key={earthquake.attributes.title}>
                  <TableCell >{earthquake.attributes.title}</TableCell>
                  <TableCell >{earthquake.attributes.place}</TableCell>
                  <TableCell>{earthquake.attributes.magnitude}</TableCell>
                  <TableCell>{earthquake.attributes.mag_type}</TableCell>
                  <TableCell>{earthquake.attributes.coordinates.latitude}</TableCell>                  
                  <TableCell>{earthquake.attributes.coordinates.longitude}</TableCell>
                  <TableCell>                                         
                      <Dialog>
                        <DialogTrigger asChild><Button variant="secondary" onClick={() => handleEarthquackeId(earthquake.id)} > Agregar un comentario</Button></DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Añade tu comentario del sismo {earthquake.attributes.title}</DialogTitle>
                            <DialogDescription>
                              <Textarea className='mt-5' placeholder="Escribe tu comentario aqui." onChange={(e)=>handleCommentArea(e)} />
                            </DialogDescription>
                          </DialogHeader>
                            <DialogFooter className="sm:justify-end">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Cancelar
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={() => handleSubmitComment(earthquake.id)} >Guardar</Button>
                              </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                      </Dialog>                      
                  </TableCell>
                </TableRow>

              )
              )
            }
          </TableBody>
        </Table>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  )
}

export default App
