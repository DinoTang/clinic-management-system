package com.clinic.management._specialty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty, String> {

    List<Specialty> findByDeletedFalse();
}