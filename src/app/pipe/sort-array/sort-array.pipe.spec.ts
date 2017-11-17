import { SortArrayPipe } from './sort-array.pipe';

describe('Sort array pipe', () => {
  let items: any[];
  let pipe = new SortArrayPipe();

  beforeEach(() => {
    items = [{
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way',
      city: 'Bedrock',
      state: 'Washingstone'
    }, {
      name: 'John Smith',
      address: '415 East Main Street',
      city: 'Norfolk',
      state: 'Virginia',
      pin: true
    }, {
      name: 'Frank Livingston',
      address: '234 Elm Street',
      city: 'Pittsburgh',
      state: 'Pennsylvania'
    }, {
      name: 'Linda McGovern',
      address: '22 Oak Street',
      city: 'Denver',
      state: 'Colorado',
      pin: true
    }, {
      name: 'Jim Brown',
      address: '72 Bourbon Way',
      city: 'Nashville',
      state: 'Tennessee'
    }, {
      name: 'Holly Nichols',
      address: '21 Jump Street',
      city: 'Hollywood',
      state: 'California',
      pin: true
    }, {
      name: 'Marie Edwards',
      address: '17 Cross Street',
      city: 'Boston',
      state: 'Massachusetts'
    }, {
      name: 'Pat Thomas',
      address: '50 Second Street',
      city: 'New York',
      state: 'New York'
    }];
  });

  it('should sort array by "name" ascending', () => {
    let sortedItems = pipe.transform(items, 'name');
    expect(sortedItems[0].name).toBe('Frank Livingston');
  });

  it('should sort array by "name" descending', () => {
    let sortedItems = pipe.transform(items, 'name', true);
    expect(sortedItems[0].name).toBe('Pat Thomas');
  });

  it('should sort array by "name", then sort array by "pin"', () => {
    let sortedItems = pipe.transform(items, 'name');
    sortedItems = pipe.transform(sortedItems, 'pin', true);
    expect(sortedItems[0].name).toBe('Holly Nichols');
  });
});
