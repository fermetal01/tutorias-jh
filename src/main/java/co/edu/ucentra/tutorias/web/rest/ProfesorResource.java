package co.edu.ucentra.tutorias.web.rest;

import co.edu.ucentra.tutorias.domain.Profesor;
import co.edu.ucentra.tutorias.repository.ProfesorRepository;
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
 * REST controller for managing {@link co.edu.ucentra.tutorias.domain.Profesor}.
 */
@RestController
@RequestMapping("/api")
public class ProfesorResource {

    private final Logger log = LoggerFactory.getLogger(ProfesorResource.class);

    private static final String ENTITY_NAME = "profesor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfesorRepository profesorRepository;

    public ProfesorResource(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    /**
     * {@code POST  /profesors} : Create a new profesor.
     *
     * @param profesor the profesor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profesor, or with status {@code 400 (Bad Request)} if the profesor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profesors")
    public ResponseEntity<Profesor> createProfesor(@RequestBody Profesor profesor) throws URISyntaxException {
        log.debug("REST request to save Profesor : {}", profesor);
        if (profesor.getId() != null) {
            throw new BadRequestAlertException("A new profesor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Profesor result = profesorRepository.save(profesor);
        return ResponseEntity.created(new URI("/api/profesors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profesors} : Updates an existing profesor.
     *
     * @param profesor the profesor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profesor,
     * or with status {@code 400 (Bad Request)} if the profesor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profesor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profesors")
    public ResponseEntity<Profesor> updateProfesor(@RequestBody Profesor profesor) throws URISyntaxException {
        log.debug("REST request to update Profesor : {}", profesor);
        if (profesor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Profesor result = profesorRepository.save(profesor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profesor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profesors} : get all the profesors.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profesors in body.
     */
    @GetMapping("/profesors")
    public List<Profesor> getAllProfesors() {
        log.debug("REST request to get all Profesors");
        return profesorRepository.findAll();
    }

    /**
     * {@code GET  /profesors/:id} : get the "id" profesor.
     *
     * @param id the id of the profesor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profesor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profesors/{id}")
    public ResponseEntity<Profesor> getProfesor(@PathVariable Long id) {
        log.debug("REST request to get Profesor : {}", id);
        Optional<Profesor> profesor = profesorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profesor);
    }

    /**
     * {@code DELETE  /profesors/:id} : delete the "id" profesor.
     *
     * @param id the id of the profesor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profesors/{id}")
    public ResponseEntity<Void> deleteProfesor(@PathVariable Long id) {
        log.debug("REST request to delete Profesor : {}", id);
        profesorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
