package co.edu.ucentra.tutorias.repository;
import co.edu.ucentra.tutorias.domain.Profesor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Profesor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

    @Query("select profesor from Profesor profesor where profesor.user.login = ?#{principal.username}")
    List<Profesor> findByUserIsCurrentUser();

}
