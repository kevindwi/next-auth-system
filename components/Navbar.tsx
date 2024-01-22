import Link from "next/link"
import { authUserSession } from "@/lib/auth"
import ProfileButton from './ProfileButton'

const ActionButton = () => {
  return (
    <>
      <Link href="/auth/signin" className="btn btn-ghost">Sign In</Link>
      <Link href="/auth/signup" className="btn btn-ghost">Sign Up</Link>
    </>
  )
}

const Navbar = async () => {
  const user = await authUserSession();
  
  return (
    <div className="p-3">
      <div className="navbar bg-base-100 drop-shadow-lg rounded-2xl">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">my app</a>
        </div>
        <div className="navbar-end">
          { user ? <ProfileButton user={user} /> : <ActionButton /> }
        </div>
      </div>
    </div>
  )
}

export default Navbar
