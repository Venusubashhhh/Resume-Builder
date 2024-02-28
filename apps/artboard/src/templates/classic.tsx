import {
  Award,
  Certification,
  CustomSection,
  CustomSectionGroup,
  Education,
  Experience,
  Interest,
  Strengths,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  SectionKey,
  SectionWithItem,
  Skill,
  URL,
  Volunteer,
} from "@reactive-resume/schema";
import { cn, isEmptyString, isUrl } from "@reactive-resume/utils";
import get from "lodash.get";
import { Fragment } from "react";

import { Picture } from "../components/picture";
import { RoundPicture } from "../components/roundpicture";
import { useArtboardStore } from "../store/artboard";
import { TemplateProps } from "../types/template";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);

  return (
    <div className="p-custom relative grid grid-cols-3 space-x-4 !p-15 border-b-4 border-gray-500">
      <div className="mx-auto w-1/2 !rounded-full !border-2 !border-gray-500 overflow-hidden p-2">
      {/* <Picture className="flex items-center justify-center mx-auto my-auto !w-230 !h-230 !rounded-full" /> */}
      <RoundPicture />
      </div>
      <div className="relative z-10 col-span-2 ">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold">{basics.name}</h2>
          <p>{basics.headline}</p>
        </div>

        <div className="text-text col-span-2 col-start-2 mt-7">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm mt--5">
            {basics.location && (
              <>
                <div className="flex items-center gap-x-1.5">
                <div className="flex items-center bg-black p-2">
  <i className="ph ph-bold ph-map-pin text-white"></i>
</div>
                  <div>{basics.location}</div>
                </div>
                <div className="bg-text size-1 rounded-full last:hidden" />
              </>
            )}

            {basics.phone && (
              <>
                <div className="flex items-center gap-x-1.5">
                <div className="flex items-center bg-black p-2">
  <i className="ph ph-bold ph-phone text-white"></i>
</div>

                  <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
                    {basics.phone}
                  </a>
                </div>
                <div className=" size-1 rounded-full last:hidden" />
              </>
            )}
            {basics.email && (
              <>
                <div className="flex items-center gap-x-1.5">
                <div className="flex items-center bg-black p-2">
  <i className="ph ph-bold ph-at text-white"></i>
</div>
                  <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
                    {basics.email}
                  </a>
                </div>
                <div className=" size-1 rounded-full last:hidden" />
              </>
            )}
            {isUrl(basics.url.href) && (
              <>
                <Link url={basics.url} />
                <div className=" size-1 rounded-full last:hidden" />
              </>
            )}
            {basics.customFields.map((item) => (
              <Fragment key={item.id}>
                <div className="flex items-center gap-x-1.5">
                  <i className={cn(`ph ph-bold ph-${item.icon}`, "text-primary")} />
                  <span>{[item.name, item.value].filter(Boolean).join(": ")}</span>
                </div>
                <div className="size-1 rounded-full last:hidden" />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id} style={{ margin: "10px" }}>
      <h4 className="text-3xl mb-2 text-2xl font-bold">{section.name}</h4>

   <div
        className="wysiwyg"
        style={{ columns: section.columns }}
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </section>
  );
};

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => {
  // Define linear transformation function
  const linearTransform = (
    value: number,
    oldMin: number,
    oldMax: number,
    newMin: number,
    newMax: number,
  ) => {
    return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
  };

  // Calculate width based on the level
  const width = linearTransform(level, 0, 5, 0, 128);

  return (
    <div className="relative h-1 w-[128px] group-[.sidebar]">
      <div className="absolute inset-0 h-1 w-[128px] rounded bg-primary opacity-25" />
      <div className="absolute inset-0 h-1 rounded bg-primary" style={{ width }} />
    </div>
  );
};

type LinkProps = {
  url: URL;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
};

const Link = ({ url, icon, label, className }: LinkProps) => {
  if (!isUrl(url.href)) return null;

  return (
    <div className="">
      {icon ?? <i className="ph ph-bold ph-link text-primary group-[.summary]:text-background" />}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className={cn("inline-block", className)}
      >
        {label || url.label || url.href}
      </a>
    </div>
  );
};

type SectionProps<T> = {
  section: SectionWithItem<T> | CustomSectionGroup;
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

const Section = <T,>({
  section,
  children,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id} className="grid" style={{ margin: "10px" }}>
      <h4 className="text-3xl mb-2 text-2xl font-bold">{section.name}</h4>

      <div
        className="grid gap-x-6 gap-y-3"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div key={item.id} className={cn("space-y-2", className)}>
                <div>
                  {children?.(item as T)}
                  {url !== undefined && <Link url={url} />}
                </div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: summary }} />
                )}

                {level !== undefined && level > 0 && <Rating level={level} />}

                {keywords !== undefined && keywords.length > 0 && (
                  <p className="text-sm">{keywords.join(", ")}</p>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};

const Profiles = () => {
  const section = useArtboardStore((state) => state.resume.sections.profiles);
  const fontSize = useArtboardStore((state) => state.resume.metadata.typography.font.size);

  return (
    <Section<Profile> section={section}>
      {(item) => (
        <div key={item.id} className="flex items-center gap-x-2">
          <Link
            url={item.url}
            label={item.username}
            className="text-sm"
            icon={
              <img
                className="ph"
                width={fontSize}
                height={fontSize}
                alt={item.network}
                src={`https://cdn.simpleicons.org/${item.icon}`}
              />
            }
          />
        </div>
      )}
    </Section>
  );
};
const Experience = () => {
  const section = useArtboardStore((state) => state.resume.sections.experience);

  return (
    <Section<Experience> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.company}</div>
            <div>{item.position}</div>
          </div>

          <div className="shrink-0 text-right group-[.sidebar]:text-left">
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Education = () => {
  const section = useArtboardStore((state) => state.resume.sections.education);

  return (
    <Section<Education> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.institution}</div>
            <div>{item.area}</div>
            <div>{item.score}</div>
          </div>

          <div className="shrink-0 text-right group-[.sidebar]:text-left">
            <div className="font-bold">{item.date}</div>
            <div>{item.studyType}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Awards = () => {
  const section = useArtboardStore((state) => state.resume.sections.awards);

  return (
    <Section<Award> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.title}</div>
            <div>{item.awarder}</div>
          </div>

          <div className="shrink-0 text-right group-[.sidebar]:text-left">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Certifications = () => {
  const section = useArtboardStore((state) => state.resume.sections.certifications);

  return (
    <Section<Certification> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.name}</div>
            <div>{item.issuer}</div>
          </div>

          <div className="shrink-0 text-right group-[.sidebar]:text-left">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Skills = () => {
  const section = useArtboardStore((state) => state.resume.sections.skills);

  return (
    <Section<Skill> section={section} levelKey="level" keywordsKey="keywords">
      {(item) => (
        <div>
          <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  return (
    <Section<Interest> section={section} className="space-y-1" keywordsKey="keywords">
      {(item) => <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.name}</div>}
    </Section>
  );
};

const Strength = () => {
  const section = useArtboardStore((state) => state.resume.sections.strengths);

  return (
    <Section<Strengths> section={section} className="space-y-1" keywordsKey="keywords">
      {(item) => <div className="font-bold">{item.name}</div>}
    </Section>
  );
};

const Publications = () => {
  const section = useArtboardStore((state) => state.resume.sections.publications);

  return (
    <Section<Publication> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.name}</div>
            <div>{item.publisher}</div>
          </div>

          <div className="shrink-0 text-right group-[.sidebar]:text-left">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Volunteer = () => {
  const section = useArtboardStore((state) => state.resume.sections.volunteer);

  return (
    <Section<Volunteer> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.organization}</div>
            <div>{item.position}</div>
          </div>

          <div className="shrink-0 text-right group-[.sidebar]:text-left">
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Languages = () => {
  const section = useArtboardStore((state) => state.resume.sections.languages);

  return (
    <Section<Language> section={section} levelKey="level">
      {(item) => (
        <div>
          <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Projects = () => {
  const section = useArtboardStore((state) => state.resume.sections.projects);

  return (
    <Section<Project> section={section} urlKey="url" summaryKey="summary" keywordsKey="keywords">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.name}</div>
            <div>{item.description}</div>
          </div>

          <div className="shrink-0 text-right group-[.sidebar]:text-left">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const References = () => {
  const section = useArtboardStore((state) => state.resume.sections.references);

  return (
    <Section<Reference> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Custom = ({ id }: { id: string }) => {
  const section = useArtboardStore((state) => state.resume.sections.custom[id]);

  return (
    <Section<CustomSection>
      section={section}
      urlKey="url"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">

<span className="inline-block list-none before:inline-block before:content-['\2022'] before:text-2xl before:text-gray-500 mr-2 align-middle"></span>


{item.name}</div>
            <div>{item.description}</div>
          </div>

          <div className="shrink-0 text-right group-[.sidebar]:text-left">
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const mapSectionToComponent = (section: SectionKey) => {
  switch (section) {
    case "profiles":
      return <Profiles />;
    case "summary":
      return <Summary />;
    case "experience":
      return <Experience />;
    case "education":
      return <Education />;
    case "awards":
      return <Awards />;
    case "certifications":
      return <Certifications />;
    case "skills":
      return <Skills />;
    case "interests":
      return <Interests />;
    case "strengths":
      return <Strength />;
    case "publications":
      return <Publications />;
    case "volunteer":
      return <Volunteer />;
    case "languages":
      return <Languages />;
    case "projects":
      return <Projects />;
    case "references":
      return <References />;
    default:
      if (section.startsWith("custom.")) return <Custom id={section.split(".")[1]} />;

      return null;
  }
};

export const Classic = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;

  return (
    <div>
      {isFirstPage && (
        <div className="relative" style={{ margin: "20px" }}>
          <Header />
          <div className="absolute inset-x-0 top-0 h-[85px] w-full" />
        </div>
      )}

      <div className="grid grid-cols-3 pt-5">
        <div className="sidebar p-custom group space-y-4 border-r-4 border-gray-500">
          {sidebar.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>

        <div className="main p-custom group col-span-2 space-y-4">
          {main.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
