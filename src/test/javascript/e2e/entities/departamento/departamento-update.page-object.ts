import { element, by, ElementFinder } from 'protractor';

export default class DepartamentoUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutoriasApp.departamento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#departamento-nombre'));
  decanoInput: ElementFinder = element(by.css('input#departamento-decano'));
  profesorSelect: ElementFinder = element(by.css('select#departamento-profesor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setDecanoInput(decano) {
    await this.decanoInput.sendKeys(decano);
  }

  async getDecanoInput() {
    return this.decanoInput.getAttribute('value');
  }

  async profesorSelectLastOption() {
    await this.profesorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async profesorSelectOption(option) {
    await this.profesorSelect.sendKeys(option);
  }

  getProfesorSelect() {
    return this.profesorSelect;
  }

  async getProfesorSelectedOption() {
    return this.profesorSelect.element(by.css('option:checked')).getText();
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
