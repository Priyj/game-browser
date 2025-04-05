import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { removeFromLibrary, setCurrentUser } from '../features/librarySlice';
import { useUser } from '@clerk/clerk-react';

const Library = () => {
  const dispatch = useDispatch();
  const { games: libraryGames } = useSelector((state) => state.library);
  const { isSignedIn, user } = useUser();

  // Update library state when user signs in/out
  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(setCurrentUser(user.id));
    } else {
      dispatch(setCurrentUser(null));
    }
  }, [isSignedIn, user, dispatch]);

  const handleRemoveFromLibrary = (game) => {
    if (!isSignedIn) return;
    dispatch(removeFromLibrary(game.id));
  };

  if (!isSignedIn) {
    return (
      <div className="container mt-4">
        <Alert variant="warning">
          Please sign in to access your library.
        </Alert>
      </div>
    );
  }

  if (libraryGames.length === 0) {
    return (
      <div className="container mt-4">
        <Alert variant="info">
          Your library is empty. Start adding games to your library by clicking the bookmark icon on any game!
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Library</h2>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {libraryGames.map((game) => (
          <Col key={game.id}>
            <Card className="h-100 game-card">
              <Link to={`/game/${game.id}`} className="text-decoration-none">
                <Card.Img
                  variant="top"
                  src={game.background_image || 'https://via.placeholder.com/300x200'}
                  alt={game.name}
                  className="game-image"
                />
              </Link>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <Link to={`/game/${game.id}`} className="text-decoration-none">
                    <Card.Title className="text-dark">{game.name}</Card.Title>
                  </Link>
                  <button
                    className="bookmark-btn"
                    onClick={() => handleRemoveFromLibrary(game)}
                    aria-label="Remove from library"
                  >
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className="text-primary"
                      style={{ opacity: 1 }}
                    />
                  </button>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <small className="text-muted">
                    Rating: {game.rating?.toFixed(1) || 'N/A'}
                  </small>
                  <small className="text-muted">
                    Released: {game.released?.split('-')[0] || 'N/A'}
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Library; 