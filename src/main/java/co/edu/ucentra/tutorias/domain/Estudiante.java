package co.edu.ucentra.tutorias.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Estudiante.
 */
@Entity
@Table(name = "estudiante")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Estudiante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "carrera")
    private String carrera;

    @OneToMany(mappedBy = "estudiante")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProgramaAcademico> departamentos = new HashSet<>();

    @OneToMany(mappedBy = "estudiante")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tutoria> tutorias = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("estudiantes")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCarrera() {
        return carrera;
    }

    public Estudiante carrera(String carrera) {
        this.carrera = carrera;
        return this;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public Set<ProgramaAcademico> getDepartamentos() {
        return departamentos;
    }

    public Estudiante departamentos(Set<ProgramaAcademico> programaAcademicos) {
        this.departamentos = programaAcademicos;
        return this;
    }

    public Estudiante addDepartamento(ProgramaAcademico programaAcademico) {
        this.departamentos.add(programaAcademico);
        programaAcademico.setEstudiante(this);
        return this;
    }

    public Estudiante removeDepartamento(ProgramaAcademico programaAcademico) {
        this.departamentos.remove(programaAcademico);
        programaAcademico.setEstudiante(null);
        return this;
    }

    public void setDepartamentos(Set<ProgramaAcademico> programaAcademicos) {
        this.departamentos = programaAcademicos;
    }

    public Set<Tutoria> getTutorias() {
        return tutorias;
    }

    public Estudiante tutorias(Set<Tutoria> tutorias) {
        this.tutorias = tutorias;
        return this;
    }

    public Estudiante addTutoria(Tutoria tutoria) {
        this.tutorias.add(tutoria);
        tutoria.setEstudianteTutoria(this);
        return this;
    }

    public Estudiante removeTutoria(Tutoria tutoria) {
        this.tutorias.remove(tutoria);
        tutoria.setEstudianteTutoria(null);
        return this;
    }

    public void setTutorias(Set<Tutoria> tutorias) {
        this.tutorias = tutorias;
    }

    public User getUser() {
        return user;
    }

    public Estudiante user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Estudiante)) {
            return false;
        }
        return id != null && id.equals(((Estudiante) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Estudiante{" +
            "id=" + getId() +
            ", carrera='" + getCarrera() + "'" +
            "}";
    }
}
