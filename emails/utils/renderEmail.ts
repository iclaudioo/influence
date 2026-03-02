import { render } from "@react-email/components";
import type { ReactElement } from "react";

export async function renderEmail(component: ReactElement): Promise<{
  html: string;
  text: string;
}> {
  const html = await render(component);
  const text = await render(component, { plainText: true });
  return { html, text };
}
