package co.edu.ucentra.tutorias.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import co.edu.ucentra.tutorias.domain.enumeration.Dia;

/**
 * A Tutoria.
 */
@Entity
@Table(name = "tutoria")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tutoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "hora_inicio")
    private String horaInicio;

    @Column(name = "hora_fin")
    private String horaFin;

    @Enumerated(EnumType.STRING)
    @Column(name = "dia")
    private Dia dia;

    @Column(name = "profesor")
    private String profesor;

    @Column(name = "estudiante")
    private String estudiante;

    @Column(name = "tomada")
    private Boolean tomada;

    @ManyToOne
    @JsonIgnoreProperties("tutorias")
    private Materia materia;

    @OneToMany(mappedBy = "tutoria")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comentario> comentarios = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("tutorias")
    private Estudiante estudianteTutoria;

    @ManyToOne
    @JsonIgnoreProperties("tutorias")
    private Profesor profesorTutoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public Tutoria horaInicio(String horaInicio) {
        this.horaInicio = horaInicio;
        return this;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFin() {
        return horaFin;
    }

    public Tutoria horaFin(String horaFin) {
        this.horaFin = horaFin;
        return this;
    }

    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }

    public Dia getDia() {
        return dia;
    }

    public Tutoria dia(Dia dia) {
        this.dia = dia;
        return this;
    }

    public void setDia(Dia dia) {
        this.dia = dia;
    }

    public String getProfesor() {
        return profesor;
    }

    public Tutoria profesor(String profesor) {
        this.profesor = profesor;
        return this;
    }

    public void setProfesor(String profesor) {
        this.profesor = profesor;
    }

    public String getEstudiante() {
        return estudiante;
    }

    public Tutoria estudiante(String estudiante) {
        this.estudiante = estudiante;
        return this;
    }

    public void setEstudiante(String estudiante) {
        this.estudiante = estudiante;
    }

    public Boolean isTomada() {
        return tomada;
    }

    public Tutoria tomada(Boolean tomada) {
        this.tomada = tomada;
        return this;
    }

    public void setTomada(Boolean tomada) {
        this.tomada = tomada;
    }

    public Materia getMateria() {
        return materia;
    }

    public Tutoria materia(Materia materia) {
        this.materia = materia;
        return this;
    }

    public void setMateria(Materia materia) {
        this.materia = materia;
    }

    public Set<Comentario> getComentarios() {
        return comentarios;
    }

    public Tutoria comentarios(Set<Comentario> comentarios) {
        this.comentarios = comentarios;
        return this;
    }

    public Tutoria addComentario(Comentario comentario) {
        this.comentarios.add(comentario);
        comentario.setTutoria(this);
        return this;
    }

    public Tutoria removeComentario(Comentario comentario) {
        this.comentarios.remove(comentario);
        comentario.setTutoria(null);
        return this;
    }

    public void setComentarios(Set<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    public Estudiante getEstudianteTutoria() {
        return estudianteTutoria;
    }

    public Tutoria estudiante(Estudiante estudiante) {
        this.estudianteTutoria = estudiante;
        return this;
    }

    public void setEstudianteTutoria(Estudiante estudiante) {
        this.estudianteTutoria = estudiante;
    }

    public Profesor getProfesorTutoria() {
        return profesorTutoria;
    }

    public Tutoria profesor(Profesor profesor) {
        this.profesorTutoria = profesor;
        return this;
    }

    public void setProfesorTutoria(Profesor profesor) {
        this.profesorTutoria = profesor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tutoria)) {
            return false;
        }
        return id != null && id.equals(((Tutoria) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tutoria{" +
            "id=" + getId() +
            ", horaInicio='" + getHoraInicio() + "'" +
            ", horaFin='" + getHoraFin() + "'" +
            ", dia='" + getDia() + "'" +
            ", profesor='" + getProfesor() + "'" +
            ", estudiante='" + getEstudiante() + "'" +
            ", tomada='" + isTomada() + "'" +
            "}";
    }
}
