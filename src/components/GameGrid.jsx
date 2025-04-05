import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Spinner, Alert, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchGames, setPage } from '../features/gamesSlice';
import { addToLibrary, removeFromLibrary, setCurrentUser } from '../features/librarySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faStar, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useUser, SignInButton } from '@clerk/clerk-react';

const GameGrid = () => {
  const dispatch = useDispatch();
  const { games, loading, error, filters, totalPages, currentPage } = useSelector((state) => state.games);
  const { games: libraryGames } = useSelector((state) => state.library);
  const { isSignedIn, user } = useUser();
  const [showSignInMessage, setShowSignInMessage] = useState(false);

  // Update library state when user signs in/out
  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(setCurrentUser(user.id));
    } else {
      dispatch(setCurrentUser(null));
    }
  }, [isSignedIn, user, dispatch]);

  useEffect(() => {
    dispatch(fetchGames({ filters, page: currentPage }));
  }, [dispatch, filters, currentPage]);

  const handleBookmark = (game, isBookmarked) => {
    if (!isSignedIn) {
      setShowSignInMessage(true);
      return;
    }
    if (isBookmarked) {
      dispatch(removeFromLibrary(game.id));
    } else {
      dispatch(addToLibrary(game));
    }
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    dispatch(fetchGames({ filters, page }));
  };

  // Memoize pagination range calculation
  const paginationRange = useMemo(() => {
    const range = [];
    const windowSize = 4;
    let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
    let end = Math.min(totalPages, start + windowSize - 1);

    if (end - start + 1 < windowSize) {
      start = Math.max(1, end - windowSize + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }, [currentPage, totalPages]);

  if (loading && games.length === 0) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-5">
        {error}
      </Alert>
    );
  }

  if (!loading && games.length === 0) {
    return (
      <div className="text-center my-5">
        <h5>No games found. Try adjusting your filters.</h5>
      </div>
    );
  }

  return (
    <div className="game-grid position-relative">
      {showSignInMessage && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: 'auto',
            minWidth: '300px'
          }}
        >
          <Alert 
            variant="warning" 
            onClose={() => setShowSignInMessage(false)} 
            dismissible
            className="shadow"
          >
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-center mb-2">
                <FontAwesomeIcon icon={faBookmark} className="me-2 text-warning" />
                <span>Please sign in to add games to your library!</span>
              </div>
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-sm">Sign In</button>
              </SignInButton>
            </div>
          </Alert>
        </div>
      )}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {games.map((game) => {
          const isBookmarked = libraryGames.some((g) => g.id === game.id);
          return (
            <Col key={game.id}>
              <Card className="h-100 game-card">
                <Link to={`/game/${game.id}`} className="text-decoration-none">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={game.background_image || 'https://via.placeholder.com/300x200'}
                      alt={game.name}
                      className="game-image"
                    />
                    <div className="position-absolute top-0 end-0 p-2">
                      <button
                        className="bookmark-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookmark(game, isBookmarked);
                        }}
                        aria-label={isBookmarked ? 'Remove from library' : 'Add to library'}
                      >
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className={isBookmarked ? 'text-primary' : 'text-secondary'}
                          style={{ opacity: isBookmarked ? 1 : 0.5 }}
                        />
                      </button>
                    </div>
                  </div>
                </Link>
                <Card.Body>
                  <Link to={`/game/${game.id}`} className="text-decoration-none">
                    <Card.Title className="text-dark">{game.name}</Card.Title>
                  </Link>
                  <div className="d-flex justify-content-between mt-2">
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faStar} className="text-warning me-1" />
                      {game.rating?.toFixed(1) || 'N/A'}
                    </small>
                    <small className="text-muted">
                      <FontAwesomeIcon icon={faCalendar} className="me-1" />
                      {game.released?.split('-')[0] || 'N/A'}
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {paginationRange.map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
                className={page === currentPage ? 'active' : ''}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
            <Pagination.Last
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default GameGrid; 