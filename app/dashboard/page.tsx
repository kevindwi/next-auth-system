import { authUserSession } from "@/lib/auth";

const Dashboard = async () => {
  const session = await authUserSession();
  
  return (
		<main className=" bg-base-200">
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {session ? <h1 className="text-5xl font-bold">dashboard</h1> : <h1 className="text-5xl font-bold">login dulu</h1> }
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard;
