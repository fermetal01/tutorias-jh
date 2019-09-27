package co.edu.ucentra.tutorias.repository;
import co.edu.ucentra.tutorias.domain.Tutoria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tutoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TutoriaRepository extends JpaRepository<Tutoria, Long> {

}
