import { t } from "@lingui/macro";
import { ResumeDto } from "@reactive-resume/dto";
import { useCallback, useEffect, useInsertionEffect } from "react";
import { Helmet } from "react-helmet-async";
import { LoaderFunction, redirect } from "react-router-dom";
import { useMyStore } from "@/client/stores/resumelist";
import { queryClient } from "@/client/libs/query-client";
import { findResumeById } from "@/client/services/resume";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

export const BuilderPage = () => {

  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);
  const resume = useResumeStore((state) => state.resume);
  const title = useResumeStore((state) => state.resume.title);

  const updateResumeInFrame = useCallback(() => {
    if (!frameRef || !frameRef.contentWindow) return;
    const message = { type: "SET_RESUME", payload: resume.data };
    (() => frameRef.contentWindow.postMessage(message, "*"))();
  }, [frameRef, resume.data]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;
    frameRef.addEventListener("load", updateResumeInFrame);
    return () => frameRef.removeEventListener("load", updateResumeInFrame);
  }, [frameRef]);



  // Send resume data to iframe on change of resume data
  useEffect(updateResumeInFrame, [resume.data]);

  return (
    <>
      <Helmet>
        <title>
          {title} - {t`Reactive Resume`}
        </title>
      </Helmet>

      <iframe
        ref={setFrameRef}
        title={resume.id}
        src="/artboard/builder"
        className="mt-16 w-screen"
        style={{ height: `calc(100vh - 64px)` }}
      />
    </>
  );
};

export const builderLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    const id:any = params.id;
  console.log('builder------->')
  findResumeById(id);
    // Find the resume item in your items array
    const items = useMyStore.getState().items;
    const foundResume = items.find((item:any) => item.id === id);

    if (foundResume) {
      // Update the resume state with the data of the found resume
      useResumeStore.setState({ resume: foundResume.data });
      useResumeStore.temporal.getState().clear();
      
      // Return the found resume
      return foundResume;
    } else {
      // Handle the case where the item with the given id is not found
      return redirect("/dashboard");
    }
  } catch (error) {
    // Handle errors appropriately
    return redirect("/dashboard");
  }
};
