import { Router, type Request, type Response } from 'express';
import { fetchNumbers, mergeLists } from '../utils/helper';

const router = Router();

// Route to handle the "/numbers" endpoint
router.get('/numbers', async (req: Request, res: Response) => {
  // get all urls from the querys param
  const urls_arr: string[] = req.query.url as string[];

  // fetch numbers from each urls
  const jobs: Promise<number[]>[] = urls_arr.map((url) => fetchNumbers(url));

  // check if all promises is resolved
  const validNumbersLists = await Promise.allSettled(jobs);

  const validNumbers: number[][] = validNumbersLists
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<number[]>).value);

  // merge all numbes from each list
  const finalResult = await mergeLists(validNumbers);

  // jsonify the finalResult
  res.json({ numbers: finalResult });
});

export { router };
