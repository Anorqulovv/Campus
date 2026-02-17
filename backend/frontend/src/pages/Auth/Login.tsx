import { FaEye, FaUser } from "react-icons/fa";
import { Button, Input, Spinner } from "../../components";
import { Link } from "react-router-dom";
import { useState, type SubmitEvent } from "react";
import { instance } from "../../hooks";
import toast from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  function handleSubmit(evt:SubmitEvent<HTMLFormElement>){
    setLoading(true)
    evt.preventDefault();
    const data = {
      username: evt.target.identifier.value,
      password: evt.target.password.value
    }
    instance().post("/auth/signin",data).then(() => {
      toast.success(`succes ${data.username}`)
    }).finally(()=> setLoading(false))
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-5 
      bg-linear-to-br from-[#0f172a]">

      <div className="w-full max-w-md backdrop-blur-2xl rounded-3xl p-10 
        shadow-[0_25px_80px_rgba(0,0,0,0.6)] border border-white/5">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-3">
            Welcome back
          </p>

          <h1 className="text-3xl font-extrabold text-white">
            Log into your account<span className="text-[#4A9FF5]">.</span>
          </h1>

          <p className="text-sm text-white/60 mt-3">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#4A9FF5] font-semibold hover:text-[#6BB5FF]"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* FORM */}
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Username */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Username
            </label>

            <div className="relative">
              <Input
                type="text"
                name="identifier"
                placeholder="username"
                extraClass="w-full py-3 px-4 pr-10 bg-white/5 border border-white/10 rounded-xl text-white"
              />

              <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Password
            </label>

            <div className="relative">
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                extraClass="w-full py-3 px-4 pr-12 bg-white/5 border border-white/10 rounded-xl text-white"
              />

              {/* faqat icon (UI) */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                <FaEye />
              </span>
            </div>
          </div>

          {/* Remember */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex gap-2 text-white/60">
              <input
                type="checkbox"
                name="remember"
                className="accent-[#4A9FF5]"
              />
              Remember me
            </label>

            <a href="#" className="text-white/50 hover:text-[#4A9FF5]">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <Button
            type="submit"
            extraClass="mt-4 py-3 bg-linear-to-r from-[#4A9FF5] to-[#357ABD] 
              text-white rounded-xl font-bold hover:scale-[1.02]"
          >
           {loading ? <Spinner /> : "Log in"} 
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
