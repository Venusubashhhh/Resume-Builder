import { t } from "@lingui/macro";
import {
  CircleNotch,
  CopySimple,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import { ResumeDto } from "@reactive-resume/dto";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useResumePreview } from "@/client/services/resume/preview";
import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";
import { builderLoader } from "@/client/pages/builder/page";
import { findResumeById } from "@/client/services/resume";
import { deleteItem } from "@/client/stores/resumelist";

type Props = {
  resume: ResumeDto;
};

export const ResumeCard = ({ resume }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<ResumeDto>("resume");
  const { open: lockOpen } = useDialog<ResumeDto>("lock");

  // const { url, loading } = useResumePreview(resume.id);

  const lastUpdated = dayjs().to(resume.updatedAt);

  const onOpen = () => {
    navigate(`/builder/${resume.id}`);
    findResumeById({ id: resume.id });
  };

  const onUpdate = () => {
    open("update", { id: "resume", item: resume });
  };

  const onDuplicate = () => {
    open("duplicate", { id: "resume", item: resume });
  };

  const onLockChange = () => {
    lockOpen(resume.locked ? "update" : "create", { id: "lock", item: resume });
  };

  const onDelete = () => {
  deleteItem(resume.id);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <BaseCard onClick={onOpen} className="space-y-0">
          <AnimatePresence presenceAffectsLayout>
            {/* {loading && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CircleNotch
                  size={64}
                  weight="thin"
                  opacity={0.5}
                  className="animate-spin self-center justify-self-center"
                />
              </motion.div>
            )} */}

            {/* {!loading && url && (
              <motion.img
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                loading="lazy"
                alt={resume.title}
                className="size-full object-cover"
                src={`${url}?cache=${new Date().getTime()}`}
              />
            )} */}
          </AnimatePresence>

          <AnimatePresence>
            {resume.locked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm"
              >
                <Lock size={42} />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
              "bg-gradient-to-t from-background/80 to-transparent",
            )}
          >
            <h4 className="line-clamp-2 font-medium">{resume.title}</h4>
            <p className="line-clamp-1 text-xs opacity-75">{t`Last updated ${lastUpdated}`}</p>
          </div>
        </BaseCard>
      </ContextMenuTrigger>

      <ContextMenuContent>
    
        <ContextMenuItem onClick={onDelete} className="text-error">
          <TrashSimple size={14} className="mr-2" />
          {t`Delete`}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
