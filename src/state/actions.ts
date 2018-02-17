interface State {
  name: string;
  target: string;
  version: string;
}

const actions = {
  create(name: string, target: string): State {
    return {
      name: name,
      target: target,
      version: "1.5.8"
    };
  }
};

export { actions };