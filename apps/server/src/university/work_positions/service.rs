use crate::{shared::AppResult, university::*};

use std::sync::Arc;
use sword::prelude::*;

fn slugify(name: &str) -> String {
    name.to_lowercase()
        .chars()
        .filter(|c| c.is_alphanumeric() || *c == ' ')
        .collect::<String>()
        .split_whitespace()
        .collect::<Vec<&str>>()
        .join("_")
}

#[injectable]
pub struct AcademicWorkPositionsService {
    positions: Arc<AcademicWorkPositionsRepository>,
}

impl AcademicWorkPositionsService {
    pub async fn find(&self, query: GetWorkPositionsQuery) -> AppResult<Vec<AcademicWorkPosition>> {
        let filter = WorkPositionFilter {
            name: query.name,
        };

        self.positions.list(filter).await
    }

    pub async fn find_by_id(&self, id: &AcademicWorkPositionId) -> AppResult<AcademicWorkPosition> {
        let Some(position) = self.positions.find_by_id(id).await? else {
            return Err(UniversityError::WorkPositionNotFound)?;
        };

        Ok(position)
    }

    pub async fn create(
        &self,
        input: CreateAcademicWorkPositionDto,
    ) -> AppResult<AcademicWorkPosition> {
        let position = AcademicWorkPosition::builder()
            .code(slugify(&input.name))
            .name(input.name)
            .build();

        self.positions.save(&position).await?;

        Ok(position)
    }
}
