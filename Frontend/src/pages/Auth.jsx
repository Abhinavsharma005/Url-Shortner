import { useState, useEffect } from "react";
import { Mail, Lock, User, Link as LinkIcon, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, login, clearError } from "../store/authSlice";
import { toast } from "sonner";


  //  Reusable Input Component

const Input = ({ label, icon, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>

      <div className="flex items-center h-12 rounded-lg bg-[#1e2229] border border-white/5 focus-within:ring-2 focus-within:ring-teal-500/50 transition-all">
        <div className="w-12 h-full flex items-center justify-center text-gray-500">
          {icon}
        </div>

        {/* INPUT SLOT */}
        <input
          {...props}
          className="
            flex-1 h-full
            bg-transparent
            text-white
            placeholder:text-gray-600
            outline-none
            pr-4
          "
        />
      </div>
    </div>
  );
};

const Spacer = ({ size = "md" }) => {
  const map = {
    xxs: "h-1",
    xs: "h-2",
    sm: "h-4",
    md: "h-6",
    lg: "h-8",
    xl: "h-10",
    "2xl": "h-12",
  };

  return <div className={map[size]} />;
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string" ? error : error.error || "An error occurred",
      );
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const result = await dispatch(
        login({
          email: formData.email,
          password: formData.password,
        }),
      );
      if (result.type === "auth/login/fulfilled") {
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } else {
      const result = await dispatch(signup(formData));
      if (result.type === "auth/signup/fulfilled") {
        toast.success("Account created! Please log in.");
        setIsLogin(true);
        setFormData({ firstname: "", lastname: "", email: "", password: "" });
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ firstname: "", lastname: "", email: "", password: "" });
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0c10] relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-162.5 h-162.5 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Bigger card */}
      <div className="w-full max-w-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2dd4bf] rounded-2xl mb-4 shadow-lg shadow-teal-500/20">
            <LinkIcon className="w-8 h-8 text-[#0a0c10]" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-white">Shorty</h1>
          <p className="text-gray-400 mt-2">
            <Spacer size="xxs" />

            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>
        <Spacer size="sm" />

        {/* Card shell */}
        <div className="rounded-2xl shadow-2xl border border-white/5 bg-[#111318]/80 backdrop-blur-xl p-10">
          {/* CENTERED FORM */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <form onSubmit={handleSubmit} className="space-y-5">
                <Spacer size="md" />

                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      icon={<User size={20} />}
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="John"
                      required
                    />
                    <Input
                      label="Last Name"
                      icon={<User size={20} />}
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                  </div>
                )}
                <Spacer size="xs" />
                <Input
                  label="Email"
                  icon={<Mail size={20} />}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
                <Spacer size="xs" />
                <Input
                  label="Password"
                  icon={<Lock size={20} />}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <Spacer size="md" />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 mt-2 bg-[#2dd4bf] hover:bg-[#26bba8] text-[#0a0c10] font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
                >
                  {loading
                    ? "Please wait..."
                    : isLogin
                      ? "Sign In"
                      : "Create Account"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <Spacer size="sm" />
              {/* Footer */}
              <div className="mt-8 text-center text-sm">
                <p className="text-gray-400">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    onClick={toggleMode}
                    className="text-[#2dd4bf] font-semibold hover:underline"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
              <Spacer size="md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
