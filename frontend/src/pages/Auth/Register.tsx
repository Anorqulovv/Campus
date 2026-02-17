import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Spinner } from "../../components";
import { useState, type SubmitEvent } from "react";
import { RegisterFn } from "../../service";

export interface IData {
  fullName: string;
  username: string;
  password: string
  email: string;
  age: number;
}

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    setLoading(true)
    evt.preventDefault();
    const data: IData = {
      fullName: evt.target.fullName.value,
      username: evt.target.username.value,
      password: evt.target.password.value,
      email: evt.target.email.value,
      age: evt.target.age.value
    }
    RegisterFn(data,navigate,setLoading)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-linear-to-br from-[#0f172a] ">
      <div className="w-full max-w-md backdrop-blur-2xl rounded-3xl p-10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] border border-white/5">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-3">
            START FOR FREE
          </p>

          <h1 className="text-3xl font-extrabold text-white">
            Create new account<span className="text-[#4A9FF5]">.</span>
          </h1>

          <p className="text-sm text-white/60 mt-3">
            Already a member?{" "}
            <Link to="/login" className="text-[#4A9FF5] font-semibold hover:text-[#6BB5FF]">
              Log In
            </Link>
          </p>
        </div>

        {/* FORM */}
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-white text-sm mb-2 block">Full Name</label>
            <Input type="text" name="fullName" placeholder="John Carter" extraClass="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white" />
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Username</label>
            <Input type="text" name="username" placeholder="johnny" extraClass="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white" />
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Email</label>
            <Input type="email" name="email" placeholder="example@mail.com" extraClass="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white" />
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Password</label>
            <div className="relative">
              <Input type="password" name="password" placeholder="••••••••" extraClass="w-full py-3 px-4 pr-12 bg-white/5 border border-white/10 rounded-xl text-white" />
            </div>
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Age</label>
            <Input type="number" name="age" placeholder="18+" extraClass="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white" />
          </div>

          <Button
            type="submit"
            extraClass="mt-4 py-3 bg-linear-to-r from-[#4A9FF5] to-[#357ABD] text-white rounded-xl font-bold hover:scale-[1.02]"
          >
             {loading ? <Spinner /> : "Create account" }
          </Button>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
