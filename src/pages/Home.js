import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import Blogs from "../components/Blogs";
import "../index.css";
import Search from "../components/Search";

const Home = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // State to hold original data
  const [searchValue, setSearchVal] = useState("");

  useEffect(() => {
    loadBlogsData();
  }, []);

  const loadBlogsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      if (response.status === 200) {
        setData(response.data);
        setOriginalData(response.data); // Store original data
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error loading blogs");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this blog?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
        if (response.status === 200) {
          toast.success("Blog deleted successfully");
          setData((prevData) => prevData.filter((blog) => blog.id !== id));
          setOriginalData((prevData) => prevData.filter((blog) => blog.id !== id)); // Update original data
        }
      } catch (error) {
        toast.error("Failed to delete the blog");
      }
    }
  };

  const excerpt = (str) => {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  };

  const onInputChange = (e) => {
    if(!e.target.value){
      loadBlogsData();
    }
    setSearchVal(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      setData(originalData); // Reset to original data if search input is empty
    } else {
      const filteredBlogs = originalData.filter((blog) =>
        blog.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setData(filteredBlogs);
    }
  };

  return (
    <MDBContainer className="my-4">
      <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch} />

      <MDBRow className="justify-content-center">
        {data.length === 0 ? (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Blogs Found
          </MDBTypography>
        ) : (
          <MDBCol>
            <MDBRow style={{ rowGap: "20px" }}>
              {data.map((item) => (
                <Blogs key={item.id} {...item} excerpt={excerpt} handleDelete={handleDelete} />
              ))}
            </MDBRow>
          </MDBCol>
        )}
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;
