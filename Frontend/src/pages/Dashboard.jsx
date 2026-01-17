import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUrls } from "../store/urlSlice";
import Layout from "../components/Layout";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import { Copy, ExternalLink, Clock } from "lucide-react";
import { toast } from "sonner";

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

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { urls, currentUrl, loading } = useSelector((state) => state.url);
  const APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:5173";

  useEffect(() => {
    if (!isAuthenticated) navigate("/auth");
    else dispatch(fetchUrls());
  }, [isAuthenticated, navigate, dispatch]);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(`${APP_URL}/${code}`);
      toast.success("Copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* HEADER */}
          <div className="text-center mb-16">
            <Spacer size="sm" />

            <h1 className="text-5xl font-bold text-white mb-4">
              Shorten your <span className="text-[#2dd4bf]">URLs</span>
            </h1>
            <Spacer size="sm" />
            <p className="text-slate-400 text-lg text-center  leading-relaxed">
              Create short, memorable links in seconds. Manage all your URLs in
              one place
            </p>
            <Spacer size="sm" />
          </div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-162.5 h-162.5 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

          {/* FORM CARD */}
          <div className="rounded-2xl bg-[#111318]/80 border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="p-8">
              {" "}
              <div className="flex justify-center">
                <div className="w-full max-w-lg">
                  {" "}
                  <UrlForm />
                </div>
              </div>
              {currentUrl && <Spacer size="lg" />}
              {currentUrl && (
                <div className="flex justify-center">
                  <div className="w-full max-w-lg rounded-xl bg-[#171a21] border border-white/5 p-5">
                    <Spacer size="xxs" />
                    <p className="text-slate-400 mb-2">
                      {" "}
                      &nbsp;&nbsp;&nbsp;Your shortened URL
                    </p>

                    <div className="flex  items-center gap-3">
                      <Spacer size="sm" />
                      <a
                        href={`${APP_URL}/${currentUrl.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#0f172a] text-[#2dd4bf] font-mono rounded-lg px-4 py-3 truncate"
                      >
                        {APP_URL}/{currentUrl.shortCode}
                      </a>

                      <button
                        onClick={() => handleCopy(currentUrl.shortCode)}
                        className="w-9 h-9 bg-[#14161b] hover:text-white text-white hover:bg-[#243044] rounded-lg flex items-center justify-center transition"
                      >
                        <Copy className="w-4 h-4 " />
                      </button>

                      <a
                        href={`${APP_URL}/${currentUrl.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 bg-[#14161b] hover:text-white text-white hover:bg-[#243044] rounded-lg flex items-center justify-center transition"
                      >
                        <ExternalLink className="w-4 h-4 " />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              <Spacer size="sm" />
            </div>
          </div>

          <Spacer size="xl" />

          {/* HISTORY CARD  */}
          <div className="rounded-2xl bg-[#111318]/80 border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="p-8">
              <div className="mx-auto max-w-4xl">
                <Spacer size="sm" />
                <h2 className="flex items-center gap-2 text-white text-2xl font-bold mb-6">
                  <Clock className="w-6 h-6 text-[#2dd4bf]" />
                  Your URL History
                </h2>
                <Spacer size="xxs" />
                {/*  inner spacing shell */}
                <div className="pt-2">
                  {loading && urls.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2dd4bf] mx-auto" />
                    </div>
                  ) : (
                    <UrlList urls={urls} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacer size="xl" />

      <footer className="mt-20 border-t border-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6 text-center text-slate-400 text-sm">
          <Spacer size="md" />
          © 2025 Abhinav Sharma. All rights reserved.
          <Spacer size="md" />
        </div>
      </footer>
    </Layout>
  );
}
