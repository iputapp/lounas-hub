function deleteRequest(url: string, options?: RequestInit) {
  return fetch(url, {
    ...options,
    method: "DELETE",
  });
}

export { deleteRequest };
