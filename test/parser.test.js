import { expect } from 'chai';
import parse from '../src/parser';
import enchiladas from './example.html';
import thaiSalad from './example2.html';

describe('plain recipe', () => {
  const recipe = '<h3>Yummy Foods</h3>'
    + '<div class="instructions"><ol>'
    + '<li>do some stuff</li>'
    + '<li>do other things</li>'
    + '</ol></div>'
    + '<div class="ingredients"><ul>'
    + '<li>1 cup sugar</li>'
    + '<li>2 tbsp flour</li>'
    + '</ul></div>';
  let parsed;

  beforeEach(() => {
    parsed = parse(recipe);
  });

  it('will find the title in the first h-tag', () => {
    expect(parsed.title).to.equal('Yummy Foods');
  });

  it('will return the directions', () => {
    expect(parsed.directions[0].title).to.equal('');
    expect(parsed.directions[0].values).to.eql(['do some stuff', 'do other things']);
  });

  it('will return the ingredients', () => {
    expect(parsed.ingredients[0].title).to.equal('');
    expect(parsed.ingredients[0].values).to.eql(['1 cup sugar', '2 tbsp flour']);
  });
});

describe('empty recipe', () => {
  let parsed;
  beforeEach(() => {
    parsed = parse('');
  });

  it('should default things that don\'t exist', () => {
    expect(parsed.imageUrl).to.equal(null);
    expect(parsed.totalMinutes).to.equal(0);
    expect(parsed.servings).to.equal(null);
    expect(parsed.title).to.equal(null);
  });
  it('should return empty arrays for the arrays', () => {
    expect(parsed.ingredients).to.eql([]);
    expect(parsed.directions).to.eql([]);
  });
});

describe('skinnytaste enchiladas', () => {
  let parsed;
  beforeEach(() => {
    parsed = parse(enchiladas);
  });

  it('will get the correct title', () => {
    expect(parsed.title).to.equal('Chicken Enchiladas');
  });

  it('will have all of the directions', () => {
    expect(parsed.directions[0].values.length).to.equal(7);
    expect(parsed.directions[0].values[0].substring(0, 20)).to.equal('In a medium saucepan');
    expect(parsed.directions[0].values.pop().substring(0, 20)).to.equal('Cover with aluminum ');
  });

  it('will have the image', () => {
    expect(parsed.imageUrl).to.equal('https://www.skinnytaste.com/wp-content/uploads/2011/08/Gina-Skinny-Chicken-Enchiladas-4-3-170x255.jpg');
  });

  it('will include the total time', () => {
    expect(parsed.totalMinutes).to.equal(45);
  });

  it('will include the number of servings', () => {
    expect(parsed.servings).to.equal(8);
  });

  it('will include the amount per serving', () => {
    expect(parsed.perServing).to.equal('1 enchilada');
  });

  describe('ingredients', () => {
    it('will split the ingredient lists', () => {
      expect(parsed.ingredients.length).to.equal(3);
    });

    it('will have custom titles for each list', () => {
      expect(parsed.ingredients[0].title).to.equal('Enchilada Sauce');
      expect(parsed.ingredients[1].title).to.equal('Chicken');
      expect(parsed.ingredients[2].title).to.equal('Enchilada');
    });

    it('will include each list separately', () => {
      expect(parsed.ingredients[0].values.length).to.equal(7);
      expect(parsed.ingredients[1].values.length).to.equal(11);
      expect(parsed.ingredients[2].values.length).to.equal(4);
    });
  });
});

describe('skinnytaste thai salad', () => {
  let parsed;
  beforeEach(() => {
    parsed = parse(thaiSalad);
  });

  it('will have 3 sets of directions', () => {
    expect(parsed.directions.length).to.equal(3);
  });

  it('will set the titles of the directions', () => {
    expect(parsed.directions[0].title).to.equal('Dressing');
    expect(parsed.directions[1].title).to.equal('Shrimp');
    expect(parsed.directions[2].title).to.equal('Salad');
  });

  it('will set the values for the directions', () => {
    expect(parsed.directions[0].values[0].substring(0, 10)).to.equal('In a small');
    expect(parsed.directions[1].values[2].substring(0, 10)).to.equal('Add the sh');
  });
});

describe('time parsing', () => {
  it('will turn hours into minutes', () => {
    const parsed = parse('<div>Total Time: <span itemprop="totalTime" content="PT4H"/> 123 things</div>');
    expect(parsed.totalMinutes).to.equal(240);
  });
  it('will not die if it is empty', () => {
    const parsed = parse('<div>Total Time: 1</div>');
    expect(parsed.totalMinutes).to.equal(0);
  });
  it('will read 35 minutes with the normal syntax', () => {
    const parsed = parse('<div>Total Time: <span itemprop="totalTime" content="PT35M"/> 35 Minutes</div>');
    expect(parsed.totalMinutes).to.equal(35);
  });
  it('will read 45 minutes with the weird syntax', () => {
    const parsed = parse('<div>Total Time: <span itemprop="totalTime" content="PT45Minutes"/> 45 Minutes</div>');
    expect(parsed.totalMinutes).to.equal(45);
  });
  it('will read 0 minutes', () => {
    const parsed = parse('<div>Total Time: <span itemprop="totalTime" content="PT0"/> 0 Minutes</div>');
    expect(parsed.totalMinutes).to.equal(0);
  });
});
