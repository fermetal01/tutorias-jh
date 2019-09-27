package co.edu.ucentra.tutorias.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Departamento.
 */
@Entity
@Table(name = "departamento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Departamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "decano")
    private String decano;

    @OneToMany(mappedBy = "departamento")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProgramaAcademico> programas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("departamentos")
    private Profesor profesor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Departamento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDecano() {
        return decano;
    }

    public Departamento decano(String decano) {
        this.decano = decano;
        return this;
    }

    public void setDecano(String decano) {
        this.decano = decano;
    }

    public Set<ProgramaAcademico> getProgramas() {
        return programas;
    }

    public Departamento programas(Set<ProgramaAcademico> programaAcademicos) {
        this.programas = programaAcademicos;
        return this;
    }

    public Departamento addPrograma(ProgramaAcademico programaAcademico) {
        this.programas.add(programaAcademico);
        programaAcademico.setDepartamento(this);
        return this;
    }

    public Departamento removePrograma(ProgramaAcademico programaAcademico) {
        this.programas.remove(programaAcademico);
        programaAcademico.setDepartamento(null);
        return this;
    }

    public void setProgramas(Set<ProgramaAcademico> programaAcademicos) {
        this.programas = programaAcademicos;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public Departamento profesor(Profesor profesor) {
        this.profesor = profesor;
        return this;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Departamento)) {
            return false;
        }
        return id != null && id.equals(((Departamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Departamento{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", decano='" + getDecano() + "'" +
            "}";
    }
}
