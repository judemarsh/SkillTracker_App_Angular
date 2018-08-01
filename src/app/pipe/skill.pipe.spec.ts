import { SkillPipe } from './skill.pipe';

describe('SkillPipe', () => {
  let skillPipe: SkillPipe;

  let mockData =[
    {
      skillId: 1,
      skillName: "Skill 1"
    },
    {
      skillId: 2,
      skillName: "Skill 2"
    },
  ]

  beforeEach(() => {
    skillPipe = new SkillPipe();
  });

  it('create an instance', () => {
    expect(skillPipe).toBeTruthy();
  });

  it('should filter by skill Name', () => {
    expect(skillPipe.transform(mockData,"1")).toContain(mockData[0]);
  });

  it('should not throw error when value is not set', () => {
    expect(skillPipe.transform(undefined,"1")).toEqual([]);
  });
  it('should not throw error when search value is not set', () => {
    expect(skillPipe.transform(mockData,undefined)).toEqual(mockData);
  });
});
