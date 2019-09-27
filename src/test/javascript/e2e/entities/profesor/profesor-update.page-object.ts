import { element, by, ElementFinder } from 'protractor';

export default class ProfesorUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutoriasApp.profesor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  areaInput: ElementFinder = element(by.css('input#profesor-area'));
  userSelect: ElementFinder = element(by.css('select#profesor-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAreaInput(area) {
    await this.areaInput.sendKeys(area);
  }

  async getAreaInput() {
    return this.areaInput.getAttribute('value');
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
