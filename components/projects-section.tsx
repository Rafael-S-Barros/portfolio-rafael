"use client";

import { useTranslations } from "next-intl";

import { projects } from "@/lib/projects";
import { ImageSlot } from "./image-slot";
import { useLocale } from "./providers";
import { SectionHeading } from "./section-heading";
import { useReveal } from "./use-reveal";

function ExternalLinkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18.92-.26 1.9-.38 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function ProjectsSection() {
  const t = useTranslations("projetos");
  const { locale } = useLocale();
  const { ref, inView } = useReveal<HTMLElement>();

  return (
    <section id="projetos" ref={ref} data-inview={inView} className="rb-section">
      <div className="bg-grid" />
      <div className="rb-container pj-list">
        <SectionHeading num="02" label={t("label")} title={t("headline")} />

        {projects.map((project, i) => {
          const side = i % 2 === 1 ? "right" : "left";
          const alt = project.imageAlt[locale];

          return (
            <div key={project.id} className="pj-row" data-side={side}>
              <div className={`pj-prev rv rvd${i * 2}`}>
                <div className="pj-frame">
                  <div className="pj-chrome">
                    <div className="pj-dots" aria-hidden="true">
                      <span className="pj-dot" />
                      <span className="pj-dot" />
                      <span className="pj-dot" />
                    </div>
                    <div className="pj-url">{project.urlLabel}</div>
                  </div>
                  <div className="pj-shot">
                    <ImageSlot
                      src={project.image}
                      alt={alt}
                      sizes="(max-width: 760px) 100vw, 55vw"
                    />
                  </div>
                </div>
              </div>

              <div className={`pj-text rv rvd${i * 2 + 1}`}>
                <h3 className="pj-name">{project.name}</h3>
                <p className="pj-desc">{project.description[locale]}</p>

                <div className="pj-tags">
                  {project.stack.map((tech) => (
                    <span key={tech} className="pj-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pj-links">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pj-icon"
                      aria-label={t("liveAria", { name: project.name })}
                    >
                      <ExternalLinkIcon />
                    </a>
                  ) : null}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pj-icon"
                    aria-label={t("ghAria", { name: project.name })}
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
