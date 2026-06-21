use std::sync::Arc;

use crate::shared::{AppResult, Database};
use crate::university::WorkPositionFilter;
use crate::university::work_positions::{AcademicWorkPosition, AcademicWorkPositionId};
use sqlx::{Postgres, QueryBuilder};
use sword::prelude::*;

#[injectable]
pub struct AcademicWorkPositionsRepository {
    database: Arc<Database>,
}

impl AcademicWorkPositionsRepository {
    pub async fn list(&self, filter: WorkPositionFilter) -> AppResult<Vec<AcademicWorkPosition>> {
        let mut query = QueryBuilder::<Postgres>::new(
            "SELECT id, code, name FROM academic_work_positions WHERE 1=1",
        );

        if let Some(n) = filter.name {
            let pattern = format!("%{}%", n.trim());

            query
                .push(" AND (name ILIKE ")
                .push_bind(pattern.clone())
                .push(")");
        }

        let positions = query
            .build_query_as::<AcademicWorkPosition>()
            .fetch_all(self.database.pool())
            .await?;

        Ok(positions)
    }

    pub async fn find_by_id(&self, id: &AcademicWorkPositionId) -> AppResult<Option<AcademicWorkPosition>> {
        let item = sqlx::query_as::<_, AcademicWorkPosition>(
            "SELECT id, code, name FROM academic_work_positions WHERE id = $1",
        )
        .bind(id)
        .fetch_optional(self.database.pool())
        .await?;

        Ok(item)
    }

    pub async fn save(&self, position: &AcademicWorkPosition) -> AppResult<()> {
        sqlx::query("INSERT INTO academic_work_positions (id, code, name) VALUES ($1, $2, $3)")
            .bind(position.id)
            .bind(&position.code)
            .bind(&position.name)
            .execute(self.database.pool())
            .await?;

        Ok(())
    }
}
