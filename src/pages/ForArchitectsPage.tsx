import { Navigate } from "react-router-dom";
import { routes } from "@/config/routes";

const ForArchitectsPage = () => {
  return <Navigate to={routes.downloads} replace />;
};

export default ForArchitectsPage;
