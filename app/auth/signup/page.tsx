import { authUserSession } from "@/lib/auth";

import SignupForm  from "./form";

const SignUp = async () => {
  const session = await authUserSession();

  return <SignupForm session={session} />
}

export default SignUp;
