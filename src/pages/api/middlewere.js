import nextConnect from 'next-connect';
import authMiddleware from '../middleware/auth';

const handler = nextConnect();

handler.use(authMiddleware);

handler.get((req, res) => {
  // Handle GET request
});

handler.post((req, res) => {
  // Handle POST request
});

export default handler;