import { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Container } from '@mui/material';

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('shortenedURLs')) || [];
    setData(items);
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>📊 URL Shortening Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Shortened URL</TableCell>
            <TableCell>Expires At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.original}</TableCell>
              <TableCell>
                <a href={item.short} target="_blank" rel="noreferrer">{item.short}</a>
              </TableCell>
              <TableCell>{item.expiry}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Statistics;
