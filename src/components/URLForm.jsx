import { useState } from 'react';
import {
  TextField, Button, Box, Typography, Paper, Grid,
  Snackbar, Alert
} from '@mui/material';
import { logEvent } from '../utils/logger';
import { validateURL, validateShortcode, validateValidity } from '../utils/validators';

const URLForm = ({ onShorten }) => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addMore = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = () => {
    const validated = urls.map(item => {
      const errors = {};
      if (!validateURL(item.longUrl)) errors.longUrl = 'Invalid URL';
      if (item.validity && !validateValidity(item.validity)) errors.validity = 'Invalid validity';
      if (item.shortcode && !validateShortcode(item.shortcode)) errors.shortcode = 'Invalid shortcode';
      return { ...item, errors };
    });

    const hasError = validated.some(v => Object.keys(v.errors).length > 0);
    if (hasError) {
      logEvent("ValidationFailed", validated);
      setSnack({ open: true, message: 'Please fix form errors.', severity: 'error' });
    } else {
      logEvent("FormSubmitted", validated);
      setSnack({ open: true, message: 'Shortened successfully!', severity: 'success' });
      onShorten(validated);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Enter up to 5 URLs:</Typography>

      {urls.map((item, index) => (
        <Paper key={index} sx={{ p: 3, mb: 2, backgroundColor: '#f5f5f5' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Long URL"
                fullWidth
                value={item.longUrl}
                onChange={e => handleChange(index, 'longUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Validity (minutes)"
                fullWidth
                value={item.validity}
                onChange={e => handleChange(index, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Preferred Shortcode"
                fullWidth
                value={item.shortcode}
                onChange={e => handleChange(index, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={addMore} disabled={urls.length >= 5}>+ Add More</Button>
        <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default URLForm;
