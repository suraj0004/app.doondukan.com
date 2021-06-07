import { revert } from "url-slug";

export const convertShopSlugToName = (slug) => {
  if (!slug) {
    return "DoonDukan";
  }
  let name = revert(slug).split(" ");
  if(name.length <= 1){
    return "DoonDukan";
  }
  name.shift()
  name = name.join(" ");
  return name[0].toUpperCase() + name.slice(1);
};
