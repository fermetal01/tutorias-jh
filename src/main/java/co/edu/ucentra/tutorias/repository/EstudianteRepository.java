package co.edu.ucentra.tutorias.repository;
import co.edu.ucentra.tutorias.domain.Estudiante;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Estudiante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

    @Query("select estudiante from Estudiante estudiante where estudiante.user.login = ?#{principal.username}")
    List<Estudiante> findByUserIsCurrentUser();

}
