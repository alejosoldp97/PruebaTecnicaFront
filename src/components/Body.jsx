import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../src/components/ui/table";
import Select from "react-select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog";
import { Button } from "../src/components/ui/button";
import CommentsList from "./CommentsList";
import { ToastContainer } from "react-toastify";
import { Textarea } from "../src/components/ui/textarea";

const Body = ({
  earthquakes,
  options,
  selectedOptions,
  handleSelectChange,
  handleEarthquackeId,
  handleCommentArea,
  handleSubmitComment,
  fetchGetComments,
  bodyComments,
}) => {
  return (
    <div>
      <div className=" py-6 ml-5 mr-5">
        
        <Table className=" mt-5 text-center">
          <TableCaption>Datos sísmicos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Título</TableHead>
              <TableHead className='text-center'>Lugar</TableHead>
              <TableHead className='text-center'>Magnitud</TableHead>
              <TableHead className='text-center'>
                <Select
                  className=" w-40"
                  placeholder="Tipo de Magnitud"
                  options={options}
                  isMulti
                  value={selectedOptions}
                  onChange={handleSelectChange}
                />
              </TableHead>
              <TableHead className='text-center'>Latitud</TableHead>
              <TableHead className='text-center'>Longitud</TableHead>
              <TableHead className='text-center'>Comentarios</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {earthquakes.map((earthquake) => (
              <TableRow key={earthquake.attributes.external_id}>
                <TableCell className='text-left'>{earthquake.attributes.title}</TableCell>
                <TableCell className='text-left'>{earthquake.attributes.place}</TableCell>
                <TableCell>{earthquake.attributes.magnitude}</TableCell>
                <TableCell>{earthquake.attributes.mag_type}</TableCell>
                <TableCell>
                  {earthquake.attributes.coordinates.latitude}
                </TableCell>
                <TableCell>
                  {earthquake.attributes.coordinates.longitude}
                </TableCell>
                <TableCell>
                  <Dialog className="mb-3">
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        className="w-52 mb-3 2xl:ml-4"
                        onClick={() => handleEarthquackeId(earthquake.id)}
                      >
                        {" "}
                        Agregar un comentario
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="dark:text-white">
                          Añade tu comentario del sismo{" "}
                          {earthquake.attributes.title}{" "}
                        </DialogTitle>
                        <DialogDescription>
                          <Textarea
                            className="mt-5"
                            placeholder="Escribe tu comentario aqui."
                            onChange={(e) => handleCommentArea(e)}
                          />
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Cancelar
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            onClick={() => handleSubmitComment(earthquake.id)}
                          >
                            Guardar
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-52 2xl:ml-4"
                        onClick={() => fetchGetComments(earthquake.id)}
                      >
                        {" "}
                        Ver comentarios
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <CommentsList
                          comments={bodyComments}
                          earthquake={earthquake}
                        />
                      </DialogHeader>
                      <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                          <Button type="button">Cerrar</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
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
    </div>
  );
};

export default Body;
