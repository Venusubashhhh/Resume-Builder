import { ResumeDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import { useMyStore } from "@/client/stores/resumelist";
import { RESUME_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";
import { useResumeStore } from "@/client/stores/resume";

export const findResumeById = async (data: { id: string }) => {
  console.log("fired");
  const items = useMyStore.getState().items;
  let resume: any = null;

  items.forEach((val: any) => {
    console.log(val.id === data, val.id, data);
    if (val.id === data.id) {
      resume = val;
    }
  });


  useResumeStore.setState({ resume });
  useResumeStore.temporal.getState().clear();
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};

export const useResume = (id: string) => {
  const {
    error,
    isPending: loading,
    data: resume,
  } = useQuery({
    queryKey: [RESUME_KEY, { id }],
    queryFn: () => findResumeById({ id }),
  });


  return { resume, loading, error };
};
