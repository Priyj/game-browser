import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import { setFilters, clearFilters } from '../features/gamesSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.games);

  const handleFilterChange = (type, value) => {
    if (type === 'genres') {
      if (JSON.stringify(filters.genres) !== JSON.stringify(value)) {
        dispatch(setFilters({ ...filters, genres: value }));
      }
    } else if (type === 'platforms') {
      if (JSON.stringify(filters.platforms) !== JSON.stringify(value)) {
        dispatch(setFilters({ ...filters, platforms: value }));
      }
    } else if (type === 'dates') {
      if (filters.dates !== value) {
        dispatch(setFilters({ ...filters, dates: value }));
      }
    } else if (type === 'ordering') {
      if (filters.ordering !== value) {
        dispatch(setFilters({ ...filters, ordering: value }));
      }
    }
  };

  const handleClearFilters = () => {
    if (filters.genres.length > 0 || filters.platforms.length > 0 || filters.dates || filters.ordering !== '-rating') {
      dispatch(clearFilters());
    }
  };

  const handleCheckboxChange = (type, value) => {
    const currentValues = filters[type];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleFilterChange(type, newValues);
  };

  return (
    <Card className="sidebar">
      <Card.Body>
        <h5 className="mb-3">Filters</h5>
        
        <Form.Group className="mb-3">
          <Form.Label>Sort By</Form.Label>
          <Form.Select
            value={filters.ordering}
            onChange={(e) => handleFilterChange('ordering', e.target.value)}
            className="filter-select"
          >
            <option value="-metacritic">Metacritic Score</option>
            <option value="-rating">Rating (Highest)</option>
            <option value="rating">Rating (Lowest)</option>
            <option value="-released">Release Date (Newest)</option>
            <option value="released">Release Date (Oldest)</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Release Date</Form.Label>
          <Form.Select
            value={filters.dates}
            onChange={(e) => handleFilterChange('dates', e.target.value)}
            className="filter-select"
          >
            <option value="">All Time</option>
            <option value="2020-01-01,2024-12-31">2020s</option>
            <option value="2010-01-01,2019-12-31">2010s</option>
            <option value="2000-01-01,2009-12-31">2000s</option>
            <option value="1990-01-01,1999-12-31">1990s</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Platforms</Form.Label>
          <div className="filter-options">
            <Form.Check
              type="checkbox"
              id="platform-4"
              label="PC"
              checked={filters.platforms.includes('4')}
              onChange={() => handleCheckboxChange('platforms', '4')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="platform-187"
              label="PlayStation 5"
              checked={filters.platforms.includes('187')}
              onChange={() => handleCheckboxChange('platforms', '187')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="platform-18"
              label="PlayStation 4"
              checked={filters.platforms.includes('18')}
              onChange={() => handleCheckboxChange('platforms', '18')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="platform-1"
              label="Xbox One"
              checked={filters.platforms.includes('1')}
              onChange={() => handleCheckboxChange('platforms', '1')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="platform-186"
              label="Xbox Series S/X"
              checked={filters.platforms.includes('186')}
              onChange={() => handleCheckboxChange('platforms', '186')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="platform-7"
              label="Nintendo Switch"
              checked={filters.platforms.includes('7')}
              onChange={() => handleCheckboxChange('platforms', '7')}
              className="filter-option"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genres</Form.Label>
          <div className="filter-options">
            <Form.Check
              type="checkbox"
              id="genre-4"
              label="Action"
              checked={filters.genres.includes('4')}
              onChange={() => handleCheckboxChange('genres', '4')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-51"
              label="Indie"
              checked={filters.genres.includes('51')}
              onChange={() => handleCheckboxChange('genres', '51')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-3"
              label="Adventure"
              checked={filters.genres.includes('3')}
              onChange={() => handleCheckboxChange('genres', '3')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-5"
              label="RPG"
              checked={filters.genres.includes('5')}
              onChange={() => handleCheckboxChange('genres', '5')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-10"
              label="Strategy"
              checked={filters.genres.includes('10')}
              onChange={() => handleCheckboxChange('genres', '10')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-2"
              label="Shooter"
              checked={filters.genres.includes('2')}
              onChange={() => handleCheckboxChange('genres', '2')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-40"
              label="Casual"
              checked={filters.genres.includes('40')}
              onChange={() => handleCheckboxChange('genres', '40')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-14"
              label="Simulation"
              checked={filters.genres.includes('14')}
              onChange={() => handleCheckboxChange('genres', '14')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-7"
              label="Puzzle"
              checked={filters.genres.includes('7')}
              onChange={() => handleCheckboxChange('genres', '7')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-11"
              label="Arcade"
              checked={filters.genres.includes('11')}
              onChange={() => handleCheckboxChange('genres', '11')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-83"
              label="Platformer"
              checked={filters.genres.includes('83')}
              onChange={() => handleCheckboxChange('genres', '83')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-1"
              label="Racing"
              checked={filters.genres.includes('1')}
              onChange={() => handleCheckboxChange('genres', '1')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-15"
              label="Sports"
              checked={filters.genres.includes('15')}
              onChange={() => handleCheckboxChange('genres', '15')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-6"
              label="Fighting"
              checked={filters.genres.includes('6')}
              onChange={() => handleCheckboxChange('genres', '6')}
              className="filter-option"
            />
            <Form.Check
              type="checkbox"
              id="genre-19"
              label="Family"
              checked={filters.genres.includes('19')}
              onChange={() => handleCheckboxChange('genres', '19')}
              className="filter-option"
            />
          </div>
        </Form.Group>

        <Button
          variant="outline-secondary"
          className="w-100"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Sidebar; 