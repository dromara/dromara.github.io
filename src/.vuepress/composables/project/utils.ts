import type { GroupDetail, GroupOrder, ProjectItem } from "./types.js";

export const orderProjects = (
  detailsArray: GroupDetail[],
  orderArray: GroupOrder[]
): GroupDetail[] =>
  orderArray
    .map((orderGroup) => {
      const detailGroup = detailsArray.find(
        (detail) => detail.groupName === orderGroup.groupName
      );

      if (detailGroup != null) {
        const orderedProjects = orderGroup.projects
          .map((projectName) =>
            detailGroup.projects.find((project) => project.name === projectName)
          )
          .filter(Boolean) as ProjectItem[];

        return {
          groupName: orderGroup.groupName,
          projects: orderedProjects
        };
      }

      return null;
    })
    .filter((item): item is GroupDetail => Boolean(item));
