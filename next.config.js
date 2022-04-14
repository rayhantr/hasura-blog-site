module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["s.gravatar.com", "upload.wikimedia.org"],
  },
  async redirects() {
    return [
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "next-auth.session-token", // localhost
          },
        ],
        permanent: false,
        destination: "/",
      },
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "__Secure-next-auth.session-token", // production
          },
        ],
        permanent: false,
        destination: "/",
      },
      {
        source: "/register",
        has: [
          {
            type: "cookie",
            key: "next-auth.session-token", // localhost
          },
        ],
        permanent: false,
        destination: "/",
      },
      {
        source: "/register",
        has: [
          {
            type: "cookie",
            key: "__Secure-next-auth.session-token", // production
          },
        ],
        permanent: false,
        destination: "/",
      },
    ];
  },
};
