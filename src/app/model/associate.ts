import { AssociateSkills } from "./associate-skills";

export class Associate {
    constructor(
        public id: number,
        public associateId: number,
        public associateName: string,
        public email: string,
        public mobile: number,
        public gender: string,
        public status: string,
        public level: string,
        public remark: string,
        public strength: string,
        public weakness: string,
        public associatesCount: string,
        public femalePercentage: string,
        public malePercentage: string,
        public freshersPercentage: string,
        public ratedAssociatesCount: string,
        public femaleRatedPercentage: string,
        public maleRatedPercentage: string,
        public level1Percentage: string,
        public level2Percentage: string,
        public level3Percentage: string,
        public skills: string,
        public associateSkillsList: Array<AssociateSkills>,
        public associatesList: Array<Associate>
    ){ }
}
