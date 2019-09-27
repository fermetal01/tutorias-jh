import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProgramaAcademicoComponentsPage, { ProgramaAcademicoDeleteDialog } from './programa-academico.page-object';
import ProgramaAcademicoUpdatePage from './programa-academico-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ProgramaAcademico e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let programaAcademicoUpdatePage: ProgramaAcademicoUpdatePage;
  let programaAcademicoComponentsPage: ProgramaAcademicoComponentsPage;
  let programaAcademicoDeleteDialog: ProgramaAcademicoDeleteDialog;

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

  it('should load ProgramaAcademicos', async () => {
    await navBarPage.getEntityPage('programa-academico');
    programaAcademicoComponentsPage = new ProgramaAcademicoComponentsPage();
    expect(await programaAcademicoComponentsPage.getTitle().getText()).to.match(/Programa Academicos/);
  });

  it('should load create ProgramaAcademico page', async () => {
    await programaAcademicoComponentsPage.clickOnCreateButton();
    programaAcademicoUpdatePage = new ProgramaAcademicoUpdatePage();
    expect(await programaAcademicoUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /tutoriasApp.programaAcademico.home.createOrEditLabel/
    );
    await programaAcademicoUpdatePage.cancel();
  });

  it('should create and save ProgramaAcademicos', async () => {
    async function createProgramaAcademico() {
      await programaAcademicoComponentsPage.clickOnCreateButton();
      await programaAcademicoUpdatePage.setCodigoInput('codigo');
      expect(await programaAcademicoUpdatePage.getCodigoInput()).to.match(/codigo/);
      await programaAcademicoUpdatePage.setNombreInput('nombre');
      expect(await programaAcademicoUpdatePage.getNombreInput()).to.match(/nombre/);
      await programaAcademicoUpdatePage.setUrlInput('url');
      expect(await programaAcademicoUpdatePage.getUrlInput()).to.match(/url/);
      await programaAcademicoUpdatePage.setCorreoInput('correo');
      expect(await programaAcademicoUpdatePage.getCorreoInput()).to.match(/correo/);
      await programaAcademicoUpdatePage.departamentoSelectLastOption();
      // programaAcademicoUpdatePage.materiaSelectLastOption();
      await programaAcademicoUpdatePage.estudianteSelectLastOption();
      await waitUntilDisplayed(programaAcademicoUpdatePage.getSaveButton());
      await programaAcademicoUpdatePage.save();
      await waitUntilHidden(programaAcademicoUpdatePage.getSaveButton());
      expect(await programaAcademicoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProgramaAcademico();
    await programaAcademicoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await programaAcademicoComponentsPage.countDeleteButtons();
    await createProgramaAcademico();

    await programaAcademicoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await programaAcademicoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ProgramaAcademico', async () => {
    await programaAcademicoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await programaAcademicoComponentsPage.countDeleteButtons();
    await programaAcademicoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    programaAcademicoDeleteDialog = new ProgramaAcademicoDeleteDialog();
    expect(await programaAcademicoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /tutoriasApp.programaAcademico.delete.question/
    );
    await programaAcademicoDeleteDialog.clickOnConfirmButton();

    await programaAcademicoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await programaAcademicoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
