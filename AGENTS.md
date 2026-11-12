# Project Architecture Rules

- Use TanStack file-based routes and keep shared product views in reusable components so the public and dashboard surfaces remain consistent.
- Persist authenticated content through owner-scoped Lovable Cloud tables; isolate demo content as clearly labeled, browser-local sample data.
- Keep AI Gateway inference in authenticated server functions and handle final gateway failures without silently retrying generation.
