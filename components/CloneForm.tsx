import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert, FormControl, FormHelperText, useTheme , AppBar , Toolbar } from '@mui/material';

const CloneForm: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoUrlError, setRepoUrlError] = useState('');
  const [modificationMessage, setModificationMessage] = useState('');
  const [status, setStatus] = useState('');
  const [showInputField, setShowInputField] = useState(false);

  const theme = useTheme();
  const githubUrlRegex =  /^(https:\/\/github\.com\/(?:[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+)$)|(git@github\.com:[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+\.git)$/;

  const validateGithubUrl = () => {
    let isValid = true;
    if (!repoUrl) {
      setRepoUrlError('Repository URL is required');
      isValid = false;
    }
    else if (!githubUrlRegex.test(repoUrl)) {
      setRepoUrlError('Please enter a valid GitHub URL (e.g., https://github.com/username/repository).');
      setShowInputField(false);
      isValid = false;
    }
    else{
      setRepoUrlError('');
    }
    return isValid;
  };

  const handleClone = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');  
    if (!validateGithubUrl()) {
      return;
    }
    try {
      setStatus('Cloning repository...');
      const response = await fetch('/api/clone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl}),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus(result.message);
        setShowInputField(true);

      } else {
        setStatus(result.message || 'An error occurred.');
      }
    } catch (error) {
      setStatus('Failed to clone repository');
    }
  };

  const handlePush = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');  
    if (!validateGithubUrl()) {
      return;
    }
    try {
      setStatus('Pushing Changes...');
      const response = await fetch('/api/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl , modificationMessage}),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus(result.message);
      } else {
        setStatus(result.message || 'An error occurred.');
      }
    } catch (error) {
      setStatus('Failed to push changes.');
    }
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static"  sx={{ backgroundColor: '#FF6633' , borderRadius: '5px',}}>
        <Toolbar>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: '40px', marginRight: theme.spacing(2) }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Adaptavist Git Project
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" component="h6" gutterBottom>
          Clone and Modify Git Repository
        </Typography>
        <form >
          <FormControl fullWidth sx={{ mb: 2 }} error={!repoUrlError}>
            <TextField
              label="Repository URL"
              variant="outlined"
              value={repoUrl}
              sx={{ marginBottom: theme.spacing(2), width: '100%' , '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6633', // specify your desired color here
                    color : '#FF6633'
                  },
                }}}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
            <FormHelperText>{repoUrlError}</FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
            { showInputField && <TextField
              label="Enter message to modify (Optional)"
              variant="outlined"
              value={modificationMessage}
              sx={{ marginBottom: theme.spacing(2), width: '100%' , '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6633', // specify your desired color here
                    color : '#FF6633'
                  },
                }}
              }
              onChange={(e) => setModificationMessage(e.target.value)}
              
            /> }
          </FormControl>
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: theme.spacing(0, 2),
            boxSizing: 'border-box', 
          }} 
          gap={2}>
            <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#FF6633', color: '#fff', '&:hover': theme.palette.secondary.main }} onClick={handleClone}>
              Clone Repository
            </Button>
            <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#FF6633'}} disabled={!showInputField} onClick={handlePush} >
              Modify and Push Changes
            </Button>
         </Box>
        </form>
        {status && (
          <Box sx={{ mt: 2 }}>
            <Alert severity={status.includes('successfully') ? 'success' : 'error'}>{status}</Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CloneForm;
