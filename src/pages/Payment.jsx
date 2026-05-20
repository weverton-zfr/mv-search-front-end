import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { api } from "../lib/api"
import toast from "react-hot-toast"

export default function Payment(){
    const navigation = useNavigate()
    const { state } = useLocation()
    const amountCents = state.amountCents/100
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
            const response = await api.get(
                `/payments/payment-status/${state.paymentId}`
            )
            if (response.data.status === "paid") {
                toast.success(
                "Pagamento confirmado! Seu plano foi alterado com sucesso!",
                {
                    id: "success_payment"
                }
                )
                clearInterval(interval)
                navigation('/')
            }
            } catch (err) {
            toast.error(
                'Erro ao efetuar pagamento',
                {
                id: 'error_payment'
                }
            )
            console.log(err)
            }
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    return(
        <section className="flex justify-center items-center w-full h-screen">
            <div className="w-[70%] bg-black/70 rounded-md border border-green-900/50 flex  items-center gap-10 flex-col overflow-auto py-10">
                <h1 className="text-4xl font-extrabold uppercase text-green-200">PAGAMENTO PIX</h1>
                <h2 className=" text-gray-200">{state.productName} por: {amountCents.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })}
                </h2>
                <div className="w-[80%] flex flex-col gap-10 items-center">
                    <img src={state.pix.qrCodeImage} alt="Codigo QR de cobranca do plano" className="size-90 bg-white text-black" />
                    <span className="p-5 bg-black/30 rounded-md w-[80%] text-gray-300">
                        <p>Chave Copia e Cola: {state.pix.brCode}</p>
                    </span>
                    <span className="p-5 bg-black/30 rounded-md w-[80%] text-gray-300">
                        Para concluir sua compra, realize o pagamento via PIX utilizando o QR Code ou a chave PIX exibida acima. Após efetuar o pagamento, a confirmação pode levar alguns instantes. Assim que o pagamento for aprovado, seu acesso será liberado automaticamente na plataforma. Certifique-se de conferir o valor antes de finalizar a transação.
                    </span>
                </div>
            </div>
        </section>
    )
}