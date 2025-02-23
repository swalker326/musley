export const mfConfig = {
  name: "email",
  filename: "remoteEntry.js",
  exposes: {
    "./RemoteEntry": "./src/remoteEntry.tsx"
  },
  shared: ["react", "react-dom"]
};
