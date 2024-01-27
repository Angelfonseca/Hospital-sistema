import { Response } from "express";

const handleHttp = (res: Response, code: number, error: string) => {
  res.status(code);
  res.send({ error });
};

export { handleHttp };