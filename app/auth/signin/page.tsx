import { authUserSession } from "@/lib/auth";

import SigninForm  from "./form";

const SignIn = async () => {
  const session = await authUserSession();

  return <SigninForm session={session} />
}

export default SignIn;
