"use client";

import { useState } from "react";
import { Template, uploadUrl } from "@/lib/api";

function TemplateMockup() {
  return (
    <div className="tmpl-mockup">
      <div className="tmpl-top-bar"></div>
      <div className="tmpl-avatar-row">
        <div className="tmpl-avatar"></div>
        <div className="tmpl-name-block">
          <div className="tmpl-line" style={{ width: "70%" }}></div>
          <div className="tmpl-line" style={{ width: "50%" }}></div>
        </div>
      </div>
      <div className="tmpl-two-col">
        <div className="tmpl-col">
          <div className="tmpl-section-label"></div>
          <div className="tmpl-line" style={{ width: "100%" }}></div>
          <div className="tmpl-line" style={{ width: "85%" }}></div>
          <div className="tmpl-line" style={{ width: "90%" }}></div>
          <div className="tmpl-section-label"></div>
          <div className="tmpl-line" style={{ width: "100%" }}></div>
          <div className="tmpl-line" style={{ width: "70%" }}></div>
        </div>
        <div className="tmpl-sidebar">
          <div className="tmpl-line" style={{ width: "80%" }}></div>
          <div className="tmpl-line" style={{ width: "65%" }}></div>
          <div className="tmpl-line" style={{ width: "75%" }}></div>
        </div>
      </div>
    </div>
  );
}

export function TemplatePreviewMedia({ template }: { template: Template }) {
  const [failed, setFailed] = useState(false);

  if (template.previewImage && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={uploadUrl(template.previewImage)}
        alt={`${template.name} preview`}
        className="template-preview-img"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  // Prefer mockup over broken PDF iframes when files were wiped on Railway
  if (template.pdfFile && !failed) {
    return (
      <iframe
        src={`${uploadUrl(template.pdfFile)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
        title={`${template.name} PDF preview`}
        className="template-preview-pdf"
        onError={() => setFailed(true)}
      />
    );
  }

  return <TemplateMockup />;
}

export function hasTemplatePreview(template: Template): boolean {
  return Boolean(template.previewImage || template.pdfFile);
}
