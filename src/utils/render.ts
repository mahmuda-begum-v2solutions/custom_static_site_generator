import ejs from "ejs";

export function renderTemplate<T extends ejs.Data>(
  template: string,
  data: T
): string {
  return ejs.render(template, data, { async: false }); // force sync render { async: false } in case we use await in future
}
