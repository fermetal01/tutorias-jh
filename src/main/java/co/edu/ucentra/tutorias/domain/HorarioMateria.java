package co.edu.ucentra.tutorias.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import co.edu.ucentra.tutorias.domain.enumeration.Dia;

/**
 * A HorarioMateria.
 */
@Entity
@Table(name = "horario_materia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HorarioMateria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "profesor")
    private String profesor;

    @Column(name = "hora_inicio")
    private String horaInicio;

    @Column(name = "hora_fin")
    private String horaFin;

    @Enumerated(EnumType.STRING)
    @Column(name = "dia")
    private Dia dia;

    @ManyToOne
    @JsonIgnoreProperties("horarioMaterias")
    private Materia materia;

    @ManyToOne
    @JsonIgnoreProperties("horarioMaterias")
    private Profesor profesorHorario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProfesor() {
        return profesor;
    }

    public HorarioMateria profesor(String profesor) {
        this.profesor = profesor;
        return this;
    }

    public void setProfesor(String profesor) {
        this.profesor = profesor;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public HorarioMateria horaInicio(String horaInicio) {
        this.horaInicio = horaInicio;
        return this;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFin() {
        return horaFin;
    }

    public HorarioMateria horaFin(String horaFin) {
        this.horaFin = horaFin;
        return this;
    }

    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }

    public Dia getDia() {
        return dia;
    }

    public HorarioMateria dia(Dia dia) {
        this.dia = dia;
        return this;
    }

    public void setDia(Dia dia) {
        this.dia = dia;
    }

    public Materia getMateria() {
        return materia;
    }

    public HorarioMateria materia(Materia materia) {
        this.materia = materia;
        return this;
    }

    public void setMateria(Materia materia) {
        this.materia = materia;
    }

    public Profesor getProfesorHorario() {
        return profesorHorario;
    }

    public HorarioMateria profesor(Profesor profesor) {
        this.profesorHorario = profesor;
        return this;
    }

    public void setProfesorHorario(Profesor profesor) {
        this.profesorHorario = profesor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HorarioMateria)) {
            return false;
        }
        return id != null && id.equals(((HorarioMateria) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "HorarioMateria{" +
            "id=" + getId() +
            ", profesor='" + getProfesor() + "'" +
            ", horaInicio='" + getHoraInicio() + "'" +
            ", horaFin='" + getHoraFin() + "'" +
            ", dia='" + getDia() + "'" +
            "}";
    }
}
