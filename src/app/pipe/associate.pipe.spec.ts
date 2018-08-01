import { AssociatePipe } from './associate.pipe';

describe('AssociatePipe', () => {

  let associatePipe: AssociatePipe;

  let mockData =[
    {
      associateId: 100,
      associateName: "JUDE",
      email: "jude@abc.in",
      mobile: 9876543210,
      skills: "HTML5, CSS3, JAVA"
    },
    {
      associateId: 101,
      associateName: "MARSHAL",
      email: "marshal@abc.in",
      mobile: 9638527410,
      skills: "HTML5, JAVA"
    },
  ]

  beforeEach(() => {
    associatePipe = new AssociatePipe();
  });

  it('create an instance', () => {
    expect(associatePipe).toBeTruthy();
  });

  it('should not throw error when value is not set', () => {
    expect(associatePipe.transform(undefined,null,100,null,null,null)).toEqual([]);
  });
  it('should not throw error when search value is not set', () => {
    expect(associatePipe.transform(mockData,undefined,undefined,undefined,undefined,undefined)).toEqual(mockData);
  });

  it('should filter by associate ID', () => {
    expect(associatePipe.transform(mockData,null,100,null,null,null)).toContain(mockData[0]);
  });

  it('should filter by associate name', () => {
    expect(associatePipe.transform(mockData,"JU",null,null,null,null)).toContain(mockData[0]);
  });

  it('should filter by associate email', () => {
    expect(associatePipe.transform(mockData,null,null,"JUDE",null,null)).toContain(mockData[0]);
  });

  it('should filter by associate mobile', () => {
    expect(associatePipe.transform(mockData,null,null,null,98,null)).toContain(mockData[0]);
  });

  it('should filter by associate mobile', () => {
    expect(associatePipe.transform(mockData,null,null,null,null,"CSS3")).toContain(mockData[0]);
  });

});
