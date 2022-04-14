module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["s.gravatar.com"],
  },
  async redirects() {
    return [
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "nhostRefreshToken",
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
            key: "nhostRefreshToken",
          },
        ],
        permanent: false,
        destination: "/",
      },
    ];
  },
};
