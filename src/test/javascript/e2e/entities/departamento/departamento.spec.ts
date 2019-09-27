import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DepartamentoComponentsPage, { DepartamentoDeleteDialog } from './departamento.page-object';
import DepartamentoUpdatePage from './departamento-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Departamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let departamentoUpdatePage: DepartamentoUpdatePage;
  let departamentoComponentsPage: DepartamentoComponentsPage;
  let departamentoDeleteDialog: DepartamentoDeleteDialog;

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

  it('should load Departamentos', async () => {
    await navBarPage.getEntityPage('departamento');
    departamentoComponentsPage = new DepartamentoComponentsPage();
    expect(await departamentoComponentsPage.getTitle().getText()).to.match(/Departamentos/);
  });

  it('should load create Departamento page', async () => {
    await departamentoComponentsPage.clickOnCreateButton();
    departamentoUpdatePage = new DepartamentoUpdatePage();
    expect(await departamentoUpdatePage.getPageTitle().getAttribute('id')).to.match(/tutoriasApp.departamento.home.createOrEditLabel/);
    await departamentoUpdatePage.cancel();
  });

  it('should create and save Departamentos', async () => {
    async function createDepartamento() {
      await departamentoComponentsPage.clickOnCreateButton();
      await departamentoUpdatePage.setNombreInput('nombre');
      expect(await departamentoUpdatePage.getNombreInput()).to.match(/nombre/);
      await departamentoUpdatePage.setDecanoInput('decano');
      expect(await departamentoUpdatePage.getDecanoInput()).to.match(/decano/);
      await departamentoUpdatePage.profesorSelectLastOption();
      await waitUntilDisplayed(departamentoUpdatePage.getSaveButton());
      await departamentoUpdatePage.save();
      await waitUntilHidden(departamentoUpdatePage.getSaveButton());
      expect(await departamentoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createDepartamento();
    await departamentoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await departamentoComponentsPage.countDeleteButtons();
    await createDepartamento();

    await departamentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await departamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Departamento', async () => {
    await departamentoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await departamentoComponentsPage.countDeleteButtons();
    await departamentoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    departamentoDeleteDialog = new DepartamentoDeleteDialog();
    expect(await departamentoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutoriasApp.departamento.delete.question/);
    await departamentoDeleteDialog.clickOnConfirmButton();

    await departamentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await departamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
