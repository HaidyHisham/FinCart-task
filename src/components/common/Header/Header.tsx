import { NavLink } from 'react-router-dom';
import HeaderBasket from '../../ecommerce/HeaderBasket/HeaderBasket';
import { Badge, Form } from 'react-bootstrap'
import styles from './styles.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useEffect, useState } from 'react';
import { clearSearch, setSearch } from '@store/search/searchSlice';
const {headerContainer, headerLogo}= styles 
const Header = () => {

    const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search.query);

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch.length >= 3) {
        dispatch(setSearch(localSearch));
      } else {
        dispatch(clearSearch()); // reset when less than 3 chars
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(handler);
  }, [localSearch, dispatch]);

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
             <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search products..."
        className="me-2"
        aria-label="Search"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </Form>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
 

  </header>
}

export default Header