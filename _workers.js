export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== "/dns-query") {
      if (url.pathname === "/") {
        return new Response("hello world!");
      }
      return new Response("404", { status: 404 });
    }
    url.host = "1.1.1.1";
    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("connection");
    headers.delete("content-length");
    try {
      return fetch(url, {
        headers,
        method: request.method,
        body: request.body,
      });
    } catch (e) {
      return new Response(e.message, { status: 404 });
    }
  },
};
