import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
export interface TourStep {
    desktopImage: string;
    mobileImage: string;
    title: string;
    description: string;
    isMobileScreenshot?: boolean;
}

interface WorkflowTourModalProps {
    isOpen: boolean;
    onClose: () => void;
    steps: TourStep[];
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const WorkflowTourModal = ({
    isOpen,
    onClose,
    steps,
    currentStep,
    setCurrentStep,
}: WorkflowTourModalProps) => {

    const step = steps[currentStep];
    useEffect(() => {

        const handleKeyDown = (e: KeyboardEvent) => {

            if (e.key === "Escape") {
                onClose();
            }

            if (e.key === "ArrowRight") {
                handleNext();
            }

            if (e.key === "ArrowLeft") {
                handlePrevious();

            }

        };

        window.addEventListener("keydown", handleKeyDown);


        return () => {

            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [currentStep, onClose, setCurrentStep, steps.length]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="
                        fixed
                        inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/70
                backdrop-blur-md
                p-4
                h-auto
                pt-12
                overflow-auto
               
            "
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="
                relative
                w-full
                max-w-6xl
                2xl:max-w-7xl
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
            from-indigo-950
            via-indigo-900
            to-slate-950
                p-6
                sm:p-10
                
                backdrop-blur-xl
                shadow-2xl
                "
                  
                    >
                        <button
                            onClick={onClose}
                            className="
                        absolute
                        right-4
                        top-4
                        z-20
                        rounded-full
                        bg-white/90
                        p-2
                        text-slate-700
                        shadow-lg
                        transition
                        hover:bg-white
                    "
                        >
                            <X size={18} />
                        </button>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -20,
                                }}
                                transition={{
                                    duration: 0.35,
                                    ease: "easeOut",
                                }}
                                className="
            grid
            lg:grid-cols-[1.35fr_0.65fr]
        "
                            >

                                <div
                                    className="
    flex
    items-center
    justify-center
    w-auto
    max-h-[60vh]
    sm:max-h-[95vh]
    p-2
    
  "
                                >
                                    <picture>
                                        <source
                                            media="(max-width: 640px)"
                                            srcSet={step.mobileImage}
                                        />

                                        <img
                                        src={step.desktopImage}
                                            alt={step.title}
                                            className="
    h-auto
    w-auto
    max-w-full
    max-h-[55vh]
    lg:max-h-[88vh]
    rounded-2xl
    border
    border-slate-200
    object-contain
    shadow-lg
  "
                                        />
                                    </picture>
                                </div>

                                <div className="
            flex
            flex-col
            justify-between
            p-4
            sm:p-8
            lg:p-10
        ">

                                    <div>

                                        <div className="
                    inline-flex
                    rounded-full
                    border
                    border-white/10
                    bg-black/20
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-slate-100
                ">
                                            Step {currentStep + 1}
                                        </div>

                                        <h2 className="
                    mt-5
                    text-2xl
                    sm:text-3xl
                    font-bold
                    tracking-tight
                    text-slate-900
                ">
                                            {step.title}
                                        </h2>

                                        <p className="
                    mt-5
                    text-sm
                    sm:text-base
                    leading-7
                    sm:leading-8
                    text-slate-100
                ">
                                            {step.description}
                                        </p>

                                    </div>
                                    <div className="
    mt-6
    md:mt-10
    flex
    items-center
    gap-2
">

                                        {steps.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`
                h-2
                rounded-full
                transition-all
                duration-300

                ${index === currentStep
                                                        ? "w-4 bg-slate-900"
                                                        : "w-2 bg-slate-300"
                                                    }
            `}
                                            />
                                        ))}

                                    </div>

                                    <div className="
                mt-10
                flex
                items-center
                justify-between
                gap-4
            ">

                                        <button
                                            onClick={handlePrevious}
                                            disabled={currentStep === 0}
                                            className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-slate-900
                        px-4
                        sm:px-5
                        py-3
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-slate-800
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                    "
                                        >
                                            <ChevronLeft size={16} />
                                            Previous
                                        </button>

                                        <button
                                            onClick={handleNext}
                                            disabled={currentStep === steps.length - 1}
                                            className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-slate-900
                        px-4
                        sm:px-5
                        py-3
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-slate-800
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                    "
                                        >
                                            Next
                                            <ChevronRight size={16} />
                                        </button>

                                    </div>

                                </div>

                            </motion.div>

                        </AnimatePresence>


                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WorkflowTourModal;