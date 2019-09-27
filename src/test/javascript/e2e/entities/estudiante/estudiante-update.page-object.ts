import { element, by, ElementFinder } from 'protractor';

export default class EstudianteUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutoriasApp.estudiante.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  carreraInput: ElementFinder = element(by.css('input#estudiante-carrera'));
  userSelect: ElementFinder = element(by.css('select#estudiante-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCarreraInput(carrera) {
    await this.carreraInput.sendKeys(carrera);
  }

  async getCarreraInput() {
    return this.carreraInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
