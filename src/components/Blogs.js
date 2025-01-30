import React from 'react';
import { MDBCol, MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBCardText, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Badge from './Badge';

const Blogs = ({ title, category, description, id, imageUrl, excerpt, handleDelete }) => {
  return (
    <MDBCol size="4">
      <MDBCard className='h-100 mt-2' style={{ 
        maxWidth: "22rem", 
        borderRadius: "15px", 
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
        transition: "transform 0.3s ease", 
      }} 
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MDBCardImage
          src={imageUrl}
          alt={title}
          position="top"
          style={{ 
            maxWidth: "100%", 
            height: "180px", 
            borderTopLeftRadius: "15px", 
            borderTopRightRadius: "15px" 
          }}
        />

        <MDBCardBody style={{ paddingBottom: "20px" }}>
          <MDBCardTitle style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{title}</MDBCardTitle>
          <MDBCardText style={{ fontSize: "1rem", color: "#555" }}>
            {excerpt(description)} 
            <Link to={`/blog/${id}`} className="ms-2" style={{ color: "#007bff", textDecoration: "none" }}>
              Read more
            </Link>
          </MDBCardText>

          <Badge>
  {category}
</Badge>


          {/* Icons below category */}
          <div 
            className="d-flex gap-3"
            style={{
              position: "absolute",
              bottom: "2px",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "20px",
            }}
          >
            {/* Edit Icon */}
            <Link to={`/editBlog/${id}`} className="text-primary">
              <MDBIcon icon="edit" size="lg" style={{ cursor: "pointer" }} />
            </Link>

            {/* Delete Button */}
            <MDBBtn color="none" onClick={() => handleDelete(id)} style={{ padding: 0, cursor: "pointer" }}>
              <MDBIcon icon="trash" size="lg" style={{ color: "red" }} />
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default Blogs;
