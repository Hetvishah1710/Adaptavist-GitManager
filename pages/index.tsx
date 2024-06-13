import React from 'react';
import CloneForm from '../components/CloneForm';
import { Container, Typography, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 , display: 'flex',
  alignItems: 'center',
  border: '1px solid #AAA', // Specify border properties here
  borderRadius: '5px',
  padding: '10px', // Example padding
  marginRight: 'auto',}}>
        <CloneForm />
      </Box>
    </Container>
  );
};

export default Home;
