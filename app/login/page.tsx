import AuthForm from "../../components/AuthForm/AuthForm";
import { AuthProvider } from "@/context/useAuth";

export default function Login() {
  return (
    <AuthProvider>
      <AuthForm mode="login" />
    </AuthProvider>
  );
}
