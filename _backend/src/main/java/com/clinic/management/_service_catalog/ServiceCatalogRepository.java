package com.clinic.management._service_catalog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceCatalogRepository extends 
    JpaRepository<ServiceCatalog, String>, 
    JpaSpecificationExecutor<ServiceCatalog>
    {
    long count();
    List<ServiceCatalog> findByDeletedFalse();
}
