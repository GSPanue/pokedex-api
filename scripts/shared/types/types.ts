type Config = {
  filename: string;
  keys: {
    requiredKeys: string[];
    selectedKeys: string[];
  };
  inputPath: string;
  outputPath: string;
};

export { Config };
