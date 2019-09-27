import { element, by, ElementFinder } from 'protractor';

export default class HorarioMateriaUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutoriasApp.horarioMateria.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  profesorInput: ElementFinder = element(by.css('input#horario-materia-profesor'));
  horaInicioInput: ElementFinder = element(by.css('input#horario-materia-horaInicio'));
  horaFinInput: ElementFinder = element(by.css('input#horario-materia-horaFin'));
  diaSelect: ElementFinder = element(by.css('select#horario-materia-dia'));
  materiaSelect: ElementFinder = element(by.css('select#horario-materia-materia'));
  profesorSelect: ElementFinder = element(by.css('select#horario-materia-profesor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setProfesorInput(profesor) {
    await this.profesorInput.sendKeys(profesor);
  }

  async getProfesorInput() {
    return this.profesorInput.getAttribute('value');
  }

  async setHoraInicioInput(horaInicio) {
    await this.horaInicioInput.sendKeys(horaInicio);
  }

  async getHoraInicioInput() {
    return this.horaInicioInput.getAttribute('value');
  }

  async setHoraFinInput(horaFin) {
    await this.horaFinInput.sendKeys(horaFin);
  }

  async getHoraFinInput() {
    return this.horaFinInput.getAttribute('value');
  }

  async setDiaSelect(dia) {
    await this.diaSelect.sendKeys(dia);
  }

  async getDiaSelect() {
    return this.diaSelect.element(by.css('option:checked')).getText();
  }

  async diaSelectLastOption() {
    await this.diaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async materiaSelectLastOption() {
    await this.materiaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async materiaSelectOption(option) {
    await this.materiaSelect.sendKeys(option);
  }

  getMateriaSelect() {
    return this.materiaSelect;
  }

  async getMateriaSelectedOption() {
    return this.materiaSelect.element(by.css('option:checked')).getText();
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
