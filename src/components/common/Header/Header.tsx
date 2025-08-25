import { NavLink } from "react-router-dom";
import HeaderBasket from "../../ecommerce/HeaderBasket/HeaderBasket";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import styles from "./styles.module.css";

const { headerLogo } = styles;

const Header = () => {
  return (
    <Navbar expand="lg" fixed="top" bg="light" className="shadow-sm">
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand as={NavLink} to="/" className={headerLogo}>
          <Badge bg="danger" pill>
            FinCart
          </Badge>
        </Navbar.Brand>

        {/* Responsive Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Nav Links */}
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

          <Nav>
            <HeaderBasket />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
