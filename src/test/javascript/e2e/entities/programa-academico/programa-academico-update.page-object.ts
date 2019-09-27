import { element, by, ElementFinder } from 'protractor';

export default class ProgramaAcademicoUpdatePage {
  pageTitle: ElementFinder = element(by.id('tutoriasApp.programaAcademico.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codigoInput: ElementFinder = element(by.css('input#programa-academico-codigo'));
  nombreInput: ElementFinder = element(by.css('input#programa-academico-nombre'));
  urlInput: ElementFinder = element(by.css('input#programa-academico-url'));
  correoInput: ElementFinder = element(by.css('input#programa-academico-correo'));
  departamentoSelect: ElementFinder = element(by.css('select#programa-academico-departamento'));
  materiaSelect: ElementFinder = element(by.css('select#programa-academico-materia'));
  estudianteSelect: ElementFinder = element(by.css('select#programa-academico-estudiante'));

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

  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  async setCorreoInput(correo) {
    await this.correoInput.sendKeys(correo);
  }

  async getCorreoInput() {
    return this.correoInput.getAttribute('value');
  }

  async departamentoSelectLastOption() {
    await this.departamentoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async departamentoSelectOption(option) {
    await this.departamentoSelect.sendKeys(option);
  }

  getDepartamentoSelect() {
    return this.departamentoSelect;
  }

  async getDepartamentoSelectedOption() {
    return this.departamentoSelect.element(by.css('option:checked')).getText();
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
