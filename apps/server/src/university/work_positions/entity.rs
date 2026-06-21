use bon::Builder;

use crate::shared::{Entity, Id};

use serde::Serialize;
use sqlx::FromRow;

pub type AcademicWorkPositionId = Id<AcademicWorkPosition>;

#[derive(Debug, Clone, Serialize, FromRow, Builder)]
pub struct AcademicWorkPosition {
    #[builder(default = AcademicWorkPositionId::new())]
    pub id: AcademicWorkPositionId,
    pub code: String,
    pub name: String,
}

pub struct WorkPositionFilter {
    pub name: Option<String>,
}

impl Entity for AcademicWorkPosition {
    fn key_name() -> &'static str {
        "academic_work_position"
    }
}
