export default function Input({label, type, placeholder, onChange}){
    return(
        <div className="mb-4">
                <label className="text-xs text-gray-500">{label}</label>
                <input type={type}
                  placeholder={placeholder}
                  onChange={onChange}
                  className="w-full mt-2 p-3 rounded-xl bg-[#222] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-900"
                  
                  />
        </div>
    )
}