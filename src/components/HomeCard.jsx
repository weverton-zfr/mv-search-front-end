import { useTheme } from "../context/ThemeContext";
import { PiIdentificationBadgeLight } from "react-icons/pi";
import { BsFillTelephoneFill, BsHousesFill } from "react-icons/bs";
import { RiParentFill } from "react-icons/ri";
import { MdEmail, MdPerson } from "react-icons/md";
import { FaMapMarked, FaCar, FaBuilding } from "react-icons/fa";

export default function HomeCard({onClick, isFree, itens}){
      const { theme } = useTheme();
      const isDark = theme === "dark";
      const icons = {
        cpf: <PiIdentificationBadgeLight className="size-7 sm:size-10 lg:size-12" />,
        person: <MdPerson className="size-7 sm:size-10 lg:size-12" />,
        mother: <RiParentFill className="size-7 sm:size-10 lg:size-12" />,
        father: <RiParentFill className="size-7 sm:size-10 lg:size-12" />,
        email: <MdEmail className="size-7 sm:size-10 lg:size-12" />,
        cep: <FaMapMarked className="size-7 sm:size-10 lg:size-12" />,
        cnpj: <FaBuilding className="size-7 sm:size-10 lg:size-12" />,
        title: <PiIdentificationBadgeLight className="size-7 sm:size-10 lg:size-12" />,
        phone: <BsFillTelephoneFill className="size-7 sm:size-10 lg:size-12" />,
        neighbors: <BsHousesFill className="size-7 sm:size-10 lg:size-12" />,
        car: <FaCar className="size-7 sm:size-10 lg:size-12" />
      };

    return(
          <div onClick={onClick}
                  className={`
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    sm:items-start
                    justify-center
                    sm:justify-start
                    text-center
                    sm:text-left
                    gap-2
                    sm:gap-4
                    rounded-2xl
                    sm:rounded-3xl
                    p-3
                    sm:p-5
                    min-h-[120px]
                    sm:min-h-0
                    border
                    transition-all
                    duration-300
                    ${
                      isFree
                        ? isDark
                          ? "bg-gray-800/80 border-white/5 cursor-not-allowed opacity-70"
                          : "bg-slate-200/70 border-slate-300/50 cursor-not-allowed opacity-70"
                        : isDark
                          ? "bg-green-950/20 border-white/10 cursor-pointer hover:shadow-[0_0_15px_#14532d] hover:border-green-800/40 hover:-translate-y-1"
                          : "bg-white/65 border-slate-300/40 cursor-pointer shadow-[0_0_18px_rgba(15,23,42,0.04)] hover:border-emerald-700/40 hover:shadow-[0_0_25px_rgba(4,120,87,0.12)] hover:-translate-y-1"
                    }
                  `}
                >
                  <div
                    className={`
                      shrink-0
                      ${
                        isFree
                          ? isDark
                            ? "text-gray-500"
                            : "text-slate-500"
                          : isDark
                            ? "text-green-400"
                            : "text-emerald-800"
                      }
                    `}
                  >
                    {icons[itens.icon]}
                  </div>

                  <div className="
                    flex 
                    flex-col 
                    gap-1 
                    sm:gap-2 
                    min-w-0 
                    items-center 
                    sm:items-start 
                    text-center 
                    sm:text-left 
                    w-full"
                  >
                    <h2
                      className={`
                        text-sm
                        sm:text-xl
                        lg:text-2xl
                        font-bold
                        leading-tight
                        ${
                          isFree
                            ? isDark
                              ? "text-gray-500"
                              : "text-slate-500"
                            : isDark
                              ? "text-white"
                              : "text-emerald-950"
                        }
                      `}
                    >
                      {itens.title}
                    </h2>

                    <p
                      className={`
                        hidden
                        sm:block
                        text-sm
                        lg:text-base
                        leading-relaxed
                        ${
                          isFree
                            ? isDark
                              ? "text-gray-500"
                              : "text-slate-500"
                            : isDark
                              ? "text-gray-400"
                              : "text-slate-700"
                        }
                      `}
                    >
                      {itens.info}
                    </p>
                  </div>
                </div>
    )
}