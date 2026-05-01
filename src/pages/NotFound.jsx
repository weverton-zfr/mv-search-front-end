import { Link } from "react-router";

export default function NotFound(){
    return(
        <section className="flex flex-col justify-center items-center h-[100vh] p-0!">
            <h1 className="text-7xl font-bold">Error! Page not found</h1>
            <h2 className="text-5xl font-medium">404</h2>
            <p className="text-2xl font-medium">Page not found</p>
            <Link to="/" className="text-2xl font-medium p-2 bg-green-700 rounded-sm mt-4">Início</Link>
        </section>
    )
}