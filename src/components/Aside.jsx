import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { FaWhatsapp } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { RiAccountCircleFill } from "react-icons/ri";
import { HiX } from "react-icons/hi";

import toast from "react-hot-toast";

import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { translateSupabaseError } from "../utils/supabaseErrors";

export default function Aside() {
  const { profile, subscription } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const menuItems = [
    { id: "/", label: "Início" },
    { id: "plans", label: "Planos" },
    { id: "settings", label: "Configurações" }
  ];

  const planStyles = {
    "Plano Gratuito": isDark
      ? "bg-gray-500/15 text-gray-300 border border-gray-500/20"
      : "bg-gray-200 text-gray-700 border border-gray-300",

    "Plano Básico de Verificação": isDark
      ? "bg-green-500/15 text-green-400 border border-green-500/20"
      : "bg-green-100 text-green-700 border border-green-300",

    "Plano Avançado de Verificação": isDark
      ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
      : "bg-blue-100 text-blue-700 border border-blue-300",

    "Plano Profissional de Verificação": isDark
      ? "bg-purple-500/15 text-purple-400 border border-purple-500/20"
      : "bg-purple-100 text-purple-700 border border-purple-300"
  };

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(translateSupabaseError(error.message));
      return;
    }

    toast.success("Logout realizado com sucesso!");
    setLogoutModalOpen(false);
    setMenuOpen(false);
    navigate("/login");
  }

  function handleNavigate(id) {
    setActiveMenu(id);
    setMenuOpen(false);
  }

  const asideContent = (
    <>
      <div
        className={`
          flex justify-center items-center border-b py-5
          ${isDark ? "border-white/10" : "border-slate-300/50"}
        `}
      >
        <img
          src="/logo.png"
          alt="MV SEARCH"
          className="w-[130px] object-contain"
        />
      </div>

      <div className="flex flex-col items-center gap-3 p-4 xl:p-5">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile?.name || "Foto de perfil"}
            className={`
              size-20 xl:size-24 rounded-full object-cover border transition-all
              ${isDark ? "border-white/10" : "border-slate-300/60"}
            `}
          />
        ) : (
          <RiAccountCircleFill
            className={`
              size-20 xl:size-24
              ${isDark ? "text-green-400" : "text-emerald-700"}
            `}
          />
        )}

        <span
          className={`
            max-w-full px-4 py-2 rounded-full text-sm text-center break-all transition-colors
            ${isDark ? "bg-white/5 text-gray-300" : "bg-slate-200/70 text-slate-700"}
          `}
        >
          Olá, {profile?.name}
        </span>

        <span
          className={`
            max-w-full px-4 py-2 rounded-full text-xs text-center break-all transition-colors
            ${isDark ? "bg-white/5 text-gray-300" : "bg-slate-200/70 text-slate-700"}
          `}
        >
          {profile?.email}
        </span>

        <span
          className={`
            px-4 py-2 rounded-full text-xs border transition-colors
            ${
              planStyles[subscription?.plan] ||
              (isDark
                ? "bg-white/5 text-gray-300 border-white/10"
                : "bg-slate-200/70 text-slate-700 border-slate-300")
            }
          `}
        >
          {subscription?.plan || "Plano Gratuito"}
        </span>
      </div>

      <nav
        className={`
          flex-1 mt-4 px-4 space-y-2 pt-5 border-t overflow-y-auto
          ${isDark ? "border-white/10" : "border-slate-300/50"}
        `}
      >
        {menuItems.map((item) => (
          <Link key={item.id} to={item.id}>
            <button
              onClick={() => handleNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl
                transition-all duration-200 text-base font-medium mb-2
                ${
                  activeMenu === item.id
                    ? isDark
                      ? "bg-green-600/20 text-green-200 border border-green-500/20"
                      : "bg-emerald-700/10 text-emerald-900 border border-emerald-700/20"
                    : isDark
                      ? "text-gray-300 hover:bg-white/5"
                      : "text-slate-700 hover:bg-slate-200/60"
                }
              `}
            >
              <span>{item.label}</span>
            </button>
          </Link>
        ))}

        <a href="https://wa.me/" target="_blank" rel="noreferrer">
          <button
            className={`
              mt-8 w-full flex items-center justify-center gap-3 px-4 py-3
              rounded-2xl transition-all duration-200 font-medium
              ${
                isDark
                  ? "bg-green-600 hover:bg-green-500 text-green-50"
                  : "bg-emerald-700 hover:bg-emerald-600 text-white"
              }
            `}
          >
            <FaWhatsapp className="size-5" />
            WhatsApp
          </button>
        </a>
      </nav>

      <div className="p-4">
        <button
          onClick={() => setLogoutModalOpen(true)}
          className={`
            w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
            ${isDark ? "text-red-400 hover:bg-red-500/10" : "text-red-600 hover:bg-red-100"}
          `}
        >
          <CiLogout className="size-5" />
          <span>Sair</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className={`
          fixed top-4 left-4 z-[60] [min-width:1366px]:hidden font-medium
          p-3 rounded-2xl border backdrop-blur-xl transition-all duration-200
          hover:shadow-[0_0_10px_rgba(0,255,255,0.15)]
          hover:scale-105 hover:border-emerald-800
          ${
            isDark
              ? "bg-black/70 border-white/10 text-white"
              : "bg-white/80 border-slate-300/50 text-emerald-900 shadow-[0_0_20px_rgba(15,23,42,0.08)]"
          }
        `}
      >
        MENU
      </button>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm [min-width:1366px]:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-[80] h-[100dvh] w-[290px] max-w-[85vw]
          flex [min-width:1366px]:hidden flex-col backdrop-blur-xl border-r
          transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          ${
            isDark
              ? "bg-black/85 border-white/10"
              : "bg-white/90 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.12)]"
          }
        `}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className={`
            absolute top-4 right-4 p-2 rounded-xl transition
            ${isDark ? "text-gray-300 hover:bg-white/10" : "text-slate-700 hover:bg-slate-200/70"}
          `}
        >
          <HiX className="size-6" />
        </button>

        {asideContent}
      </aside>

      <aside
        className={`
          fixed top-0 left-0 h-screen hidden [min-width:1366px]:flex
          flex-col backdrop-blur-xl border-r z-50 transition-all duration-300
          [min-width:1366px]:w-[240px] [min-width:1600px]:w-[270px]
          ${
            isDark
              ? "bg-black/70 border-white/10"
              : "bg-white/75 border-slate-300/50 shadow-[0_0_35px_rgba(15,23,42,0.06)]"
          }
        `}
      >
        {asideContent}
      </aside>

      {logoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
          <div
            className={`
              w-full max-w-md rounded-3xl border p-6 shadow-2xl
              ${isDark ? "bg-zinc-950 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"}
            `}
          >
            <h2 className="text-2xl font-bold mb-3">
              Deseja realmente sair?
            </h2>

            <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
              Você será desconectado da sua conta atual e precisará fazer login
              novamente para acessar o sistema.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-2xl bg-red-700 hover:bg-red-600 text-white font-semibold transition-all"
              >
                Sim, sair
              </button>

              <button
                onClick={() => setLogoutModalOpen(false)}
                className={`
                  w-full py-3 rounded-2xl font-semibold transition-all
                  ${
                    isDark
                      ? "bg-white/10 hover:bg-white/15 text-gray-300"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                  }
                `}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}