package co.edu.ucentra.tutorias.repository;
import co.edu.ucentra.tutorias.domain.ProgramaAcademico;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ProgramaAcademico entity.
 */
@Repository
public interface ProgramaAcademicoRepository extends JpaRepository<ProgramaAcademico, Long> {

    @Query(value = "select distinct programaAcademico from ProgramaAcademico programaAcademico left join fetch programaAcademico.materias",
        countQuery = "select count(distinct programaAcademico) from ProgramaAcademico programaAcademico")
    Page<ProgramaAcademico> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct programaAcademico from ProgramaAcademico programaAcademico left join fetch programaAcademico.materias")
    List<ProgramaAcademico> findAllWithEagerRelationships();

    @Query("select programaAcademico from ProgramaAcademico programaAcademico left join fetch programaAcademico.materias where programaAcademico.id =:id")
    Optional<ProgramaAcademico> findOneWithEagerRelationships(@Param("id") Long id);

}
