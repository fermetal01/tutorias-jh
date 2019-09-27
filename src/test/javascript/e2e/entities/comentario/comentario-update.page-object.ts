import { element, by, ElementFinder } from 'protractor';

export default class ComentarioUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutoriasApp.comentario.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  comentarioInicialInput: ElementFinder = element(by.css('input#comentario-comentarioInicial'));
  padreInput: ElementFinder = element(by.css('input#comentario-padre'));
  descripcionInput: ElementFinder = element(by.css('input#comentario-descripcion'));
  usuarioInput: ElementFinder = element(by.css('input#comentario-usuario'));
  tutoriaSelect: ElementFinder = element(by.css('select#comentario-tutoria'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setComentarioInicialInput(comentarioInicial) {
    await this.comentarioInicialInput.sendKeys(comentarioInicial);
  }

  async getComentarioInicialInput() {
    return this.comentarioInicialInput.getAttribute('value');
  }

  async setPadreInput(padre) {
    await this.padreInput.sendKeys(padre);
  }

  async getPadreInput() {
    return this.padreInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return this.descripcionInput.getAttribute('value');
  }

  async setUsuarioInput(usuario) {
    await this.usuarioInput.sendKeys(usuario);
  }

  async getUsuarioInput() {
    return this.usuarioInput.getAttribute('value');
  }

  async tutoriaSelectLastOption() {
    await this.tutoriaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tutoriaSelectOption(option) {
    await this.tutoriaSelect.sendKeys(option);
  }

  getTutoriaSelect() {
    return this.tutoriaSelect;
  }

  async getTutoriaSelectedOption() {
    return this.tutoriaSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
