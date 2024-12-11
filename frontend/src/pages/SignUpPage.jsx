import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must have atleast 6 characters");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email address");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <section className="flex gap-20 h-full justify-center">
      <div className="hidden w-1/2 text-3xl lg:flex justify-center items-center bg-base-300 h-full px-7 shadow-base-300 shadow-lg">
        Converse is a seamless chat application designed to connect you with friends, family, and colleagues. Whether you're sending quick messages or having in-depth conversations, Converse provides a reliable and user-friendly platform to stay connected. Start chatting instantly and experience the joy of effortless communication
      </div>
      <div className="lg:w-1/2 w-[80%] flex justify-center mt-10">
        <div className="w-[80%] flex flex-col gap-7">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="form-control flex flex-col gap-2">
              <div className="font-bold">
                <label htmlFor="fullName">Full Name</label>
              </div>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/2" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  className="pl-10 input-bordered w-full input placeholder:text-base-content/20"
                  placeholder="Iron Man"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>
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
            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Signing Up...
                </>
              ) : ("Create Account")}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already Have and Account?{" "}
              <Link to={"/login"} className="link link-primary">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage
