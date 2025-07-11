import { useState } from 'react';
import { Container, Typography, Divider } from '@mui/material';
import URLForm from '../components/URLForm';
import URLCard from '../components/URLCard';

const Home = () => {
  const [results, setResults] = useState([]);

  const handleShorten = (data) => {
    const newResults = data.map(item => ({
      original: item.longUrl,
      short: `http://localhost:3000/${item.shortcode || Math.random().toString(36).substring(2, 8)}`,
      expiry: new Date(Date.now() + (item.validity || 30) * 60000).toLocaleString()
    }));

    setResults(newResults);
    localStorage.setItem("shortenedURLs", JSON.stringify([...results, ...newResults]));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" color="primary">🔗 Smart URL Shortener</Typography>

      <URLForm onShorten={handleShorten} />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>📋 Shortened URLs</Typography>
      {results.length === 0
        ? <Typography>No URLs yet. Start shortening!</Typography>
        : results.map((r, i) => <URLCard key={i} {...r} />)
      }
    </Container>
  );
};

export default Home;
