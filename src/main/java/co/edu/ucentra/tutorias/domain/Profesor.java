package co.edu.ucentra.tutorias.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Profesor.
 */
@Entity
@Table(name = "profesor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Profesor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "area")
    private String area;

    @OneToMany(mappedBy = "profesor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HorarioMateria> horarios = new HashSet<>();

    @OneToMany(mappedBy = "profesor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tutoria> tutorias = new HashSet<>();

    @OneToMany(mappedBy = "profesor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Departamento> departamentos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("profesors")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public Profesor area(String area) {
        this.area = area;
        return this;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Set<HorarioMateria> getHorarios() {
        return horarios;
    }

    public Profesor horarios(Set<HorarioMateria> horarioMaterias) {
        this.horarios = horarioMaterias;
        return this;
    }

    public Profesor addHorario(HorarioMateria horarioMateria) {
        this.horarios.add(horarioMateria);
        horarioMateria.setProfesorHorario(this);
        return this;
    }

    public Profesor removeHorario(HorarioMateria horarioMateria) {
        this.horarios.remove(horarioMateria);
        horarioMateria.setProfesor(null);
        return this;
    }

    public void setHorarios(Set<HorarioMateria> horarioMaterias) {
        this.horarios = horarioMaterias;
    }

    public Set<Tutoria> getTutorias() {
        return tutorias;
    }

    public Profesor tutorias(Set<Tutoria> tutorias) {
        this.tutorias = tutorias;
        return this;
    }

    public Profesor addTutoria(Tutoria tutoria) {
        this.tutorias.add(tutoria);
        tutoria.setProfesorTutoria(this);
        return this;
    }

    public Profesor removeTutoria(Tutoria tutoria) {
        this.tutorias.remove(tutoria);
        tutoria.setProfesorTutoria(null);
        return this;
    }

    public void setTutorias(Set<Tutoria> tutorias) {
        this.tutorias = tutorias;
    }

    public Set<Departamento> getDepartamentos() {
        return departamentos;
    }

    public Profesor departamentos(Set<Departamento> departamentos) {
        this.departamentos = departamentos;
        return this;
    }

    public Profesor addDepartamento(Departamento departamento) {
        this.departamentos.add(departamento);
        departamento.setProfesor(this);
        return this;
    }

    public Profesor removeDepartamento(Departamento departamento) {
        this.departamentos.remove(departamento);
        departamento.setProfesor(null);
        return this;
    }

    public void setDepartamentos(Set<Departamento> departamentos) {
        this.departamentos = departamentos;
    }

    public User getUser() {
        return user;
    }

    public Profesor user(User user) {
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
        if (!(o instanceof Profesor)) {
            return false;
        }
        return id != null && id.equals(((Profesor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Profesor{" +
            "id=" + getId() +
            ", area='" + getArea() + "'" +
            "}";
    }
}
