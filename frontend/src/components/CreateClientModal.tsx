import { useState } from "react";
import { createPortal } from "react-dom";
import {motion, AnimatePresence} from "framer-motion";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: {
        name: string;
        email: string;
        phone?: string;
    }) => Promise<void>;
}

export default function CreateClientModal({
    isOpen,
    onClose,
    onCreate,
}: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email) return;

        setLoading(true);

        await onCreate({
            name,
            email,
            phone: phone || undefined,
        });

        setLoading(false);

       
        setName("");
        setEmail("");
        setPhone("");

        onClose();
    };

    

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="
fixed inset-0 z-50
flex items-center justify-center
p-3 sm:p-4
bg-black/60 backdrop-blur-md
"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 ,animationDuration:0.3}}

                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={onClose}
                
            >
                <motion.div
                        className="w-full max-w-md
max-h-[90vh]
overflow-y-auto
no-scrollbar rounded-2xl p-4 sm:p-6
                bg-[#0F172A] border border-white/10
                shadow-2xl shadow-black/40"

                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.96 ,animationDuration: 0.3}}

                    transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.05
                    }}
                        onClick={onClose}
                >

                  
                    <h2 className="text-lg font-semibold tracking-tight text-white mb-5">
                        Add Client
                    </h2>

                 
                    <div className="space-y-3">

                        <input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white
                        placeholder:text-slate-500
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                        transition-all duration-200"
                        />

                        <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                        placeholder:text-slate-500
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                        transition-all duration-300"
                        />

                        <input
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                        placeholder:text-slate-500
                        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                        transition-all duration-200"
                        />

                    </div>

                    
                        <div className="flex flex-col-reverse gap-2
sm:flex-row sm:justify-between
mt-5">

                   
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-2 rounded-lg text-sm font-medium
                        bg-indigo-500 text-white
                        transition-all duration-300 ease-out
                        hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20
                        active:scale-[0.97] w-full sm:w-auto"
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>

                        
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-sm
                        text-white hover:text-white
                        hover:bg-slate-800
                        transition-all duration-200
                        bg-indigo-500 border border-indigo-500/20
                        active:scale-[0.97] w-full sm:w-auto
                        "
                        
                        >
                            Cancel
                        </button>

                    </div>

                </motion.div>
                    
            </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}