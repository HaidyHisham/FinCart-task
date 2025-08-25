import { NavLink } from 'react-router-dom';
import HeaderBasket from '../../ecommerce/HeaderBasket/HeaderBasket';
import { Badge } from 'react-bootstrap'
import styles from './styles.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const {headerContainer, headerLogo}= styles 
const Header = () => {
  return <header>
    <div className={headerContainer}>
    <h1 className={headerLogo}><Badge bg="danger">FinCart</Badge></h1>
    <HeaderBasket />
</div>
<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Products</Nav.Link>
            <Nav.Link as={NavLink} to="about">About</Nav.Link>
            <Nav.Link as={NavLink} to="categories">Categories</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="#ogin">Login</Nav.Link>
            <Nav.Link as={NavLink} to="register">Register</Nav.Link>
            

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 

  </header>
}

export default Header