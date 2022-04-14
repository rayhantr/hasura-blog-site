import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
	backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND,
});

export { nhost };
