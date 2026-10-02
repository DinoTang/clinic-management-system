package com.clinic.management._specialty.repositories;

import com.clinic.management._specialty.entities.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty, String> {
}