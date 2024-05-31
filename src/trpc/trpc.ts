import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../server";
import { httpBatchLink } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});
