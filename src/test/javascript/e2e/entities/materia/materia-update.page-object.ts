import { element, by, ElementFinder } from 'protractor';

export default class MateriaUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutoriasApp.materia.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codigoInput: ElementFinder = element(by.css('input#materia-codigo'));
  nombreInput: ElementFinder = element(by.css('input#materia-nombre'));
  creditosInput: ElementFinder = element(by.css('input#materia-creditos'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodigoInput(codigo) {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput() {
    return this.codigoInput.getAttribute('value');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setCreditosInput(creditos) {
    await this.creditosInput.sendKeys(creditos);
  }

  async getCreditosInput() {
    return this.creditosInput.getAttribute('value');
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
