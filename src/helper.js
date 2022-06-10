import { TIMEOUT_SEC } from './config';

const timeout = function (s = TIMEOUT_SEC) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${s} second. <br/> Please try again...`
        )
      );
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok)
      throw new Error(`Bad Request: ${data.message} (Status:${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
