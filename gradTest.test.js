function createMenuData(data) {
  var i, j, parent='no', child, n;
  const parentcheck = [];
  const test = [];
  temp = [];
  const children = [];
  
  for (i = 0; i < data.length; i++) {  
      n=0;
      temp = []
      if (data[i].includes('parent') && data[i].includes('/'))
      {
        parentcheck.push(parent);
        parent=data[i].substr(0, data[i].indexOf('/',0));
        if (parentcheck.includes(parent))
          {
            n+=1;
          }
        for (j = 0; j < data.length; j++) {
          if (data[j].includes(parent) && data[j].includes('/'))
          {
            child=data[j].slice(data[j].indexOf('/',1)),0;
            temp.push(child.slice(1));
          }
        }
        if (n==0 && temp.length!=0)
        {
          test.push({title: parent, data: temp});
          n=+1;
        }
      
      }
    }
  return test
}


describe("menu Data Generator", () => {
    it("creates correct data structure ", () => {
      const data = [
        "parent1/parent1child",
        "parent1/parent1child2",
        "parent2/parent2child",
        "parent2/parent2child2",
        "parent1/parent1child3",
        "parent3",
        "parent3/parent3child1",
        "parent4"
      ];
  
      const expectedResult = [
        {
          title: "parent1",
          data: ["parent1child", "parent1child2", "parent1child3"]
        },
        { title: "parent2", data: ["parent2child", "parent2child2"] },
        { title: "parent3", data: ["parent3child1"] }
      ];
  
      const actualResult = createMenuData(data);
      expect(actualResult).toMatchObject(expectedResult);
    });
  });