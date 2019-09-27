import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MateriaComponentsPage, { MateriaDeleteDialog } from './materia.page-object';
import MateriaUpdatePage from './materia-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Materia e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let materiaUpdatePage: MateriaUpdatePage;
  let materiaComponentsPage: MateriaComponentsPage;
  let materiaDeleteDialog: MateriaDeleteDialog;

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

  it('should load Materias', async () => {
    await navBarPage.getEntityPage('materia');
    materiaComponentsPage = new MateriaComponentsPage();
    expect(await materiaComponentsPage.getTitle().getText()).to.match(/Materias/);
  });

  it('should load create Materia page', async () => {
    await materiaComponentsPage.clickOnCreateButton();
    materiaUpdatePage = new MateriaUpdatePage();
    expect(await materiaUpdatePage.getPageTitle().getAttribute('id')).to.match(/tutoriasApp.materia.home.createOrEditLabel/);
    await materiaUpdatePage.cancel();
  });

  it('should create and save Materias', async () => {
    async function createMateria() {
      await materiaComponentsPage.clickOnCreateButton();
      await materiaUpdatePage.setCodigoInput('codigo');
      expect(await materiaUpdatePage.getCodigoInput()).to.match(/codigo/);
      await materiaUpdatePage.setNombreInput('nombre');
      expect(await materiaUpdatePage.getNombreInput()).to.match(/nombre/);
      await materiaUpdatePage.setCreditosInput('5');
      expect(await materiaUpdatePage.getCreditosInput()).to.eq('5');
      await waitUntilDisplayed(materiaUpdatePage.getSaveButton());
      await materiaUpdatePage.save();
      await waitUntilHidden(materiaUpdatePage.getSaveButton());
      expect(await materiaUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createMateria();
    await materiaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await materiaComponentsPage.countDeleteButtons();
    await createMateria();

    await materiaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await materiaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Materia', async () => {
    await materiaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await materiaComponentsPage.countDeleteButtons();
    await materiaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    materiaDeleteDialog = new MateriaDeleteDialog();
    expect(await materiaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutoriasApp.materia.delete.question/);
    await materiaDeleteDialog.clickOnConfirmButton();

    await materiaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await materiaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
