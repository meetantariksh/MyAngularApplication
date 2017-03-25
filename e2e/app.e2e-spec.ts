import { MyAngularApplicationPage } from './app.po';

describe('my-angular-application App', () => {
  let page: MyAngularApplicationPage;

  beforeEach(() => {
    page = new MyAngularApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
