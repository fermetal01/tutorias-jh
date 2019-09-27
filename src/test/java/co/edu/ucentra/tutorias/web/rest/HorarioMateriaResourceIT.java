package co.edu.ucentra.tutorias.web.rest;

import co.edu.ucentra.tutorias.TutoriasApp;
import co.edu.ucentra.tutorias.domain.HorarioMateria;
import co.edu.ucentra.tutorias.repository.HorarioMateriaRepository;
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
 * Integration tests for the {@link HorarioMateriaResource} REST controller.
 */
@SpringBootTest(classes = TutoriasApp.class)
public class HorarioMateriaResourceIT {

    private static final String DEFAULT_PROFESOR = "AAAAAAAAAA";
    private static final String UPDATED_PROFESOR = "BBBBBBBBBB";

    private static final String DEFAULT_HORA_INICIO = "AAAAAAAAAA";
    private static final String UPDATED_HORA_INICIO = "BBBBBBBBBB";

    private static final String DEFAULT_HORA_FIN = "AAAAAAAAAA";
    private static final String UPDATED_HORA_FIN = "BBBBBBBBBB";

    private static final Dia DEFAULT_DIA = Dia.LUNES;
    private static final Dia UPDATED_DIA = Dia.MARTES;

    @Autowired
    private HorarioMateriaRepository horarioMateriaRepository;

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

    private MockMvc restHorarioMateriaMockMvc;

