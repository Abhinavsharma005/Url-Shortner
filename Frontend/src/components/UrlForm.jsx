import { useState } from "react";
import { Link, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { shortenUrl } from "../store/urlSlice";

export default function UrlForm({ onSuccess }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.url);
  const APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:5173";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { url };
    if (customCode.trim()) data.code = customCode.trim();

    const result = await dispatch(shortenUrl(data));
    if (result.type === "url/shorten/fulfilled") {
      setUrl("");
      setCustomCode("");
      onSuccess?.();
    }
  };

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
    <form onSubmit={handleSubmit} className="space-y-5"> {/* 🔥 tighter spacing */}

      <div>
        <Spacer size="sm" />
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <Link className="w-4 h-4 text-[#2dd4bf]" />
          Enter your long URL
        </label>

        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="  https://example.com/very/long/url/that/needs/shortening"
          className="w-full h-12 bg-[#1e2229] text-slate-300 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#2dd4bf]"
          required
        />
      </div>

      <div>
        <Spacer size="sm" />
        <label className="flex items-center gap-2 text-white font-medium mb-2">
          <Sparkles className="w-4 h-4 text-[#2dd4bf]" />
          Custom alias (optional)
        </label>

        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-sm">{APP_URL}/</span>

          <input
            type="text"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="  my-link"
            className="flex-1 h-12 bg-[#1e2229] text-slate-300 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#2dd4bf]"
          />
        </div>

        <p className="text-slate-500 text-sm mt-1">
          Leave empty for a random short code
        </p>
        <Spacer size="sm" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-[#2dd4bf] text-slate-900 font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Shorten URL"}
        <Sparkles className="w-4 h-4" />
      </button>
    </form>
  );
}
