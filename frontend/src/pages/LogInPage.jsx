import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail,MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LogInPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { login, isLoggingIn } = useAuthStore();
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must have atleast 6 characters");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email address");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };

  return (
    <section className="flex gap-20 h-full">
      <div className="w-1/2 text-3xl flex justify-center items-center bg-black/20 h-full px-7 shadow-box">
        Converse is a seamless chat application designed to connect you with friends, family, and colleagues. Whether you're sending quick messages or having in-depth conversations, Converse provides a reliable and user-friendly platform to stay connected. Start chatting instantly and experience the joy of effortless communication
      </div>
      <div className="w-1/2 flex justify-center mt-10">
        <div className="w-[80%] flex flex-col gap-5">
          <div>
            <Link to={"/"} className="flex items-center flex-col group">
              <div className="flex justify-center items-center rounded-lg bg-primary/10 size-12 group-hover:bg-primary/20">
                <MessageSquare className="size-8 text-primary" />
              </div>
              <div className="font-bold text-2xl">
                Converse
              </div>
              <div className="text-base-content/60">
                The Messenger App
              </div>
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="form-control flex flex-col gap-2">
              <div className="font-bold">
                <label htmlFor="email">Email</label>
              </div>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/2" />
                </div>
                <input
                  type="text"
                  name="email"
                  className="pl-10 input-bordered w-full input placeholder:text-base-content/20"
                  placeholder="you@example.com"
                  autoComplete="username"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-control flex flex-col gap-2">
              <div className="font-bold">
                <label htmlFor="password">Password</label>
              </div>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/2" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="pl-10 input-bordered w-full input placeholder:text-base-content/20"
                  placeholder="•••••••••"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="inset-y-0 absolute pr-3 right-0 flex items-center"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ?
                    <EyeOff className="size-5 text-base-content/2" /> :
                    <Eye className="size-5 text-base-content/2" />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Signing In...
                </>
              ) : ("Sign In")}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an Account?{" "}
              <Link to={"/signup"} className="link link-primary">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogInPage
