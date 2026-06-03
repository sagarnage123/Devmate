import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Menu } from "lucide-react"

import {useRef} from "react"

const navLinks = [
    { label: "Workflow", href: "#workflow" },
    { label: "Architecture", href: "#architecture" },
    { label: "Engineering", href: "#engineering" },
    { label: "Security", href: "#security" },
    { label: "Walkthrough", href: "#walkthrough" },
];
function Navbar() {

    const [activeLink, setActiveLink] = useState("#projects")
    const [isOpen, setIsOpen] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map((link) =>
                document.querySelector(link.href)
            )

            const currentSection = sections.find((section) => {
                if (!section) return false

                const rect = section.getBoundingClientRect()

                return rect.top <= 200 && rect.bottom >= 200
            })

            if (currentSection?.id) {
                setActiveLink(`#${currentSection.id}`)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header className=" sticky top-2 w-[98%] left-[1%] lg:left-[4%] lg:w-[92%] z-10 sm:z-50">
           
                <div
                    className="
    mt-4
    flex
    items-center
    justify-between
    rounded-2xl
    border
    border-white/10
    bg-white/3
    supports-backdrop-filter:bg-black/20
    backdrop-blur-md
    shadow-[0_8px_30px_rgba(0,0,0,0.35)]
    px-6
    py-2.5
  "
                >
                <a
                    href="#hero"
                    className="flex items-center gap-3"
                >
                    <div
                        className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-indigo-600
                font-bold
                text-white
                shadow-lg
                shadow-indigo-500/20
              "
                    >
                        D
                    </div>

                    <div>
                        <p className="font-semibold text-white">
                            DevMate
                        </p>

                        <p className="text-xs text-slate-400">
                            Project Showcase
                        </p>
                    </div>
                </a>

                    <nav className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => {
                            const isActive = activeLink === link.href

                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setActiveLink(link.href)}
                                    className="
          relative
          px-4
          py-2
          text-sm
          font-medium
          transition-colors
        "
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-pill"
                                            className="
              absolute
              inset-0
              rounded-xl
              bg-white/10
              border
              border-white/10
            "
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    <span
                                        className={`
            relative z-10 transition-colors
            ${isActive
                                                ? "text-white"
                                                : "text-[#A1A1AA] hover:text-white"
                                            }
          `}
                                    >
                                        {link.label}
                                    </span>
                                </a>
                            )
                        })}
                    </nav>
                    <motion.button
                        whileTap={{
                            scale: 0.92,
                        }}
                        whileHover={{
                            scale: 1.05,
                        }}
                        className="
                            flex
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            p-2
                            text-white
                            md:hidden
                        "
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <Menu size={20} />
                    </motion.button>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                        ref={navRef}
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="
      mt-3
      flex
      flex-col
      gap-1
      rounded-2xl
      border
      border-white/10
      bg-gradient-to-t  r
         from-indigo-900/80
      to-indigo-600/80
      p-2
      backdrop-blur-xl
      md:hidden
    "
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => {
                                        setActiveLink(link.href)
                                        setIsOpen(false)
                                    }}
                                    className={`
  rounded-2xl
  px-4
  py-3
  text-sm
  transition-all
  duration-200
  active:scale-[0.98]

  ${activeLink === link.href
                                            ? "bg-white/8 text-white"
                                            : "text-[#A1A1AA] hover:bg-white/6 hover:text-white"
                                        }
`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            
        </header>
    )
}

export default Navbar