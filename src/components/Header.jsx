import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';
import { Form, Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faBookmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { fetchGames } from '../features/gamesSlice';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();

  // Debounce the search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        dispatch(fetchGames({ search: searchQuery }));
      } else {
        dispatch(fetchGames({})); // Reset to default games when search is cleared
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery, dispatch]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faGamepad} className="me-2 text-primary" style={{ fontSize: '1.5rem' }} />
          <span className="fw-bold">Game Browser</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-light">
                <FontAwesomeIcon icon={faSearch} className="text-dark" />
              </span>
              <Form.Control
                type="search"
                placeholder="Search games..."
                className="bg-light text-dark border-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
              />
            </div>
          </Form>
          <Nav className="ms-auto">
            {isSignedIn ? (
              <>
                <Nav.Link as={Link} to="/library" className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faBookmark} className="me-2 text-primary" />
                  <span>Library</span>
                </Nav.Link>
                <div className="ms-3">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="btn btn-primary">
                  Sign In
                </button>
              </SignInButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 