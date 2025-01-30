import React, { useEffect, useState } from 'react';
import { MDBIcon, MDBContainer, MDBCardTitle, MDBRow, MDBCol, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from "mdb-react-ui-kit";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Badge from '../components/Badge';

const Sblog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);

  const getSingleBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        setBlog(response.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to fetch blog");
    }
  };

  return (
    <MDBContainer style={{ maxWidth: "100%", margin: "10px auto", padding: "20px", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #d1ebe8" }}>
    
      <Link to="/" style={{ padding: "5px 15px", color: "black", fontWeight: "bold", textDecoration: "none", borderRadius: "5px", fontSize: "16px", position: "absolute", left: "20px", top: "80px" }}>
        <strong>Go Back</strong>
      </Link>

     
      <MDBTypography style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "bold", color: "#333", marginTop: "10px" }}>
        {blog ? blog.title : 'Loading...'}
      </MDBTypography>

      <MDBCard style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", marginTop: "20px" }}>
       
        <MDBCardImage
          src={blog ? blog.imageUrl : '#'}
          alt={blog ? blog.title : 'Loading...'}
          position="top"
          style={{ width: "100%", height: "600px", objectFit: "cover", borderRadius: "10px" }}
        />
        <MDBCardBody style={{ padding: "20px" }}>
      
          <MDBCardText style={{ fontSize: "1.1rem", color: "#555", lineHeight: "1.6" }}>
            {blog ? blog.description : 'Loading...'}
          </MDBCardText>
          
          <div style={{ marginTop: "10px", fontWeight: "bold", color: "#007bff" }}>
            <Badge>{blog ? blog.category : 'Loading...'}</Badge>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Sblog;
