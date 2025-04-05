import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Badge, Spinner, Button } from 'react-bootstrap';
import { fetchGameDetails } from '../features/gamesSlice';
import { addToLibrary, removeFromLibrary } from '../features/librarySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBookmark, faCalendar, faGamepad } from '@fortawesome/free-solid-svg-icons';

const GameDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGame, loading } = useSelector((state) => state.games);
  const libraryGames = useSelector((state) => state.library.games);

  useEffect(() => {
    dispatch(fetchGameDetails(id));
  }, [dispatch, id]);

  const handleLibraryToggle = () => {
    if (libraryGames.some((game) => game.id === currentGame?.id)) {
      dispatch(removeFromLibrary(currentGame.id));
    } else {
      dispatch(addToLibrary(currentGame));
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!currentGame) {
    return <div>Game not found</div>;
  }

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src={currentGame.background_image}
              alt={currentGame.name}
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1>{currentGame.name}</h1>
                <Button
                  variant="link"
                  onClick={handleLibraryToggle}
                  className="p-0"
                  title="Toggle Library"
                >
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={libraryGames.some((game) => game.id === currentGame.id) ? 'text-primary' : 'text-secondary'}
                    style={{ opacity: libraryGames.some((game) => game.id === currentGame.id) ? 1 : 0.5 }}
                    size="lg"
                  />
                </Button>
              </div>
              <div className="mb-3">
                <FontAwesomeIcon icon={faStar} className="text-warning me-1" />
                <span className="me-3">
                  {currentGame.rating} / {currentGame.rating_top}
                </span>
                <FontAwesomeIcon icon={faCalendar} className="me-1" />
                <span>{new Date(currentGame.released).toLocaleDateString()}</span>
              </div>
              <div className="mb-3">
                {currentGame.genres.map((genre) => (
                  <Badge key={genre.id} bg="secondary" className="me-1">
                    {genre.name}
                  </Badge>
                ))}
              </div>
              <div dangerouslySetInnerHTML={{ __html: currentGame.description }} />
            </Card.Body>
          </Card>

          {currentGame.screenshots?.length > 0 && (
            <Card className="mb-4">
              <Card.Header>Screenshots</Card.Header>
              <Card.Body>
                <Row>
                  {currentGame.screenshots.map((screenshot) => (
                    <Col key={screenshot.id} xs={6} className="mb-3">
                      <img
                        src={screenshot.image}
                        alt={`${currentGame.name} screenshot`}
                        className="img-fluid rounded"
                      />
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>Game Info</Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h5>Platforms</h5>
                <div className="d-flex flex-wrap gap-1">
                  {currentGame.platforms.map((platform) => (
                    <Badge key={platform.platform.id} bg="info">
                      {platform.platform.name}
                    </Badge>
                  ))}
                </div>
              </div>
              {currentGame.developers?.length > 0 && (
                <div className="mb-3">
                  <h5>Developers</h5>
                  <div className="d-flex flex-wrap gap-1">
                    {currentGame.developers.map((developer) => (
                      <Badge key={developer.id} bg="secondary">
                        {developer.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {currentGame.publishers?.length > 0 && (
                <div className="mb-3">
                  <h5>Publishers</h5>
                  <div className="d-flex flex-wrap gap-1">
                    {currentGame.publishers.map((publisher) => (
                      <Badge key={publisher.id} bg="secondary">
                        {publisher.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {currentGame.website && (
                <div className="mb-3">
                  <h5>Website</h5>
                  <a href={currentGame.website} target="_blank" rel="noopener noreferrer">
                    {currentGame.website}
                  </a>
                </div>
              )}
            </Card.Body>
          </Card>

          {currentGame.requirements?.en && (
            <Card>
              <Card.Header>System Requirements</Card.Header>
              <Card.Body>
                <div dangerouslySetInnerHTML={{ __html: currentGame.requirements.en }} />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetail; 