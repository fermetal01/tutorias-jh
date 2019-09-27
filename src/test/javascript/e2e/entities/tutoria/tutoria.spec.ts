import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TutoriaComponentsPage, { TutoriaDeleteDialog } from './tutoria.page-object';
import TutoriaUpdatePage from './tutoria-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Tutoria e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tutoriaUpdatePage: TutoriaUpdatePage;
  let tutoriaComponentsPage: TutoriaComponentsPage;
  let tutoriaDeleteDialog: TutoriaDeleteDialog;

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

  it('should load Tutorias', async () => {
    await navBarPage.getEntityPage('tutoria');
    tutoriaComponentsPage = new TutoriaComponentsPage();
    expect(await tutoriaComponentsPage.getTitle().getText()).to.match(/Tutorias/);
  });

  it('should load create Tutoria page', async () => {
    await tutoriaComponentsPage.clickOnCreateButton();
    tutoriaUpdatePage = new TutoriaUpdatePage();
    expect(await tutoriaUpdatePage.getPageTitle().getAttribute('id')).to.match(/tutoriasApp.tutoria.home.createOrEditLabel/);
    await tutoriaUpdatePage.cancel();
  });

  it('should create and save Tutorias', async () => {
    async function createTutoria() {
      await tutoriaComponentsPage.clickOnCreateButton();
      await tutoriaUpdatePage.setHoraInicioInput('horaInicio');
      expect(await tutoriaUpdatePage.getHoraInicioInput()).to.match(/horaInicio/);
      await tutoriaUpdatePage.setHoraFinInput('horaFin');
      expect(await tutoriaUpdatePage.getHoraFinInput()).to.match(/horaFin/);
      await tutoriaUpdatePage.diaSelectLastOption();
      await tutoriaUpdatePage.setProfesorInput('profesor');
      expect(await tutoriaUpdatePage.getProfesorInput()).to.match(/profesor/);
      await tutoriaUpdatePage.setEstudianteInput('estudiante');
      expect(await tutoriaUpdatePage.getEstudianteInput()).to.match(/estudiante/);
      const selectedTomada = await tutoriaUpdatePage.getTomadaInput().isSelected();
      if (selectedTomada) {
        await tutoriaUpdatePage.getTomadaInput().click();
        expect(await tutoriaUpdatePage.getTomadaInput().isSelected()).to.be.false;
      } else {
        await tutoriaUpdatePage.getTomadaInput().click();
        expect(await tutoriaUpdatePage.getTomadaInput().isSelected()).to.be.true;
      }
      await tutoriaUpdatePage.materiaSelectLastOption();
      await tutoriaUpdatePage.estudianteSelectLastOption();
      await tutoriaUpdatePage.profesorSelectLastOption();
      await waitUntilDisplayed(tutoriaUpdatePage.getSaveButton());
      await tutoriaUpdatePage.save();
      await waitUntilHidden(tutoriaUpdatePage.getSaveButton());
      expect(await tutoriaUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTutoria();
    await tutoriaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await tutoriaComponentsPage.countDeleteButtons();
    await createTutoria();

    await tutoriaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await tutoriaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Tutoria', async () => {
    await tutoriaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await tutoriaComponentsPage.countDeleteButtons();
    await tutoriaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    tutoriaDeleteDialog = new TutoriaDeleteDialog();
    expect(await tutoriaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutoriasApp.tutoria.delete.question/);
    await tutoriaDeleteDialog.clickOnConfirmButton();

    await tutoriaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await tutoriaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
