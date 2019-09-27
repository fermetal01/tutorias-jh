package co.edu.ucentra.tutorias.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Comentario.
 */
@Entity
@Table(name = "comentario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Comentario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "comentario_inicial")
    private String comentarioInicial;

    @Column(name = "padre")
    private String padre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "usuario")
    private String usuario;

    @ManyToOne
    @JsonIgnoreProperties("comentarios")
    private Tutoria tutoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComentarioInicial() {
        return comentarioInicial;
    }

    public Comentario comentarioInicial(String comentarioInicial) {
        this.comentarioInicial = comentarioInicial;
        return this;
    }

    public void setComentarioInicial(String comentarioInicial) {
        this.comentarioInicial = comentarioInicial;
    }

    public String getPadre() {
        return padre;
    }

    public Comentario padre(String padre) {
        this.padre = padre;
        return this;
    }

    public void setPadre(String padre) {
        this.padre = padre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Comentario descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUsuario() {
        return usuario;
    }

    public Comentario usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Tutoria getTutoria() {
        return tutoria;
    }

    public Comentario tutoria(Tutoria tutoria) {
        this.tutoria = tutoria;
        return this;
    }

    public void setTutoria(Tutoria tutoria) {
        this.tutoria = tutoria;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Comentario)) {
            return false;
        }
        return id != null && id.equals(((Comentario) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Comentario{" +
            "id=" + getId() +
            ", comentarioInicial='" + getComentarioInicial() + "'" +
            ", padre='" + getPadre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", usuario='" + getUsuario() + "'" +
            "}";
    }
}
