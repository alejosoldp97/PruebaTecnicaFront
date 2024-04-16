import { useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  // Estados

  const [earthquakes, setEarthquakes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState(false);
  const [itemsValue, setItemsValue] = useState(10);
  const [theme, setTheme] = useState("light");
  const [bodyComments, setBodyComments] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [data, setData] = useState({
    earthquake_id: "",
    body: "",
  });
  const [totalPages, setTotalPages] = useState();
  const inicio = 1;
  const options = [
    { value: "md", label: "md" },
    { value: "ms", label: "ms" },
    { value: "mw", label: "mw" },
    { value: "me", label: "me" },
    { value: "mi", label: "mi" },
    { value: "mb", label: "mb" },
    { value: "mlg", label: "mlg" },
  ];

  // Funciones

  const fetchData = async (values, actualPage, itemsPerPage) => {
    const params = new URLSearchParams();
    if (values.length > 0) {
      values.forEach((mag_type) => {
        params.append("filters[mag_type][]", mag_type);
      });
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/earthquakes?page=${actualPage}&per_page=${itemsPerPage}&${params}`
      );
      const data = await response.json();
      setEarthquakes(data.data);
      setCurrentPage(data.pagination.current_page);
      setPerPage(data.pagination.per_page);
      setTotalPages(data.pagination.total);
    } catch (error) {
      console.error("Error fetching earthquake data:", error);
    }
  };

  const fetchGetComments = async (eId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/comments?earthquake_id=${eId}`
      );
      const data = await response.json();
      console.log(data);
      setBodyComments(data);
    } catch (error) {
      console.error("Error fetching comments data:", error);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    const values = selected.map((option) => option.value);
    setSelectedValues(values);
    fetchData(values, inicio, itemsValue);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(selectedValues, newPage, itemsValue);
  };

  const handleEarthquackeId = (eId) => {
    setData({ ...data, earthquake_id: eId, body: "" });
  };

  const handleCommentArea = (e) => {
    const { value } = e.target;
    setData({ ...data, body: value });
  };

  const handleSubmitComment = async (id) => {
    const response = await fetch("http://localhost:3000/api/v1/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Comentario creado!", {
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
      setDialogMessage("Comentario creado correctamente");
    } else {
      const errorData = await response.json();
      setDialogMessage("Error al crear el comentario");
      toast.error("Error al crear el comentario", {
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
  };

  const handleItemsChange = (event) => {
    const value = event.target.value;
    setItemsValue(value);
    if (value < 0 || value > 1000 || isNaN(value)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSumbitItems = () => {
    if (!error) {
      fetchData(selectedValues, inicio, itemsValue);
    } else {
      toast.error("El número de items es incorrecto", {
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
  };

  // useEffects

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const FirtsFetch = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/earthquakes`
        );
        const data = await response.json();
        setEarthquakes(data.data);
        setCurrentPage(data.pagination.current_page);
        setTotalPages(data.pagination.total);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    };
    FirtsFetch();
  }, []);


  return (
    <div className="text-black dark:text-white">
      <Header
        handleItemsChange={handleItemsChange}
        handleSumbitItems={handleSumbitItems}
        error={error}
        setTheme={setTheme}
        theme={theme}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <Body
        earthquakes={earthquakes}
        options={options}
        selectedOptions={selectedOptions}
        handleSelectChange={handleSelectChange}
        handleEarthquackeId={handleEarthquackeId}
        handleCommentArea={handleCommentArea}
        handleSubmitComment={handleSubmitComment}
        fetchGetComments={fetchGetComments}
        bodyComments={bodyComments}
      />
    </div>
  );
}

export default App;
