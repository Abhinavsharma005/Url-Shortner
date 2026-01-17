import { Link, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const Spacer = ({ size = "md", horizontal = false }) => {
    const map = {
      xxs: "2",
      sm: "4",
      md: "6",
      lg: "8",
      xl: "12",
    };
    return <div className={horizontal ? `w-${map[size]}` : `h-${map[size]}`} />;
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2dd4bf] rounded-xl flex items-center justify-center">
              <Link className="w-6 h-6 mt-5 text-slate-900" />
            </div>
            <span className="text-white text-xl font-bold">Shorty</span>
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign out&nbsp;&nbsp;</span>
            </button>
          )}
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
