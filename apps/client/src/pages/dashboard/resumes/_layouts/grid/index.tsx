import { sortByDate } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useResumes } from "@/client/services/resume";
import { useMyStore } from "@/client/stores/resumelist";
import { BaseCard } from "./_components/base-card";
import { CreateResumeCard } from "./_components/create-card";
import { ImportResumeCard } from "./_components/import-card";
import { ResumeCard } from "./_components/resume-card";
import { useEffect } from "react";

export const GridView = () => {

const{items,adduser}=useMyStore();
console.log(items);
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <CreateResumeCard />
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
      >
        <ImportResumeCard />
      </motion.div> */}

     

      {items && (
        <AnimatePresence>
          {items.map((resume:any, index:any) => (
              <motion.div
                layout
                key={resume.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: (index + 2) * 0.1 } }}
                exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.5 } }}
              >
                <ResumeCard resume={resume} />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
};
