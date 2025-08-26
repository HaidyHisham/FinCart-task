import { NavLink } from "react-router-dom";
import HeaderBasket from "../../ecommerce/HeaderBasket/HeaderBasket";
import { Badge, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { clearSearch, setSearch } from "@store/search/searchSlice";
import styles from "./styles.module.css";

const { headerLogo } = styles;

const Header = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search.query);

  const [localSearch, setLocalSearch] = useState(search);

  // 🔹 debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch.length >= 3) {
        dispatch(setSearch(localSearch));
      } else {
        dispatch(clearSearch());
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [localSearch, dispatch]);

  return (
    <Navbar expand="lg" bg="light" variant="light" fixed="top" className="shadow-sm">
      <Container>
  
        <Navbar.Brand as={NavLink} to="/" className={headerLogo}>
          <Badge bg="danger" pill>
            FinCart
          </Badge>
        </Navbar.Brand>

   
        <div className="d-lg-none ms-auto">
          <HeaderBasket />
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
       
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categories">
              Categories
            </Nav.Link>
          </Nav>

         
          <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </Form>

         
          <div className="d-none d-lg-block">
            <HeaderBasket />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
