import { CloudPictureFramePage } from './app.po';

describe('cloud-picture-frame App', () => {
  let page: CloudPictureFramePage;

  beforeEach(() => {
    page = new CloudPictureFramePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
