function baseHeaders(url) {
  return {
    accept: "application/json, text/event-stream",
    "accept-language": "ru,en;q=0.9",
    "content-type": "application/json",
    priority: "u=1, i",
    "sec-ch-ua":
      '"Chromium";v="124", "YaBrowser";v="24.6", "Not-A.Brand";v="99", "Yowser";v="2.5"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    Referer: url,
    "Referrer-Policy": "strict-origin-when-cross-origin",
    usesearch: "true",
  };
}
export default baseHeaders;
