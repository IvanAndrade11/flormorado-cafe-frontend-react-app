export const scrollToSection = (id: string) => {
  const e = document.getElementById(id);
  e && e.scrollIntoView({ behavior: "smooth" });
};
