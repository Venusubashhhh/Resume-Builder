import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { CaretDown, Flask, MagicWand, Plus } from "@phosphor-icons/react";
import { createResumeSchema, ResumeDto } from "@reactive-resume/dto";
import { idSchema, sampleResume } from "@reactive-resume/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tooltip,
} from "@reactive-resume/ui";
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { cn, generateRandomName, kebabCase } from "@reactive-resume/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMyStore } from "@/client/stores/resumelist";
import { useCreateResume, useDeleteResume, useUpdateResume } from "@/client/services/resume";
import { useImportResume } from "@/client/services/resume/import";
import { useDialog } from "@/client/stores/dialog";

const formSchema = createResumeSchema.extend({ id: idSchema.optional() });

type FormValues = z.infer<typeof formSchema>;

export const ResumeDialog = () => {
  const { isOpen, mode, payload, close } = useDialog<ResumeDto>("resume");

  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";
  const isDuplicate = mode === "duplicate";

  const { createResume, loading: createLoading } = useCreateResume();
  const { updateResume, loading: updateLoading } = useUpdateResume();
  const { deleteResume, loading: deleteLoading } = useDeleteResume();
  const { importResume: duplicateResume, loading: duplicateLoading } = useImportResume();

  // const loading = createLoading || updateLoading || deleteLoading || duplicateLoading;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", slug: "" },
  });
  const { items, addItem } = useMyStore();
  useEffect(()=>{
    console.log(items);
  },[items])
  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen, payload]);

  useEffect(() => {
    const slug = kebabCase(form.watch("title"));
    form.setValue("slug", slug);
  }, [form.watch("title")]);

  const onSubmit = async (values: FormValues) => {
    const randomId = uuidv4();

// Get the current date and time
const currentDateTime = dayjs();

// Format the date and time in ISO 8601 format
const formattedDateTime = currentDateTime.toISOString();

    if (isCreate) {
      await addItem({ slug: values.slug, title: values.title, visibility: "public",locked:false,userId:randomId,id:randomId,createdAt: formattedDateTime,
      updatedAt: formattedDateTime,data:{
        "name": "kannan",
        "headline": "working in codingmart",
        "email": "venusubash018@gmail.com",
        "phone": "9876543210",
        "location": "thudiyalur",
        "url": {
            "label": "",
            "href": "https://kannan.com"
        },
        "customFields": [],
        "picture": {
            "url": "http://localhost:9000/default/clsx0bcbo0000u9nn6m63rmfc/pictures/clsx0bcbo0000u9nn6m63rmfc.jpg",
            "size": 64,
            "aspectRatio": 1,
            "borderRadius": 0,
            "effects": {
                "hidden": false,
                "border": false,
                "grayscale": false
            }
        }
    },
    "sections": {
        "summary": {
            "name": "Summary",
            "columns": 1,
            "visible": true,
            "id": "summary",
            "content": ""
        },
        "awards": {
            "name": "Awards",
            "columns": 1,
            "visible": true,
            "id": "awards",
            "items": []
        },
        "certifications": {
            "name": "Certifications",
            "columns": 1,
            "visible": true,
            "id": "certifications",
            "items": []
        },
        "education": {
            "name": "Education",
            "columns": 1,
            "visible": true,
            "id": "education",
            "items": [
                {
                    "id": "w57bjanifggmfsozw5om3nul",
                    "visible": true,
                    "institution": "ngp",
                    "studyType": "be",
                    "area": "cse",
                    "score": "8.3",
                    "date": "mARCH-2023",
                    "summary": "",
                    "url": {
                        "label": "",
                        "href": ""
                    }
                }
            ]
        },
        "experience": {
            "name": "Experience",
            "columns": 1,
            "visible": true,
            "id": "experience",
            "items": []
        },
        "volunteer": {
            "name": "Volunteering",
            "columns": 1,
            "visible": true,
            "id": "volunteer",
            "items": []
        },
        "interests": {
            "name": "Interests",
            "columns": 1,
            "visible": true,
            "id": "interests",
            "items": []
        },
        "languages": {
            "name": "Languages",
            "columns": 1,
            "visible": true,
            "id": "languages",
            "items": []
        },
        "profiles": {
            "name": "Profiles",
            "columns": 1,
            "visible": true,
            "id": "profiles",
            "items": []
        },
        "projects": {
            "name": "Projects",
            "columns": 1,
            "visible": true,
            "id": "projects",
            "items": []
        },
        "publications": {
            "name": "Publications",
            "columns": 1,
            "visible": true,
            "id": "publications",
            "items": []
        },
        "references": {
            "name": "References",
            "columns": 1,
            "visible": true,
            "id": "references",
            "items": []
        },
        "skills": {
            "name": "Skills",
            "columns": 1,
            "visible": true,
            "id": "skills",
            "items": [
                {
                    "id": "eftybhzdugbxiuxbo5a65mtx",
                    "visible": true,
                    "name": "react",
                    "description": "good",
                    "level": 1,
                    "keywords": []
                }
            ]
        },
        "custom": {
            "qmvrt3bog8rtxpg2anv35dje": {
                "name": "Custom Section",
                "columns": 1,
                "visible": true,
                "id": "qmvrt3bog8rtxpg2anv35dje",
                "items": []
            },
            "z74xxwualnvj0lb1qfdohyus": {
                "name": "Custom Section",
                "columns": 1,
                "visible": true,
                "id": "z74xxwualnvj0lb1qfdohyus",
                "items": []
            }
        }
    },
    "metadata": {
        "template": "elegant",
        "layout": [
            [
                [
                    "profiles",
                    "summary",
                    "experience",
                    "education",
                    "projects",
                    "volunteer",
                    "references",
                    "custom.qmvrt3bog8rtxpg2anv35dje",
                    "custom.z74xxwualnvj0lb1qfdohyus"
                ],
                [
                    "skills",
                    "interests",
                    "certifications",
                    "awards",
                    "publications",
                    "languages"
                ]
            ]
        ],
        "css": {
            "value": ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
            "visible": false
        },
        "page": {
            "margin": 18,
            "format": "a4",
            "options": {
                "breakLine": true,
                "pageNumbers": true
            }
        },
        "theme": {
            "background": "#ffffff",
            "text": "#000000",
            "primary": "#475569"
        },
        "typography": {
            "font": {
                "family": "IBM Plex Serif",
                "subset": "latin",
                "variants": [
                    "regular",
                    "italic",
                    "600"
                ],
                "size": 15.9
            },
            "lineHeight": 1.95,
            "hideIcons": true,
            "underlineLinks": false
        },
        "notes": ""
    
      } });
    }

    if (isUpdate) {
      if (!payload.item?.id) return;

      await updateResume({
        ...payload.item,
        title: values.title,
        slug: values.slug,
      });
    }

    if (isDuplicate) {
      if (!payload.item?.id) return;

      await duplicateResume({
        title: values.title,
        slug: values.slug,
        data: payload.item.data,
      });
    }

    if (isDelete) {
      if (!payload.item?.id) return;

      await deleteResume({ id: payload.item?.id });
    }

    close();
  };

  const onReset = () => {
    if (isCreate) form.reset({ title: "", slug: "" });
    if (isUpdate)
      form.reset({ id: payload.item?.id, title: payload.item?.title, slug: payload.item?.slug });
    if (isDuplicate)
      form.reset({ title: `${payload.item?.title} (Copy)`, slug: `${payload.item?.slug}-copy` });
    if (isDelete)
      form.reset({ id: payload.item?.id, title: payload.item?.title, slug: payload.item?.slug });
  };

  const onGenerateRandomName = () => {
    const name = generateRandomName();
    form.setValue("title", name);
    form.setValue("slug", kebabCase(name));
  };

  const onCreateSample = async () => {
    const randomName = generateRandomName();
    const { title, slug } = form.getValues();

    await duplicateResume({
      title: title || randomName,
      slug: slug || kebabCase(randomName),
      data: sampleResume,
    });

    close();
  };

  if (isDelete) {
    return (
      <AlertDialog open={isOpen} onOpenChange={close}>
        <AlertDialogContent>
          <Form {...form}>
            <form>
              <AlertDialogHeader>
                <AlertDialogTitle>{t`Are you sure you want to delete your resume?`}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t`This action cannot be undone. This will permanently delete your resume and cannot be recovered.`}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>{t`Cancel`}</AlertDialogCancel>
                <AlertDialogAction variant="error" onClick={form.handleSubmit(onSubmit)}>
                  {t`Delete`}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center space-x-2.5">
                  <Plus />
                  <h2>
                    {isCreate && t`Create a new resume`}
                    {isUpdate && t`Update an existing resume`}
                    {isDuplicate && t`Duplicate an existing resume`}
                  </h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                {isCreate && t`Start building your resume by giving it a name.`}
                {isUpdate && t`Changed your mind about the name? Give it a new one.`}
                {isDuplicate && t`Give your old resume a new name.`}
              </DialogDescription>
            </DialogHeader>

            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Title`}</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Input {...field} className="flex-1" />

                      {(isCreate || isDuplicate) && (
                        <Tooltip content={t`Generate a random title for your resume`}>
                          <Button
                            size="icon"
                            type="button"
                            variant="outline"
                            onClick={onGenerateRandomName}
                          >
                            <MagicWand />
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    {t`Tip: You can name the resume referring to the position you are applying for.`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="slug"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Slug`}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex items-center">
                <Button
                  type="submit"

                  className={cn(isCreate && "rounded-r-none")}
                >
                  {isCreate && t`Create`}
                  {isUpdate && t`Save Changes`}
                  {isDuplicate && t`Duplicate`}
                </Button>

                {isCreate && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" size="icon" className="rounded-l-none border-l">
                        <CaretDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="center">
                      <DropdownMenuItem onClick={onCreateSample}>
                        <Flask className="mr-2" />
                        {t`Create Sample Resume`}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
