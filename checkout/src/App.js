import Checkout from "./Checkout";

const devAuth = {
  user: { id: 0, name: "dev-user" },
  logout() {},
};

export default function App() {
  return <Checkout auth={devAuth} />;
}
