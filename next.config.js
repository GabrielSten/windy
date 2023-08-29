/** @type {import('next').NextConfig} */
const nextConfig = {
  // redirects the client to the initial place
  async redirects() {
    return [
      { source: "/", destination: "/places/gothenburg", permanent: true },
    ];
  },
  // for the docker image:
  output: "standalone",
};

module.exports = nextConfig;
