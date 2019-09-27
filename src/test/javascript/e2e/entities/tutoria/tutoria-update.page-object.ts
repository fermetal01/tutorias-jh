import { element, by, ElementFinder } from 'protractor';

export default class TutoriaUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutoriasApp.tutoria.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  horaInicioInput: ElementFinder = element(by.css('input#tutoria-horaInicio'));
  horaFinInput: ElementFinder = element(by.css('input#tutoria-horaFin'));
  diaSelect: ElementFinder = element(by.css('select#tutoria-dia'));
  profesorInput: ElementFinder = element(by.css('input#tutoria-profesor'));
  estudianteInput: ElementFinder = element(by.css('input#tutoria-estudiante'));
  tomadaInput: ElementFinder = element(by.css('input#tutoria-tomada'));
  materiaSelect: ElementFinder = element(by.css('select#tutoria-materia'));
  estudianteSelect: ElementFinder = element(by.css('select#tutoria-estudiante'));
  profesorSelect: ElementFinder = element(by.css('select#tutoria-profesor'));

  getPageTitle() {
    return this.pageTitle;
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
  async setProfesorInput(profesor) {
    await this.profesorInput.sendKeys(profesor);
  }

  async getProfesorInput() {
    return this.profesorInput.getAttribute('value');
  }

  async setEstudianteInput(estudiante) {
    await this.estudianteInput.sendKeys(estudiante);
  }

  async getEstudianteInput() {
    return this.estudianteInput.getAttribute('value');
  }

  getTomadaInput() {
    return this.tomadaInput;
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

  async estudianteSelectLastOption() {
    await this.estudianteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async estudianteSelectOption(option) {
    await this.estudianteSelect.sendKeys(option);
  }

  getEstudianteSelect() {
    return this.estudianteSelect;
  }

  async getEstudianteSelectedOption() {
    return this.estudianteSelect.element(by.css('option:checked')).getText();
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
