'use client';
// import Link from "next/link"
import { signOut } from "next-auth/react"

const ProfileButton = ({ user }) => {
  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Profile picture" src={user.image} />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          {/* <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li> */}
          <li> <button onClick={() => signOut()}>Sign out</button></li>
        </ul>
      </div>
    </>
  )
}

export default ProfileButton;
