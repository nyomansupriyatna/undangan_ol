import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from "framer-motion";

 

export default function testPage() {

    const ref = useRef(null);
    const isInView =  useInView(ref, { once: false, margin: "0px" });
    const [isVisible, setIsVisible] = useState(true);
 

    // useEffect(() =>{
    //      if (isInView) {
    //          setIsVisible(true);
    //       } else {
    //          setIsVisible(false);
    //       } 
    //      console.log("is in view, visible ->",isInView, isVisible, ref);
    //  },[])

    return (
        <div className='flex flex-col justify-center items-center gap-10 max-w-xl min-h-screen bg-black border-2 text-white'>
            <div className='rounded bg-green-500 h-40 w-40 flex justify-center items-center'>BOX 1
            </div>
            <div className='rounded bg-red-500 h-40 w-40 flex justify-center items-center'>BOX 2
            </div>
            <div className='rounded bg-blue-500 h-40 w-40 flex justify-center items-center'>BOX 3
            </div>
            <div className='rounded bg-purple-500 h-40 w-40 flex justify-center items-center'>BOX 4
            </div>
          
            <AnimatePresence ref={ref} mode='popLayout'>
                   {isVisible && <motion.div 
                        
                        className='rounded bg-amber-500 h-40 w-40 flex justify-center items-center'
                        initial={{
                        rotate: "0deg",
                            scale: 0,
                            y: 0
                        }}
                        animate={{
                            rotate: "360deg",
                            scale: 1,
                            y: [0, 150, -150, -150, 0],
                        }}
                        exit={{
                            rotate: "0deg",
                            scale: 0,
                            y: [0, 150, -150, -150, 0],
                        }}
                        transition={{
                            duration: 1,
                            ease: "backInOut",
                            times: [0, 0.25, 0.5, 0.85, 1]
                        }}
                        >BOX 6
                    </motion.div>}
                    <div className='rounded bg-teal-500 h-40 w-40 flex justify-center items-center'>BOX 5
                    </div>
            </AnimatePresence>
        </div>
       
    );
}
