import AuthForm from "@/components/AuthForm/AuthForm";
import { AuthProvider } from "@/context/useAuth";

export default function SignUp() {
  return (
    <AuthProvider>
      <AuthForm mode="signup" /> 
    </AuthProvider>
  )
}
