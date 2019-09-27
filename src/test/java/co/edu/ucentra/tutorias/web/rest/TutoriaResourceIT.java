package co.edu.ucentra.tutorias.web.rest;

import co.edu.ucentra.tutorias.TutoriasApp;
import co.edu.ucentra.tutorias.domain.Tutoria;
import co.edu.ucentra.tutorias.repository.TutoriaRepository;
import co.edu.ucentra.tutorias.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static co.edu.ucentra.tutorias.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.ucentra.tutorias.domain.enumeration.Dia;
/**
 * Integration tests for the {@link TutoriaResource} REST controller.
 */
@SpringBootTest(classes = TutoriasApp.class)
public class TutoriaResourceIT {

    private static final String DEFAULT_HORA_INICIO = "AAAAAAAAAA";
    private static final String UPDATED_HORA_INICIO = "BBBBBBBBBB";

    private static final String DEFAULT_HORA_FIN = "AAAAAAAAAA";
    private static final String UPDATED_HORA_FIN = "BBBBBBBBBB";

    private static final Dia DEFAULT_DIA = Dia.LUNES;
    private static final Dia UPDATED_DIA = Dia.MARTES;

    private static final String DEFAULT_PROFESOR = "AAAAAAAAAA";
    private static final String UPDATED_PROFESOR = "BBBBBBBBBB";

    private static final String DEFAULT_ESTUDIANTE = "AAAAAAAAAA";
    private static final String UPDATED_ESTUDIANTE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_TOMADA = false;
    private static final Boolean UPDATED_TOMADA = true;

    @Autowired
    private TutoriaRepository tutoriaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTutoriaMockMvc;

