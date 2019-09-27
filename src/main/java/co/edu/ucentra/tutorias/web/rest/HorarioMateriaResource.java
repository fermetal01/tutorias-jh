package co.edu.ucentra.tutorias.web.rest;

import co.edu.ucentra.tutorias.domain.HorarioMateria;
import co.edu.ucentra.tutorias.repository.HorarioMateriaRepository;
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
 * REST controller for managing {@link co.edu.ucentra.tutorias.domain.HorarioMateria}.
 */
@RestController
@RequestMapping("/api")
public class HorarioMateriaResource {

    private final Logger log = LoggerFactory.getLogger(HorarioMateriaResource.class);

    private static final String ENTITY_NAME = "horarioMateria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HorarioMateriaRepository horarioMateriaRepository;

    public HorarioMateriaResource(HorarioMateriaRepository horarioMateriaRepository) {
        this.horarioMateriaRepository = horarioMateriaRepository;
    }

    /**
     * {@code POST  /horario-materias} : Create a new horarioMateria.
     *
     * @param horarioMateria the horarioMateria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new horarioMateria, or with status {@code 400 (Bad Request)} if the horarioMateria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/horario-materias")
    public ResponseEntity<HorarioMateria> createHorarioMateria(@RequestBody HorarioMateria horarioMateria) throws URISyntaxException {
        log.debug("REST request to save HorarioMateria : {}", horarioMateria);
        if (horarioMateria.getId() != null) {
            throw new BadRequestAlertException("A new horarioMateria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HorarioMateria result = horarioMateriaRepository.save(horarioMateria);
        return ResponseEntity.created(new URI("/api/horario-materias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /horario-materias} : Updates an existing horarioMateria.
     *
     * @param horarioMateria the horarioMateria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horarioMateria,
     * or with status {@code 400 (Bad Request)} if the horarioMateria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the horarioMateria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/horario-materias")
    public ResponseEntity<HorarioMateria> updateHorarioMateria(@RequestBody HorarioMateria horarioMateria) throws URISyntaxException {
        log.debug("REST request to update HorarioMateria : {}", horarioMateria);
        if (horarioMateria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HorarioMateria result = horarioMateriaRepository.save(horarioMateria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, horarioMateria.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /horario-materias} : get all the horarioMaterias.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of horarioMaterias in body.
     */
    @GetMapping("/horario-materias")
    public List<HorarioMateria> getAllHorarioMaterias() {
        log.debug("REST request to get all HorarioMaterias");
        return horarioMateriaRepository.findAll();
    }

    /**
     * {@code GET  /horario-materias/:id} : get the "id" horarioMateria.
     *
     * @param id the id of the horarioMateria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the horarioMateria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/horario-materias/{id}")
    public ResponseEntity<HorarioMateria> getHorarioMateria(@PathVariable Long id) {
        log.debug("REST request to get HorarioMateria : {}", id);
        Optional<HorarioMateria> horarioMateria = horarioMateriaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(horarioMateria);
    }

    /**
     * {@code DELETE  /horario-materias/:id} : delete the "id" horarioMateria.
     *
     * @param id the id of the horarioMateria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/horario-materias/{id}")
    public ResponseEntity<Void> deleteHorarioMateria(@PathVariable Long id) {
        log.debug("REST request to delete HorarioMateria : {}", id);
        horarioMateriaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
