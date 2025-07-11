import { Card, CardContent, Typography } from '@mui/material';

const URLCard = ({ original, short, expiry }) => (
  <Card sx={{ my: 2, backgroundColor: '#e3f2fd' }}>
    <CardContent>
      <Typography><strong>Original URL:</strong> {original}</Typography>
      <Typography>
        <strong>Shortened URL:</strong>{' '}
        <a href={short} target="_blank" rel="noreferrer">{short}</a>
      </Typography>
      <Typography><strong>Expires At:</strong> {expiry}</Typography>
    </CardContent>
  </Card>
);

export default URLCard;
