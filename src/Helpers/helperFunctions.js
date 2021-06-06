import { revert } from "url-slug";

export const convertShopSlugToName = (slug) => {
  if (!slug) {
    return "DoonDukan";
  }
  let name = revert(slug).split(" ").splice(1, 1).join(" ");
  return name[0].toUpperCase() + name.slice(1);
};
