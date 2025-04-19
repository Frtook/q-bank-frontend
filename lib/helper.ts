export const getSubjectName = (id: number, academies: IAcademy[]) => {
  const academy = academies.find((academy) => academy.id === id);
  return academy?.name ?? "Unknown";
};
