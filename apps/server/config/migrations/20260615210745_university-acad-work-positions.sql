CREATE TABLE academic_work_positions (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	code TEXT NOT NULL UNIQUE,
	name TEXT NOT NULL
);

INSERT INTO academic_work_positions (id, code, name) VALUES
(gen_random_uuid(), 'uknown', 'Desconocido'),
(gen_random_uuid(), 'docente', 'Docente'),
(gen_random_uuid(), 'jefe_carrera', 'Jefe(a) de Carrera'),
(gen_random_uuid(), 'director_departamento', 'Director(a) de Departamento'),
(gen_random_uuid(), 'ceda', 'CEDA'),
(gen_random_uuid(), 'director', 'Director(a)'),
(gen_random_uuid(), 'vicedecano_decano_interino', 'Vicedecano(a) - Decano(a) Interino(a)'),
(gen_random_uuid(), 'jefe_carrera_ceda', 'Jefe(a) de Carrera - CEDA'),
(gen_random_uuid(), 'docente_reemplazo', 'Docente de Reemplazo'),
(gen_random_uuid(), 'director_magister', 'Director Magister');
