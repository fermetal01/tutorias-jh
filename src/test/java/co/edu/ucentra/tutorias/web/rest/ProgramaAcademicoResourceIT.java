package co.edu.ucentra.tutorias.web.rest;

import co.edu.ucentra.tutorias.TutoriasApp;
import co.edu.ucentra.tutorias.domain.ProgramaAcademico;
import co.edu.ucentra.tutorias.repository.ProgramaAcademicoRepository;
import co.edu.ucentra.tutorias.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static co.edu.ucentra.tutorias.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProgramaAcademicoResource} REST controller.
 */
@SpringBootTest(classes = TutoriasApp.class)
public class ProgramaAcademicoResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    @Autowired
    private ProgramaAcademicoRepository programaAcademicoRepository;

    @Mock
    private ProgramaAcademicoRepository programaAcademicoRepositoryMock;

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

    private MockMvc restProgramaAcademicoMockMvc;

    private ProgramaAcademico programaAcademico;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProgramaAcademicoResource programaAcademicoResource = new ProgramaAcademicoResource(programaAcademicoRepository);
        this.restProgramaAcademicoMockMvc = MockMvcBuilders.standaloneSetup(programaAcademicoResource)
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
    public static ProgramaAcademico createEntity(EntityManager em) {
        ProgramaAcademico programaAcademico = new ProgramaAcademico()
            .codigo(DEFAULT_CODIGO)
            .nombre(DEFAULT_NOMBRE)
            .url(DEFAULT_URL)
            .correo(DEFAULT_CORREO);
        return programaAcademico;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProgramaAcademico createUpdatedEntity(EntityManager em) {
        ProgramaAcademico programaAcademico = new ProgramaAcademico()
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE)
            .url(UPDATED_URL)
            .correo(UPDATED_CORREO);
        return programaAcademico;
    }

    @BeforeEach
    public void initTest() {
        programaAcademico = createEntity(em);
    }

    @Test
    @Transactional
    public void createProgramaAcademico() throws Exception {
        int databaseSizeBeforeCreate = programaAcademicoRepository.findAll().size();

        // Create the ProgramaAcademico
        restProgramaAcademicoMockMvc.perform(post("/api/programa-academicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programaAcademico)))
            .andExpect(status().isCreated());

        // Validate the ProgramaAcademico in the database
        List<ProgramaAcademico> programaAcademicoList = programaAcademicoRepository.findAll();
        assertThat(programaAcademicoList).hasSize(databaseSizeBeforeCreate + 1);
        ProgramaAcademico testProgramaAcademico = programaAcademicoList.get(programaAcademicoList.size() - 1);
        assertThat(testProgramaAcademico.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testProgramaAcademico.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testProgramaAcademico.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testProgramaAcademico.getCorreo()).isEqualTo(DEFAULT_CORREO);
    }

    @Test
    @Transactional
    public void createProgramaAcademicoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = programaAcademicoRepository.findAll().size();

        // Create the ProgramaAcademico with an existing ID
        programaAcademico.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgramaAcademicoMockMvc.perform(post("/api/programa-academicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programaAcademico)))
            .andExpect(status().isBadRequest());

        // Validate the ProgramaAcademico in the database
        List<ProgramaAcademico> programaAcademicoList = programaAcademicoRepository.findAll();
        assertThat(programaAcademicoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProgramaAcademicos() throws Exception {
        // Initialize the database
        programaAcademicoRepository.saveAndFlush(programaAcademico);

        // Get all the programaAcademicoList
        restProgramaAcademicoMockMvc.perform(get("/api/programa-academicos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(programaAcademico.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllProgramaAcademicosWithEagerRelationshipsIsEnabled() throws Exception {
        ProgramaAcademicoResource programaAcademicoResource = new ProgramaAcademicoResource(programaAcademicoRepositoryMock);
        when(programaAcademicoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restProgramaAcademicoMockMvc = MockMvcBuilders.standaloneSetup(programaAcademicoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProgramaAcademicoMockMvc.perform(get("/api/programa-academicos?eagerload=true"))
        .andExpect(status().isOk());

        verify(programaAcademicoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllProgramaAcademicosWithEagerRelationshipsIsNotEnabled() throws Exception {
        ProgramaAcademicoResource programaAcademicoResource = new ProgramaAcademicoResource(programaAcademicoRepositoryMock);
            when(programaAcademicoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restProgramaAcademicoMockMvc = MockMvcBuilders.standaloneSetup(programaAcademicoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProgramaAcademicoMockMvc.perform(get("/api/programa-academicos?eagerload=true"))
        .andExpect(status().isOk());

            verify(programaAcademicoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getProgramaAcademico() throws Exception {
        // Initialize the database
        programaAcademicoRepository.saveAndFlush(programaAcademico);

        // Get the programaAcademico
        restProgramaAcademicoMockMvc.perform(get("/api/programa-academicos/{id}", programaAcademico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(programaAcademico.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProgramaAcademico() throws Exception {
        // Get the programaAcademico
        restProgramaAcademicoMockMvc.perform(get("/api/programa-academicos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProgramaAcademico() throws Exception {
        // Initialize the database
        programaAcademicoRepository.saveAndFlush(programaAcademico);

        int databaseSizeBeforeUpdate = programaAcademicoRepository.findAll().size();

        // Update the programaAcademico
        ProgramaAcademico updatedProgramaAcademico = programaAcademicoRepository.findById(programaAcademico.getId()).get();
        // Disconnect from session so that the updates on updatedProgramaAcademico are not directly saved in db
        em.detach(updatedProgramaAcademico);
        updatedProgramaAcademico
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE)
            .url(UPDATED_URL)
            .correo(UPDATED_CORREO);

        restProgramaAcademicoMockMvc.perform(put("/api/programa-academicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProgramaAcademico)))
            .andExpect(status().isOk());

        // Validate the ProgramaAcademico in the database
        List<ProgramaAcademico> programaAcademicoList = programaAcademicoRepository.findAll();
        assertThat(programaAcademicoList).hasSize(databaseSizeBeforeUpdate);
        ProgramaAcademico testProgramaAcademico = programaAcademicoList.get(programaAcademicoList.size() - 1);
        assertThat(testProgramaAcademico.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testProgramaAcademico.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testProgramaAcademico.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testProgramaAcademico.getCorreo()).isEqualTo(UPDATED_CORREO);
    }

    @Test
    @Transactional
    public void updateNonExistingProgramaAcademico() throws Exception {
        int databaseSizeBeforeUpdate = programaAcademicoRepository.findAll().size();

        // Create the ProgramaAcademico

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgramaAcademicoMockMvc.perform(put("/api/programa-academicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(programaAcademico)))
            .andExpect(status().isBadRequest());

        // Validate the ProgramaAcademico in the database
        List<ProgramaAcademico> programaAcademicoList = programaAcademicoRepository.findAll();
        assertThat(programaAcademicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProgramaAcademico() throws Exception {
        // Initialize the database
        programaAcademicoRepository.saveAndFlush(programaAcademico);

        int databaseSizeBeforeDelete = programaAcademicoRepository.findAll().size();

        // Delete the programaAcademico
        restProgramaAcademicoMockMvc.perform(delete("/api/programa-academicos/{id}", programaAcademico.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProgramaAcademico> programaAcademicoList = programaAcademicoRepository.findAll();
        assertThat(programaAcademicoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProgramaAcademico.class);
        ProgramaAcademico programaAcademico1 = new ProgramaAcademico();
        programaAcademico1.setId(1L);
        ProgramaAcademico programaAcademico2 = new ProgramaAcademico();
        programaAcademico2.setId(programaAcademico1.getId());
        assertThat(programaAcademico1).isEqualTo(programaAcademico2);
        programaAcademico2.setId(2L);
        assertThat(programaAcademico1).isNotEqualTo(programaAcademico2);
        programaAcademico1.setId(null);
        assertThat(programaAcademico1).isNotEqualTo(programaAcademico2);
    }
}
