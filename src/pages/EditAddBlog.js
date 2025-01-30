import React, { useEffect, useState } from "react";
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  category: "",
  tags: "",
  imageUrl: "",
};

const options = ["Travel", "Fashion", "Tech", "Sports", "Food", "Fitness"];

const EditAddBlog = () => {
  const [formval, setFormVal] = useState(initialState);
  const { title, description, category, tags, imageUrl } = formval;
  const [image, setImage] = useState(null);
  const [categoryErr, setCategoryErr] = useState(null);
  const [editmode, setEditmode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditmode(true);
      getSingleBlog(id);
    } else {
      setEditmode(false);
      setFormVal({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        setFormVal(response.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error fetching the blog data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate fields
    if (!title) {
      toast.error("Please fill the title");
      return;
    }
    if (!description) {
      toast.error("Please fill the description");
      return;
    }
    if (!category) {
      toast.error("Please choose a category");
      return;
    }
    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const updatedData = { ...formval };

      let response;
      if (editmode) {
        
        response = await axios.put(`http://localhost:5000/blogs/${id}`, updatedData);
      } else {
       
        response = await axios.post("http://localhost:5000/blogs", updatedData);
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(editmode ? "Blog updated successfully!" : "Blog added successfully!");
        setFormVal({ ...initialState });
        navigate("/"); // Redirect to home
      } else {
        toast.error(editmode ? "Failed to update the blog" : "Failed to add blog");
      }
    } catch (error) {
      toast.error("Error submitting blog: " + error.message);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormVal({ ...formval, [name]: value });
  };

  const onUploadImg = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vasudha");

    axios
      .post("http://api.cloudinary.com/v1_1/dhoc2sffd/image/upload", formData)
      .then((resp) => {
        setFormVal({ ...formval, imageUrl: resp.data.url });
        toast.success("Image uploaded successfully!");
      })
      .catch((err) => toast.error("Image upload failed!"));
  };

  const onCategoryChange = (e) => {
    setCategoryErr(null);
    setFormVal({ ...formval, category: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "20px" }}>
      <div className="p-4 shadow-lg rounded" style={{ backgroundColor: "#fff", maxWidth: "500px", width: "100%" }}>
        <MDBValidation className="row g-3" onSubmit={handleSubmit}>
          <p className="fs-2 fw-bold text-center">{editmode ? "Edit Blog" : "Add Blog"}</p>

          <MDBInput
            value={title}
            name="title"
            type="text"
            onChange={onInputChange}
            required
            placeholder="Enter blog title"
            validation="Please fill the title"
          />
          <br />

          <MDBTextArea
            value={description}
            name="description"
            onChange={onInputChange}
            required
            placeholder="Enter blog description..."
            validation="Please fill the description"
            rows={7}
          />
          <br />

          <input type="file" className="form-control" onChange={(e) => onUploadImg(e.target.files[0])} required />
          <br />

          <select className="form-select" onChange={onCategoryChange} value={category} required>
            <option value="">Please choose a category</option>
            {options.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          <br />

          {categoryErr && <div className="text-danger">{categoryErr}</div>}

          <div className="d-flex justify-content-between">
            <MDBBtn color="danger" onClick={() => navigate("/")}>
              Back
            </MDBBtn>
            <MDBBtn type="submit">{editmode ? "Update" : "Add"}</MDBBtn>
          </div>
        </MDBValidation>
      </div>
    </div>
  );
};

export default EditAddBlog;
