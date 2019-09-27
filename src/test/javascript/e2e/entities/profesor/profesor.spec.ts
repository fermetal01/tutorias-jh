import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProfesorComponentsPage, { ProfesorDeleteDialog } from './profesor.page-object';
import ProfesorUpdatePage from './profesor-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Profesor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profesorUpdatePage: ProfesorUpdatePage;
  let profesorComponentsPage: ProfesorComponentsPage;
  let profesorDeleteDialog: ProfesorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Profesors', async () => {
    await navBarPage.getEntityPage('profesor');
    profesorComponentsPage = new ProfesorComponentsPage();
    expect(await profesorComponentsPage.getTitle().getText()).to.match(/Profesors/);
  });

  it('should load create Profesor page', async () => {
    await profesorComponentsPage.clickOnCreateButton();
    profesorUpdatePage = new ProfesorUpdatePage();
    expect(await profesorUpdatePage.getPageTitle().getAttribute('id')).to.match(/tutoriasApp.profesor.home.createOrEditLabel/);
    await profesorUpdatePage.cancel();
  });

  it('should create and save Profesors', async () => {
    async function createProfesor() {
      await profesorComponentsPage.clickOnCreateButton();
      await profesorUpdatePage.setAreaInput('area');
      expect(await profesorUpdatePage.getAreaInput()).to.match(/area/);
      await profesorUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(profesorUpdatePage.getSaveButton());
      await profesorUpdatePage.save();
      await waitUntilHidden(profesorUpdatePage.getSaveButton());
      expect(await profesorUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProfesor();
    await profesorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await profesorComponentsPage.countDeleteButtons();
    await createProfesor();

    await profesorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await profesorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Profesor', async () => {
    await profesorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await profesorComponentsPage.countDeleteButtons();
    await profesorComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    profesorDeleteDialog = new ProfesorDeleteDialog();
    expect(await profesorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutoriasApp.profesor.delete.question/);
    await profesorDeleteDialog.clickOnConfirmButton();

    await profesorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await profesorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
