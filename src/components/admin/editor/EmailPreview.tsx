"use client";

import React, { useRef, useEffect } from "react";

interface EmailPreviewProps {
  html: string;
  subject: string;
  previewText?: string;
}

export default function EmailPreview({
  html,
  subject,
  previewText,
}: EmailPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    const wrappedHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body {
              margin: 0;
              padding: 24px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-size: 15px;
              line-height: 1.6;
              color: #1a1a1a;
              background: #ffffff;
            }
            img { max-width: 100%; height: auto; }
            a { color: #d55d25; }
            h1, h2, h3 { color: #02182B; }
          </style>
        </head>
        <body>${html || '<p style="color:#999;">Email content will appear here...</p>'}</body>
      </html>
    `;

    doc.open();
    doc.write(wrappedHtml);
    doc.close();
  }, [html]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Email chrome header */}
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-xs font-medium text-gray-400">
              From
            </span>
            <span className="text-sm text-gray-700">
              Influence Circle &lt;hello@influencecircle.nl&gt;
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-xs font-medium text-gray-400">
              To
            </span>
            <span className="text-sm text-gray-700">
              {"{{name}}"} &lt;{"{{email}}"}&gt;
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-xs font-medium text-gray-400">
              Subject
            </span>
            <span className="text-sm font-medium text-gray-900">
              {subject || "No subject"}
            </span>
          </div>
          {previewText && (
            <div className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-xs font-medium text-gray-400">
                Preview
              </span>
              <span className="text-sm text-gray-500 italic">
                {previewText}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Email body preview */}
      <div className="bg-white">
        <iframe
          ref={iframeRef}
          title="Email Preview"
          className="w-full border-0"
          style={{ minHeight: "400px", height: "100%" }}
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}
