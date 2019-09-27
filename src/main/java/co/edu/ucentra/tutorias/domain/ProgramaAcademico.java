package co.edu.ucentra.tutorias.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ProgramaAcademico.
 */
@Entity
@Table(name = "programa_academico")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProgramaAcademico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "url")
    private String url;

    @Column(name = "correo")
    private String correo;

    @ManyToOne
    @JsonIgnoreProperties("programaAcademicos")
    private Departamento departamento;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "programa_academico_materia",
               joinColumns = @JoinColumn(name = "programa_academico_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "materia_id", referencedColumnName = "id"))
    private Set<Materia> materias = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("programaAcademicos")
    private Estudiante estudiante;

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

    public ProgramaAcademico codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public ProgramaAcademico nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUrl() {
        return url;
    }

    public ProgramaAcademico url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCorreo() {
        return correo;
    }

    public ProgramaAcademico correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public ProgramaAcademico departamento(Departamento departamento) {
        this.departamento = departamento;
        return this;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public Set<Materia> getMaterias() {
        return materias;
    }

    public ProgramaAcademico materias(Set<Materia> materias) {
        this.materias = materias;
        return this;
    }

    public ProgramaAcademico addMateria(Materia materia) {
        this.materias.add(materia);
        //materia.getProgramaAcademicos().add(this);
        return this;
    }

    public ProgramaAcademico removeMateria(Materia materia) {
        this.materias.remove(materia);
        //materia.getProgramaAcademicos().remove(this);
        return this;
    }

    public void setMaterias(Set<Materia> materias) {
        this.materias = materias;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public ProgramaAcademico estudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
        return this;
    }

    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProgramaAcademico)) {
            return false;
        }
        return id != null && id.equals(((ProgramaAcademico) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProgramaAcademico{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", url='" + getUrl() + "'" +
            ", correo='" + getCorreo() + "'" +
            "}";
    }
}
