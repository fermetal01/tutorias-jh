package co.edu.ucentra.tutorias.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Materia.
 */
@Entity
@Table(name = "materia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Materia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "creditos")
    private Integer creditos;

    @OneToMany(mappedBy = "materia")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HorarioMateria> horarios = new HashSet<>();

    @OneToMany(mappedBy = "materia")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tutoria> tutorias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Materia codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public Materia nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCreditos() {
        return creditos;
    }

    public Materia creditos(Integer creditos) {
        this.creditos = creditos;
        return this;
    }

    public void setCreditos(Integer creditos) {
        this.creditos = creditos;
    }

    public Set<HorarioMateria> getHorarios() {
        return horarios;
    }

    public Materia horarios(Set<HorarioMateria> horarioMaterias) {
        this.horarios = horarioMaterias;
        return this;
    }

    public Materia addHorario(HorarioMateria horarioMateria) {
        this.horarios.add(horarioMateria);
        horarioMateria.setMateria(this);
        return this;
    }

    public Materia removeHorario(HorarioMateria horarioMateria) {
        this.horarios.remove(horarioMateria);
        horarioMateria.setMateria(null);
        return this;
    }

    public void setHorarios(Set<HorarioMateria> horarioMaterias) {
        this.horarios = horarioMaterias;
    }

    public Set<Tutoria> getTutorias() {
        return tutorias;
    }

    public Materia tutorias(Set<Tutoria> tutorias) {
        this.tutorias = tutorias;
        return this;
    }

    public Materia addTutoria(Tutoria tutoria) {
        this.tutorias.add(tutoria);
        tutoria.setMateria(this);
        return this;
    }

    public Materia removeTutoria(Tutoria tutoria) {
        this.tutorias.remove(tutoria);
        tutoria.setMateria(null);
        return this;
    }

    public void setTutorias(Set<Tutoria> tutorias) {
        this.tutorias = tutorias;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Materia)) {
            return false;
        }
        return id != null && id.equals(((Materia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Materia{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", creditos=" + getCreditos() +
            "}";
    }
}