    private HorarioMateria horarioMateria;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HorarioMateriaResource horarioMateriaResource = new HorarioMateriaResource(horarioMateriaRepository);
        this.restHorarioMateriaMockMvc = MockMvcBuilders.standaloneSetup(horarioMateriaResource)
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
    public static HorarioMateria createEntity(EntityManager em) {
        HorarioMateria horarioMateria = new HorarioMateria()
            .profesor(DEFAULT_PROFESOR)
            .horaInicio(DEFAULT_HORA_INICIO)
            .horaFin(DEFAULT_HORA_FIN)
            .dia(DEFAULT_DIA);
        return horarioMateria;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HorarioMateria createUpdatedEntity(EntityManager em) {
        HorarioMateria horarioMateria = new HorarioMateria()
            .profesor(UPDATED_PROFESOR)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFin(UPDATED_HORA_FIN)
            .dia(UPDATED_DIA);
        return horarioMateria;
    }

    @BeforeEach
    public void initTest() {
        horarioMateria = createEntity(em);
    }

    @Test
    @Transactional
    public void createHorarioMateria() throws Exception {
        int databaseSizeBeforeCreate = horarioMateriaRepository.findAll().size();

        // Create the HorarioMateria
        restHorarioMateriaMockMvc.perform(post("/api/horario-materias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horarioMateria)))
            .andExpect(status().isCreated());

        // Validate the HorarioMateria in the database
        List<HorarioMateria> horarioMateriaList = horarioMateriaRepository.findAll();
        assertThat(horarioMateriaList).hasSize(databaseSizeBeforeCreate + 1);
        HorarioMateria testHorarioMateria = horarioMateriaList.get(horarioMateriaList.size() - 1);
        assertThat(testHorarioMateria.getProfesor()).isEqualTo(DEFAULT_PROFESOR);
        assertThat(testHorarioMateria.getHoraInicio()).isEqualTo(DEFAULT_HORA_INICIO);
        assertThat(testHorarioMateria.getHoraFin()).isEqualTo(DEFAULT_HORA_FIN);
        assertThat(testHorarioMateria.getDia()).isEqualTo(DEFAULT_DIA);
    }

    @Test
    @Transactional
    public void createHorarioMateriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = horarioMateriaRepository.findAll().size();

        // Create the HorarioMateria with an existing ID
        horarioMateria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHorarioMateriaMockMvc.perform(post("/api/horario-materias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horarioMateria)))
            .andExpect(status().isBadRequest());

        // Validate the HorarioMateria in the database
        List<HorarioMateria> horarioMateriaList = horarioMateriaRepository.findAll();
        assertThat(horarioMateriaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHorarioMaterias() throws Exception {
        // Initialize the database
        horarioMateriaRepository.saveAndFlush(horarioMateria);

        // Get all the horarioMateriaList
        restHorarioMateriaMockMvc.perform(get("/api/horario-materias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horarioMateria.getId().intValue())))
            .andExpect(jsonPath("$.[*].profesor").value(hasItem(DEFAULT_PROFESOR.toString())))
            .andExpect(jsonPath("$.[*].horaInicio").value(hasItem(DEFAULT_HORA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].horaFin").value(hasItem(DEFAULT_HORA_FIN.toString())))
            .andExpect(jsonPath("$.[*].dia").value(hasItem(DEFAULT_DIA.toString())));
    }
    
    @Test
    @Transactional
    public void getHorarioMateria() throws Exception {
        // Initialize the database
        horarioMateriaRepository.saveAndFlush(horarioMateria);

        // Get the horarioMateria
        restHorarioMateriaMockMvc.perform(get("/api/horario-materias/{id}", horarioMateria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(horarioMateria.getId().intValue()))
            .andExpect(jsonPath("$.profesor").value(DEFAULT_PROFESOR.toString()))
            .andExpect(jsonPath("$.horaInicio").value(DEFAULT_HORA_INICIO.toString()))
            .andExpect(jsonPath("$.horaFin").value(DEFAULT_HORA_FIN.toString()))
            .andExpect(jsonPath("$.dia").value(DEFAULT_DIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHorarioMateria() throws Exception {
        // Get the horarioMateria
        restHorarioMateriaMockMvc.perform(get("/api/horario-materias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHorarioMateria() throws Exception {
        // Initialize the database
        horarioMateriaRepository.saveAndFlush(horarioMateria);

        int databaseSizeBeforeUpdate = horarioMateriaRepository.findAll().size();

        // Update the horarioMateria
        HorarioMateria updatedHorarioMateria = horarioMateriaRepository.findById(horarioMateria.getId()).get();
        // Disconnect from session so that the updates on updatedHorarioMateria are not directly saved in db
        em.detach(updatedHorarioMateria);
        updatedHorarioMateria
            .profesor(UPDATED_PROFESOR)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFin(UPDATED_HORA_FIN)
            .dia(UPDATED_DIA);

        restHorarioMateriaMockMvc.perform(put("/api/horario-materias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHorarioMateria)))
            .andExpect(status().isOk());

        // Validate the HorarioMateria in the database
        List<HorarioMateria> horarioMateriaList = horarioMateriaRepository.findAll();
        assertThat(horarioMateriaList).hasSize(databaseSizeBeforeUpdate);
        HorarioMateria testHorarioMateria = horarioMateriaList.get(horarioMateriaList.size() - 1);
        assertThat(testHorarioMateria.getProfesor()).isEqualTo(UPDATED_PROFESOR);
        assertThat(testHorarioMateria.getHoraInicio()).isEqualTo(UPDATED_HORA_INICIO);
        assertThat(testHorarioMateria.getHoraFin()).isEqualTo(UPDATED_HORA_FIN);
        assertThat(testHorarioMateria.getDia()).isEqualTo(UPDATED_DIA);
    }

    @Test
    @Transactional
    public void updateNonExistingHorarioMateria() throws Exception {
        int databaseSizeBeforeUpdate = horarioMateriaRepository.findAll().size();

        // Create the HorarioMateria

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHorarioMateriaMockMvc.perform(put("/api/horario-materias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horarioMateria)))
            .andExpect(status().isBadRequest());

        // Validate the HorarioMateria in the database
        List<HorarioMateria> horarioMateriaList = horarioMateriaRepository.findAll();
        assertThat(horarioMateriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHorarioMateria() throws Exception {
        // Initialize the database
        horarioMateriaRepository.saveAndFlush(horarioMateria);

        int databaseSizeBeforeDelete = horarioMateriaRepository.findAll().size();

        // Delete the horarioMateria
        restHorarioMateriaMockMvc.perform(delete("/api/horario-materias/{id}", horarioMateria.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HorarioMateria> horarioMateriaList = horarioMateriaRepository.findAll();
        assertThat(horarioMateriaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HorarioMateria.class);
        HorarioMateria horarioMateria1 = new HorarioMateria();
        horarioMateria1.setId(1L);
        HorarioMateria horarioMateria2 = new HorarioMateria();
        horarioMateria2.setId(horarioMateria1.getId());
        assertThat(horarioMateria1).isEqualTo(horarioMateria2);
        horarioMateria2.setId(2L);
        assertThat(horarioMateria1).isNotEqualTo(horarioMateria2);
        horarioMateria1.setId(null);
        assertThat(horarioMateria1).isNotEqualTo(horarioMateria2);
    }
}
