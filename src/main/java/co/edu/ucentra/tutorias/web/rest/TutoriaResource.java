package co.edu.ucentra.tutorias.web.rest;

import co.edu.ucentra.tutorias.domain.Tutoria;
import co.edu.ucentra.tutorias.repository.TutoriaRepository;
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
 * REST controller for managing {@link co.edu.ucentra.tutorias.domain.Tutoria}.
 */
@RestController
@RequestMapping("/api")
public class TutoriaResource {

    private final Logger log = LoggerFactory.getLogger(TutoriaResource.class);

    private static final String ENTITY_NAME = "tutoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TutoriaRepository tutoriaRepository;

    public TutoriaResource(TutoriaRepository tutoriaRepository) {
        this.tutoriaRepository = tutoriaRepository;
    }

    /**
     * {@code POST  /tutorias} : Create a new tutoria.
     *
     * @param tutoria the tutoria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tutoria, or with status {@code 400 (Bad Request)} if the tutoria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tutorias")
    public ResponseEntity<Tutoria> createTutoria(@RequestBody Tutoria tutoria) throws URISyntaxException {
        log.debug("REST request to save Tutoria : {}", tutoria);
        if (tutoria.getId() != null) {
            throw new BadRequestAlertException("A new tutoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tutoria result = tutoriaRepository.save(tutoria);
        return ResponseEntity.created(new URI("/api/tutorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tutorias} : Updates an existing tutoria.
     *
     * @param tutoria the tutoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tutoria,
     * or with status {@code 400 (Bad Request)} if the tutoria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tutoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tutorias")
    public ResponseEntity<Tutoria> updateTutoria(@RequestBody Tutoria tutoria) throws URISyntaxException {
        log.debug("REST request to update Tutoria : {}", tutoria);
        if (tutoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tutoria result = tutoriaRepository.save(tutoria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tutoria.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tutorias} : get all the tutorias.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tutorias in body.
     */
    @GetMapping("/tutorias")
    public List<Tutoria> getAllTutorias() {
        log.debug("REST request to get all Tutorias");
        return tutoriaRepository.findAll();
    }

    /**
     * {@code GET  /tutorias/:id} : get the "id" tutoria.
     *
     * @param id the id of the tutoria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tutoria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tutorias/{id}")
    public ResponseEntity<Tutoria> getTutoria(@PathVariable Long id) {
        log.debug("REST request to get Tutoria : {}", id);
        Optional<Tutoria> tutoria = tutoriaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tutoria);
    }

    /**
     * {@code DELETE  /tutorias/:id} : delete the "id" tutoria.
     *
     * @param id the id of the tutoria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tutorias/{id}")
    public ResponseEntity<Void> deleteTutoria(@PathVariable Long id) {
        log.debug("REST request to delete Tutoria : {}", id);
        tutoriaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
