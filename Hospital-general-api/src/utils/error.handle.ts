import { Response } from "express";

const handleHttp = (res: Response, error: any, message: string) => {
  const statusCode = error.status || 500;
  res.status(statusCode);
  res.json({ message, error: error.message });
};

export { handleHttp };