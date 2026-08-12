import { Request, Response } from 'express';

/**
 * Public verification endpoint scaffold.
 * NOTE: token handling, HMAC lookup, state transitions and scan recording are TODO.
 * This scaffold intentionally does NOT log the raw token.
 */
export const verify = async (req: Request, res: Response) => {
  const { token } = req.params;

  // TODO: implement:
  // - validate token format
  // - compute keyed HMAC digest using AUTH_TOKEN_PEPPER
  // - lookup product by token hash in DB
  // - enforce lifecycle rules and record scan event (without storing raw token)
  // For now, return a safe placeholder response.

  res.json({ status: 'UNIMPLEMENTED', message: 'Verification logic not implemented yet' });
};
