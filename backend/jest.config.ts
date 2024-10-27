module.exports = {  
  projects: [
    {
      displayName: "test:i9n",      
      testRegex: ".*\\.i9n\\.ts$",
      transform: {
        ".ts": "ts-jest"
      },
    },
  ],
};
