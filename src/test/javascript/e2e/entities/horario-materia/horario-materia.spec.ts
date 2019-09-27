import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import HorarioMateriaComponentsPage, { HorarioMateriaDeleteDialog } from './horario-materia.page-object';
import HorarioMateriaUpdatePage from './horario-materia-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('HorarioMateria e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let horarioMateriaUpdatePage: HorarioMateriaUpdatePage;
  let horarioMateriaComponentsPage: HorarioMateriaComponentsPage;
  let horarioMateriaDeleteDialog: HorarioMateriaDeleteDialog;

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

  it('should load HorarioMaterias', async () => {
    await navBarPage.getEntityPage('horario-materia');
    horarioMateriaComponentsPage = new HorarioMateriaComponentsPage();
    expect(await horarioMateriaComponentsPage.getTitle().getText()).to.match(/Horario Materias/);
  });

  it('should load create HorarioMateria page', async () => {
    await horarioMateriaComponentsPage.clickOnCreateButton();
    horarioMateriaUpdatePage = new HorarioMateriaUpdatePage();
    expect(await horarioMateriaUpdatePage.getPageTitle().getAttribute('id')).to.match(/tutoriasApp.horarioMateria.home.createOrEditLabel/);
    await horarioMateriaUpdatePage.cancel();
  });

  it('should create and save HorarioMaterias', async () => {
    async function createHorarioMateria() {
      await horarioMateriaComponentsPage.clickOnCreateButton();
      await horarioMateriaUpdatePage.setProfesorInput('profesor');
      expect(await horarioMateriaUpdatePage.getProfesorInput()).to.match(/profesor/);
      await horarioMateriaUpdatePage.setHoraInicioInput('horaInicio');
      expect(await horarioMateriaUpdatePage.getHoraInicioInput()).to.match(/horaInicio/);
      await horarioMateriaUpdatePage.setHoraFinInput('horaFin');
      expect(await horarioMateriaUpdatePage.getHoraFinInput()).to.match(/horaFin/);
      await horarioMateriaUpdatePage.diaSelectLastOption();
      await horarioMateriaUpdatePage.materiaSelectLastOption();
      await horarioMateriaUpdatePage.profesorSelectLastOption();
      await waitUntilDisplayed(horarioMateriaUpdatePage.getSaveButton());
      await horarioMateriaUpdatePage.save();
      await waitUntilHidden(horarioMateriaUpdatePage.getSaveButton());
      expect(await horarioMateriaUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createHorarioMateria();
    await horarioMateriaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await horarioMateriaComponentsPage.countDeleteButtons();
    await createHorarioMateria();

    await horarioMateriaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await horarioMateriaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last HorarioMateria', async () => {
    await horarioMateriaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await horarioMateriaComponentsPage.countDeleteButtons();
    await horarioMateriaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    horarioMateriaDeleteDialog = new HorarioMateriaDeleteDialog();
    expect(await horarioMateriaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutoriasApp.horarioMateria.delete.question/);
    await horarioMateriaDeleteDialog.clickOnConfirmButton();

    await horarioMateriaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await horarioMateriaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
