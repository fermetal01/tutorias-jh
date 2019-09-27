import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ComentarioComponentsPage, { ComentarioDeleteDialog } from './comentario.page-object';
import ComentarioUpdatePage from './comentario-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Comentario e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let comentarioUpdatePage: ComentarioUpdatePage;
  let comentarioComponentsPage: ComentarioComponentsPage;
  let comentarioDeleteDialog: ComentarioDeleteDialog;

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

  it('should load Comentarios', async () => {
    await navBarPage.getEntityPage('comentario');
    comentarioComponentsPage = new ComentarioComponentsPage();
    expect(await comentarioComponentsPage.getTitle().getText()).to.match(/Comentarios/);
  });

  it('should load create Comentario page', async () => {
    await comentarioComponentsPage.clickOnCreateButton();
    comentarioUpdatePage = new ComentarioUpdatePage();
    expect(await comentarioUpdatePage.getPageTitle().getAttribute('id')).to.match(/tutoriasApp.comentario.home.createOrEditLabel/);
    await comentarioUpdatePage.cancel();
  });

  it('should create and save Comentarios', async () => {
    async function createComentario() {
      await comentarioComponentsPage.clickOnCreateButton();
      await comentarioUpdatePage.setComentarioInicialInput('comentarioInicial');
      expect(await comentarioUpdatePage.getComentarioInicialInput()).to.match(/comentarioInicial/);
      await comentarioUpdatePage.setPadreInput('padre');
      expect(await comentarioUpdatePage.getPadreInput()).to.match(/padre/);
      await comentarioUpdatePage.setDescripcionInput('descripcion');
      expect(await comentarioUpdatePage.getDescripcionInput()).to.match(/descripcion/);
      await comentarioUpdatePage.setUsuarioInput('usuario');
      expect(await comentarioUpdatePage.getUsuarioInput()).to.match(/usuario/);
      await comentarioUpdatePage.tutoriaSelectLastOption();
      await waitUntilDisplayed(comentarioUpdatePage.getSaveButton());
      await comentarioUpdatePage.save();
      await waitUntilHidden(comentarioUpdatePage.getSaveButton());
      expect(await comentarioUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createComentario();
    await comentarioComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await comentarioComponentsPage.countDeleteButtons();
    await createComentario();

    await comentarioComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await comentarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Comentario', async () => {
    await comentarioComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await comentarioComponentsPage.countDeleteButtons();
    await comentarioComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    comentarioDeleteDialog = new ComentarioDeleteDialog();
    expect(await comentarioDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/tutoriasApp.comentario.delete.question/);
    await comentarioDeleteDialog.clickOnConfirmButton();

    await comentarioComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await comentarioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
