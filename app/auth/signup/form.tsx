"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SignupForm = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      name,
      username,
      email,
      password,
    };

    // console.log(JSON.stringify(newUser))
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.userExists) {
        setError(data.message);
      } else {
        setName('');
        setEmail('');
        setUsername('');
        setPassword('');
        router.push("/auth/signin")
      }

      setLoading(false)
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
              
              <h1 className="text-3xl font-bold">Sign up</h1>
              {error}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
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
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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

export default SignupForm;
