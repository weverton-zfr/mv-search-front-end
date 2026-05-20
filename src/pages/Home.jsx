import { PiIdentificationBadgeLight } from "react-icons/pi";
import { BsFillTelephoneFill, BsHousesFill } from "react-icons/bs";
import { RiParentFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router";
import { MdEmail, MdPerson  } from "react-icons/md";
import { FaMapMarked, FaCar, FaBuilding } from "react-icons/fa";
import toast from 'react-hot-toast'
import Plans from "./Plans";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home(){
    const navigation = useNavigate()
    const itens = [
        {
            icon: <PiIdentificationBadgeLight className="size-25"/>,
            title: "CPF",
            info: "Localize dados vinculados a um CPF de forma rápida e segura.",
            type: "CPF",
            inpType: "number",
            plan: 'basic_mensal'
        },
        {
            icon: <PiIdentificationBadgeLight className="size-25"/>,
            title: "Consulta por CNS",
            info: "Encontre informações associadas a um CNS de maneira eficiente e confiável.",
            type: "CNS",
            inpType: "number"
        },
        {
            icon: <MdPerson className="size-25"/>,
            title: "Consulta por Nome",
            info: "Acesse dados relacionados a um nome completo de forma rápida e precisa.",
            type: "NOME",
            inpType: "text"
        },
        {
            icon: <RiParentFill className="size-25"/>,
            title: "Nome da Mãe",
            info: "Consulte informações associadas ao nome da mãe de maneira eficiente e confiável.",
            type: "NOME DA MAE",
            inpType: "text"
        },
        {
            icon: <RiParentFill className="size-25"/>,
            title: "Nome do Pai",
            info: "Localize informações associadas ao nome do pai de maneira eficiente e confiável.",
            type: "NOME DO PAI",
            inpType: "text"
        },
        {
            icon: <MdEmail className="size-24"/>,
            title: "Consulta por Email",
            info: "Acesse informações vinculadas a um endereço de email de maneira ágil e segura.",
            type: "EMAIL",
            inpType: "email"
        },
        {
            icon: <FaMapMarked className="size-25"/>,
            title: "Consulta por CEP",
            info: "Descubra dados relacionados a um CEP de forma rápida e precisa.",
            type: "CEP",
            inpType: "number"
        },
        {
            icon: <FaBuilding className="size-23"/>,
            title: "Consulta por CNPJ",
            info: "Acesse dados vinculados a um CNPJ de forma rápida e segura.",
            type: "CNPJ",
            inpType: "number"
        },
        {
            icon: <PiIdentificationBadgeLight className="size-25"/>,
            title: "Titulo de Eleitor",
            info: "Encontre informações associadas a um título de eleitor de maneira eficiente e confiável.",
            type: "TITULO DE ELEITOR",
            inpType: "number"
        },
        {
            icon: <BsFillTelephoneFill className="size-23"/>,
            title: "Consulta por Telefone",
            info: "Acesse informações vinculadas a um número de telefone de maneira ágil e segura.",
            type: "TELEFONE",
            inpType: "number"
        },
        {
            icon: <BsHousesFill className="size-25"/>,
            title: "Consulta por Vizinhos",
            info: "Localize dados sobre pessoas que moram próximas a um endereço específico de maneira ágil e segura.",
            type: "VIZINHO",
            inpType: "text"
        },
        {
            icon: <FaCar className="size-25"/>,
            title: "Consulta por Placa",
            info: "Acesse informações vinculadas a uma placa de veículo de maneira ágil e segura.",
            type: "PLACA",
            inpType: "text"
        }
    ]
 

    return(
        <section className='flex justify-center items-center w-full h-screen'>
           <div className="w-[90%] h-[96%] bg-black/70 rounded-md border border-green-900/50 flex  items-center gap-6 flex-col shadow-[0_0_25px_#10b98122] overflow-auto py-10">
                 <h1 className="text-green-100 text-4xl font-black">MV SEARCH</h1>
                <div className="flex flex-wrap gap-10 justify-center">
                    {itens.map((itens, i) => 
                    <div 
                    className="flex items-center w-110 h-40 bg-green-950/20 border-1 border-white/10 rounded-2xl text-center p-2 cursor-pointer hover:shadow-[0_0_10px_#14532d] transition"
                    key={i}
                    >
                        {itens.icon}
                        <div className="flex flex-col justify-center items-center gap-2 ml-4 w-[70%]">
                            <h2 className="col-start-2 row-start-1 text-2xl font-bold">{itens.title}</h2>
                            <p className="col-start-2 row-start-2 text-gray-400">{itens.info}</p>
                        </div>
                </div>
            )}
            </div>
           </div>
        </section>
    )
}