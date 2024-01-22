"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SigninForm = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        // // redirect after login
        // callbackUrl: `${window.location.origin}/` 
      });

      if (!res?.error) {
        router.push("/")
        setLoading(false)
      } else {
        setError("Invalid username or password");
      }
    } catch (error: any) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if(session){
      router.push("/")
    } else {
      setPageLoading(false)
    }
  }, []);

  if(!pageLoading) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={onSubmit}>
              
              <h1 className="text-3xl font-bold">Sign in</h1>
              {error}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" disabled={loading}>{ !loading ? 'Sign in' : 'loading...' }</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>
  }
};

export default SigninForm;
