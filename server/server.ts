import express from './config/express';

// Use env port or default
const port = process.env.PORT || 5000;

express.listen(port, () => console.log(`Server now running on port ${port}!`));
