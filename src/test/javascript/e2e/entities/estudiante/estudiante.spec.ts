import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EstudianteComponentsPage, { EstudianteDeleteDialog } from './estudiante.page-object';
import EstudianteUpdatePage from './estudiante-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Estudiante e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let estudianteUpdatePage: EstudianteUpdatePage;
  let estudianteComponentsPage: EstudianteComponentsPage;
  let estudianteDeleteDialog: EstudianteDeleteDialog;

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

  it('should load Estudiantes', async () => {
    await navBarPage.getEntityPage('estudiante');
    estudianteComponentsPage = new EstudianteComponentsPage();
    expect(await estudianteComponentsPage.getTitle().getText()).to.match(/Estudiantes/);
  });

  it('should load create Estudiante page', async () => {
    await estudianteComponentsPage.clickOnCreateButton();
    estudianteUpdatePage = new EstudianteUpdatePage();
    expect(await estudianteUpdatePage.getPageTitle().getAttribute('id')).to.match(/tutoriasApp.estudiante.home.createOrEditLabel/);
    await estudianteUpdatePage.cancel();
  });

  it('should create and save Estudiantes', async () => {
    async function createEstudiante() {
      await estudianteComponentsPage.clickOnCreateButton();
      await estudianteUpdatePage.setCarreraInput('carrera');
      expect(await estudianteUpdatePage.getCarreraInput()).to.match(/carrera/);
      await estudianteUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(estudianteUpdatePage.getSaveButton());
      await estudianteUpdatePage.save();
      await waitUntilHidden(estudianteUpdatePage.getSaveButton());
      expect(await estudianteUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEstudiante();
    await estudianteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await estudianteComponentsPage.countDeleteButtons();
    await createEstudiante();

    await estudianteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await estudianteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Estudiante', async () => {
    await estudianteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await estudianteComponentsPage.countDeleteButtons();
    await estudianteComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    estudianteDeleteDialog = new EstudianteDeleteDialog();
    expect(await estudianteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutoriasApp.estudiante.delete.question/);
    await estudianteDeleteDialog.clickOnConfirmButton();

    await estudianteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await estudianteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
