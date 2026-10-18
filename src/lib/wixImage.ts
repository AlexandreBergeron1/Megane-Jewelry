// src/lib/wixImage.ts
export const wixImage = (url: string | undefined, width: number, height?: number) => {
  if (!url) return "/product.png";
  // Wix media URLs accept a fit/resize suffix: /v1/fill/w_{w},h_{h}/...
  const base = url.split("/v1/")[0];
  const rest = url.split("/v1/")[1];
  if (!rest) return url;
  const path = rest.split("/").slice(1).join("/");
  return `${base}/v1/fill/w_${width},h_${height ?? width},q_80/${path}`;
};