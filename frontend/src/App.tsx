import { AuthRoute, DashboardRoute } from "./routes";

const App = () => {
  const token = false;
  return token ? <DashboardRoute /> : <AuthRoute />
}

export default App
