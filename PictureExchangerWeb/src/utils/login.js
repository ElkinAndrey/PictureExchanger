import parseJwt from "./parseJwt";

const login = (jwt, paramsChange) => {
  localStorage.setItem("jwt", jwt);
  const newParams = parseJwt(jwt);
  paramsChange({
    id: newParams.id,
    name: newParams.name,
    email: newParams.email,
    role: newParams.role,
  });
};

export default login;
