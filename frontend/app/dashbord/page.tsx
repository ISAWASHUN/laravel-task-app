import DashboardComponent from "@/components/client/DashBoardCompnent"
import { NextAuthProvider } from "../providers"


const RegisterPage = () => {
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <NextAuthProvider>
        <DashboardComponent />
      </NextAuthProvider>
    </div>
  )
}
export default RegisterPage