import { Skill } from "../types/skill";

export function filterSkillsByText(skills: Skill[], query: string): Skill[] {
  if (!query.trim()) return skills;

  const q = query.trim().toLowerCase().split(/\s+/);
  return skills.filter((skill) => {
    const haystack = (skill.title + " " + skill.description).toLowerCase();
    return q.every((term) => haystack.includes(term));
  });
}
