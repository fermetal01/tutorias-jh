package co.edu.ucentra.tutorias.repository;
import co.edu.ucentra.tutorias.domain.HorarioMateria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HorarioMateria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HorarioMateriaRepository extends JpaRepository<HorarioMateria, Long> {

}
