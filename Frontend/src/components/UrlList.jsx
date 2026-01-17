import {
  Copy,
  ExternalLink,
  Trash2,
  Clock,
  Link as LinkIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteUrl } from "../store/urlSlice";
import { toast } from "sonner";

export default function UrlList({ urls }) {
  const dispatch = useDispatch();
  const APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:5173";

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(`${APP_URL}/${code}`);
      toast.success("Copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  if (!urls?.length) {
    return (
      <div className="bg-[#1e2229] rounded-xl p-10 border border-white/5 text-center">
        <LinkIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-slate-400 text-xl font-semibold mb-2">
          No URLs yet
        </h3>
        <p className="text-slate-500">Create your first short URL above!</p>
      </div>
    );
  }

  const Spacer = ({ size = "md", horizontal = false }) => {
    const map = {
      sm: "4",
      md: "6",
      lg: "8",
      xl: "12",
    };

    return <div className={horizontal ? `w-${map[size]}` : `h-${map[size]}`} />;
  };

  return (
    <div className="space-y-6">
      {" "}
      {urls.map((url) => (
        <div
          key={url.id}
          className="bg-[#14161b] rounded-xl p-6 border border-white/5 hover:border-white/10 transition"
        >
          <Spacer size="sm" />

          <div className="flex items-center justify-between gap-6">
            {" "}
            {/* 🔥 center align buttons */}
            <div className="flex-1 min-w-0">
              <a
                href={`${APP_URL}/${url.ShortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2dd4bf] font-mono text-sm truncate block mb-1"
              >
                {APP_URL}/{url.ShortCode}
                <Spacer size="xxs" />
              </a>
<Spacer size="xxs" />
              <p className="text-slate-400 text-sm truncate">{url.targetURL}</p>

              <div className="flex items-center gap-2 mt-2 text-slate-500 text-xs">
                <Clock className="w-3 h-3" />
                {new Date(url.createdAt).toLocaleString()}
              </div>
              <Spacer size="sm" />

            </div>
            <div className="flex items-center gap-2">
              {/* COPY */}
              <button
                onClick={() => handleCopy(url.ShortCode)}
                className="
      w-10 h-10
      flex items-center justify-center
      rounded-xl
      bg-[#14161b]
      border border-white/10
      text-slate-400
      hover:text-white
      hover:bg-[#1e293b]
      transition-all duration-200
      shadow-sm hover:shadow-md
    "
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>

              {/* OPEN */}
              <a
                href={`${APP_URL}/${url.ShortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
      w-10 h-10
      flex items-center justify-center
      rounded-xl
      bg-[#14161b]
      border border-white/10
      text-slate-400
      hover:text-white
      hover:bg-[#1e293b]
      transition-all duration-200
      shadow-sm hover:shadow-md
    "
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* DELETE */}
              <button
                onClick={() => dispatch(deleteUrl(url.id))}
                className="
      w-10 h-10
      flex items-center justify-center
      rounded-xl
      bg-[#14161b]
      border border-white/10
      text-red-400
      hover:text-red-300
      hover:bg-red-400/12
      transition-all duration-200
      shadow-sm hover:shadow-md
    "
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
