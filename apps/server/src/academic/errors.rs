use sword::web::*;
use thiserror::Error;

#[derive(Debug, Error, HttpError)]
pub enum AcademicError {
    // Academic category errors
    #[http(code = 404, message = "Categoría académica no encontrada")]
    #[error("Category not found")]
    CategoryNotFound,

    #[http(code = 404, message = "Opción de categoría no encontrada")]
    #[error("Category option not found")]
    CategoryOptionNotFound,

    // Degree errors
    #[http(code = 404, message = "Grado académico no encontrado")]
    #[error("Degree not found")]
    DegreeNotFound,

    // Academic errors
    #[http(code = 409, message = "Ya existe un académico con el mismo RUT")]
    #[error("Academic with the same RUT already exists")]
    AcademicRutAlreadyExists,

    #[http(code = 409, message = "Ya existe un académico con el mismo ORCID")]
    #[error("Academic with the same ORCID already exists")]
    AcademicOrcidAlreadyExists,

    #[http(code = 404, message = "Académico no encontrado")]
    #[error("Academic not found")]
    AcademicNotFound,
}
