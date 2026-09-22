import Products from "./Products";

const devAuth = {
  user: { id: 0, name: "dev-user" },
  logout() {},
};

export default function App() {
  return <Products auth={devAuth} />;
}