    private Tutoria tutoria;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TutoriaResource tutoriaResource = new TutoriaResource(tutoriaRepository);
        this.restTutoriaMockMvc = MockMvcBuilders.standaloneSetup(tutoriaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tutoria createEntity(EntityManager em) {
        Tutoria tutoria = new Tutoria()
            .horaInicio(DEFAULT_HORA_INICIO)
            .horaFin(DEFAULT_HORA_FIN)
            .dia(DEFAULT_DIA)
            .profesor(DEFAULT_PROFESOR)
            .estudiante(DEFAULT_ESTUDIANTE)
            .tomada(DEFAULT_TOMADA);
        return tutoria;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tutoria createUpdatedEntity(EntityManager em) {
        Tutoria tutoria = new Tutoria()
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFin(UPDATED_HORA_FIN)
            .dia(UPDATED_DIA)
            .profesor(UPDATED_PROFESOR)
            .estudiante(UPDATED_ESTUDIANTE)
            .tomada(UPDATED_TOMADA);
        return tutoria;
    }

    @BeforeEach
    public void initTest() {
        tutoria = createEntity(em);
    }

    @Test
    @Transactional
    public void createTutoria() throws Exception {
        int databaseSizeBeforeCreate = tutoriaRepository.findAll().size();

        // Create the Tutoria
        restTutoriaMockMvc.perform(post("/api/tutorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tutoria)))
            .andExpect(status().isCreated());

        // Validate the Tutoria in the database
        List<Tutoria> tutoriaList = tutoriaRepository.findAll();
        assertThat(tutoriaList).hasSize(databaseSizeBeforeCreate + 1);
        Tutoria testTutoria = tutoriaList.get(tutoriaList.size() - 1);
        assertThat(testTutoria.getHoraInicio()).isEqualTo(DEFAULT_HORA_INICIO);
        assertThat(testTutoria.getHoraFin()).isEqualTo(DEFAULT_HORA_FIN);
        assertThat(testTutoria.getDia()).isEqualTo(DEFAULT_DIA);
        assertThat(testTutoria.getProfesor()).isEqualTo(DEFAULT_PROFESOR);
        assertThat(testTutoria.getEstudiante()).isEqualTo(DEFAULT_ESTUDIANTE);
        assertThat(testTutoria.isTomada()).isEqualTo(DEFAULT_TOMADA);
    }

    @Test
    @Transactional
    public void createTutoriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tutoriaRepository.findAll().size();

        // Create the Tutoria with an existing ID
        tutoria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTutoriaMockMvc.perform(post("/api/tutorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tutoria)))
            .andExpect(status().isBadRequest());

        // Validate the Tutoria in the database
        List<Tutoria> tutoriaList = tutoriaRepository.findAll();
        assertThat(tutoriaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTutorias() throws Exception {
        // Initialize the database
        tutoriaRepository.saveAndFlush(tutoria);

        // Get all the tutoriaList
        restTutoriaMockMvc.perform(get("/api/tutorias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tutoria.getId().intValue())))
            .andExpect(jsonPath("$.[*].horaInicio").value(hasItem(DEFAULT_HORA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].horaFin").value(hasItem(DEFAULT_HORA_FIN.toString())))
            .andExpect(jsonPath("$.[*].dia").value(hasItem(DEFAULT_DIA.toString())))
            .andExpect(jsonPath("$.[*].profesor").value(hasItem(DEFAULT_PROFESOR.toString())))
            .andExpect(jsonPath("$.[*].estudiante").value(hasItem(DEFAULT_ESTUDIANTE.toString())))
            .andExpect(jsonPath("$.[*].tomada").value(hasItem(DEFAULT_TOMADA.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getTutoria() throws Exception {
        // Initialize the database
        tutoriaRepository.saveAndFlush(tutoria);

        // Get the tutoria
        restTutoriaMockMvc.perform(get("/api/tutorias/{id}", tutoria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tutoria.getId().intValue()))
            .andExpect(jsonPath("$.horaInicio").value(DEFAULT_HORA_INICIO.toString()))
            .andExpect(jsonPath("$.horaFin").value(DEFAULT_HORA_FIN.toString()))
            .andExpect(jsonPath("$.dia").value(DEFAULT_DIA.toString()))
            .andExpect(jsonPath("$.profesor").value(DEFAULT_PROFESOR.toString()))
            .andExpect(jsonPath("$.estudiante").value(DEFAULT_ESTUDIANTE.toString()))
            .andExpect(jsonPath("$.tomada").value(DEFAULT_TOMADA.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTutoria() throws Exception {
        // Get the tutoria
        restTutoriaMockMvc.perform(get("/api/tutorias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTutoria() throws Exception {
        // Initialize the database
        tutoriaRepository.saveAndFlush(tutoria);

        int databaseSizeBeforeUpdate = tutoriaRepository.findAll().size();

        // Update the tutoria
        Tutoria updatedTutoria = tutoriaRepository.findById(tutoria.getId()).get();
        // Disconnect from session so that the updates on updatedTutoria are not directly saved in db
        em.detach(updatedTutoria);
        updatedTutoria
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFin(UPDATED_HORA_FIN)
            .dia(UPDATED_DIA)
            .profesor(UPDATED_PROFESOR)
            .estudiante(UPDATED_ESTUDIANTE)
            .tomada(UPDATED_TOMADA);

        restTutoriaMockMvc.perform(put("/api/tutorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTutoria)))
            .andExpect(status().isOk());

        // Validate the Tutoria in the database
        List<Tutoria> tutoriaList = tutoriaRepository.findAll();
        assertThat(tutoriaList).hasSize(databaseSizeBeforeUpdate);
        Tutoria testTutoria = tutoriaList.get(tutoriaList.size() - 1);
        assertThat(testTutoria.getHoraInicio()).isEqualTo(UPDATED_HORA_INICIO);
        assertThat(testTutoria.getHoraFin()).isEqualTo(UPDATED_HORA_FIN);
        assertThat(testTutoria.getDia()).isEqualTo(UPDATED_DIA);
        assertThat(testTutoria.getProfesor()).isEqualTo(UPDATED_PROFESOR);
        assertThat(testTutoria.getEstudiante()).isEqualTo(UPDATED_ESTUDIANTE);
        assertThat(testTutoria.isTomada()).isEqualTo(UPDATED_TOMADA);
    }

    @Test
    @Transactional
    public void updateNonExistingTutoria() throws Exception {
        int databaseSizeBeforeUpdate = tutoriaRepository.findAll().size();

        // Create the Tutoria

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTutoriaMockMvc.perform(put("/api/tutorias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tutoria)))
            .andExpect(status().isBadRequest());

        // Validate the Tutoria in the database
        List<Tutoria> tutoriaList = tutoriaRepository.findAll();
        assertThat(tutoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTutoria() throws Exception {
        // Initialize the database
        tutoriaRepository.saveAndFlush(tutoria);

        int databaseSizeBeforeDelete = tutoriaRepository.findAll().size();

        // Delete the tutoria
        restTutoriaMockMvc.perform(delete("/api/tutorias/{id}", tutoria.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tutoria> tutoriaList = tutoriaRepository.findAll();
        assertThat(tutoriaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tutoria.class);
        Tutoria tutoria1 = new Tutoria();
        tutoria1.setId(1L);
        Tutoria tutoria2 = new Tutoria();
        tutoria2.setId(tutoria1.getId());
        assertThat(tutoria1).isEqualTo(tutoria2);
        tutoria2.setId(2L);
        assertThat(tutoria1).isNotEqualTo(tutoria2);
        tutoria1.setId(null);
        assertThat(tutoria1).isNotEqualTo(tutoria2);
    }
}
