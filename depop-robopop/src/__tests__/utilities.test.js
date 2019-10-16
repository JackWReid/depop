import { productImages } from '../utilities';
import exampleFeaturedItems from '../stubs/exampleFeaturedItems';

describe('product image unwrapper', () => {
  it('returns something', () => {
    expect(productImages(exampleFeaturedItems[0].pictures_data)).toBeDefined();
  });

  it('returns an array', () => {
    expect(productImages(exampleFeaturedItems[0].pictures_data).length).toBeDefined();
  });

  it('has an array where positions are defined', () => {
    expect(productImages(exampleFeaturedItems[0].pictures_data)[0]).toBeDefined();
  });

  it('has an array of strings', () => {
    expect(typeof productImages(exampleFeaturedItems[0].pictures_data)[0]).toBe('string');
  });
})
