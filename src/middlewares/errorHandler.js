import { HttpError } from 'http-errors';

export const erroeHandler = (err, req, res, next) => {

  console.error('Error Message:', err.message);
    console.error('Stack Trace:', err.stack);

    if (err instanceof HttpError) {
        res.status(err.status).json({
          status: err.status,
          message: err.name,
          data: err,
        });
        return;
      }
    
      res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: err.message,
      });
};