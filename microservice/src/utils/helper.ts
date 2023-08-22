import axios from 'axios';

// fetch numbers from a given URL
async function fetchNumbers(url: string): Promise<number[]> {
  const { data, status } = await axios.get(url);

  if (status === 200) {
    return data!.numbers;
  }
  return [];
}

// merge and sort unique numbers from multiple lists
async function mergeLists(lists: number[][]): Promise<number[]> {
  const merged: number[] = [];

  for (const lst of lists) {
    for (const num of lst) {
      if (!merged.includes(num)) {
        merged.push(num);
      }
    }
  }
  return merged.sort((a, b) => a - b);
}

export { fetchNumbers, mergeLists };

