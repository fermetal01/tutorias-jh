package co.edu.ucentra.tutorias.web.rest;

import co.edu.ucentra.tutorias.domain.Estudiante;
import co.edu.ucentra.tutorias.repository.EstudianteRepository;
import co.edu.ucentra.tutorias.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link co.edu.ucentra.tutorias.domain.Estudiante}.
 */
@RestController
@RequestMapping("/api")
public class EstudianteResource {

    private final Logger log = LoggerFactory.getLogger(EstudianteResource.class);

    private static final String ENTITY_NAME = "estudiante";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstudianteRepository estudianteRepository;

    public EstudianteResource(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    /**
     * {@code POST  /estudiantes} : Create a new estudiante.
     *
     * @param estudiante the estudiante to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estudiante, or with status {@code 400 (Bad Request)} if the estudiante has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estudiantes")
    public ResponseEntity<Estudiante> createEstudiante(@RequestBody Estudiante estudiante) throws URISyntaxException {
        log.debug("REST request to save Estudiante : {}", estudiante);
        if (estudiante.getId() != null) {
            throw new BadRequestAlertException("A new estudiante cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Estudiante result = estudianteRepository.save(estudiante);
        return ResponseEntity.created(new URI("/api/estudiantes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estudiantes} : Updates an existing estudiante.
     *
     * @param estudiante the estudiante to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estudiante,
     * or with status {@code 400 (Bad Request)} if the estudiante is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estudiante couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estudiantes")
    public ResponseEntity<Estudiante> updateEstudiante(@RequestBody Estudiante estudiante) throws URISyntaxException {
        log.debug("REST request to update Estudiante : {}", estudiante);
        if (estudiante.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Estudiante result = estudianteRepository.save(estudiante);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estudiante.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estudiantes} : get all the estudiantes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estudiantes in body.
     */
    @GetMapping("/estudiantes")
    public List<Estudiante> getAllEstudiantes() {
        log.debug("REST request to get all Estudiantes");
        return estudianteRepository.findAll();
    }

    /**
     * {@code GET  /estudiantes/:id} : get the "id" estudiante.
     *
     * @param id the id of the estudiante to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estudiante, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estudiantes/{id}")
    public ResponseEntity<Estudiante> getEstudiante(@PathVariable Long id) {
        log.debug("REST request to get Estudiante : {}", id);
        Optional<Estudiante> estudiante = estudianteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estudiante);
    }

    /**
     * {@code DELETE  /estudiantes/:id} : delete the "id" estudiante.
     *
     * @param id the id of the estudiante to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estudiantes/{id}")
    public ResponseEntity<Void> deleteEstudiante(@PathVariable Long id) {
        log.debug("REST request to delete Estudiante : {}", id);
        estudianteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
