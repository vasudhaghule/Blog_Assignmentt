import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from "mdb-react-ui-kit";

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <MDBNavbar expand="lg" light style={{ backgroundColor: "black" }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">
            <img src="/images/logoo.jpeg" alt="logo" style={{ height: "30px", width:"70px" }} />
          </MDBNavbarBrand>

          <MDBNavbarToggler
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded={show ? "true" : "false"}
            aria-label="Toggle navigation"
            style={{ color: "#fff" }}
            onClick={() => setShow(!show)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse show={show} navbar>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem className="active">
                <MDBNavbarLink aria-current="page" href="/" style={{ color: "#fff" }}>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/addBlog" style={{ color: "#fff" }}>
                  Add Blog
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Header;
