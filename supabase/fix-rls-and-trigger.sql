-- ============================================================
-- CORREÇÃO: Infinite recursion nas RLS policies do profiles
-- RODAR NO SUPABASE SQL EDITOR
-- ============================================================

-- 1. Remove TODAS as policies problemáticas criadas anteriormente
-- ============================================================
DROP POLICY IF EXISTS "profiles_select_own"     ON profiles;
DROP POLICY IF EXISTS "profiles_update_own"     ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own"     ON profiles;
DROP POLICY IF EXISTS "profiles_select_admin"   ON profiles;

DROP POLICY IF EXISTS "courses_select_published"          ON courses;
DROP POLICY IF EXISTS "courses_insert_admin_instructor"   ON courses;
DROP POLICY IF EXISTS "courses_update_admin_instructor"   ON courses;
DROP POLICY IF EXISTS "courses_delete_admin"              ON courses;

DROP POLICY IF EXISTS "modules_select" ON modules;
DROP POLICY IF EXISTS "modules_write"  ON modules;
DROP POLICY IF EXISTS "lessons_select" ON lessons;
DROP POLICY IF EXISTS "lessons_write"  ON lessons;


-- ============================================================
-- 2. Função SECURITY DEFINER para pegar o role do usuário
--    sem disparar RLS (evita a recursão)
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER        -- executa como postgres, bypassa RLS
STABLE
SET search_path = public
AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;


-- ============================================================
-- 3. Políticas para PROFILES
--    ⚠ NUNCA use subquery em profiles dentro de policies de profiles
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Qualquer usuário autenticado lê o próprio perfil
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Admin lê todos os perfis (usa a função, não subquery recursiva)
CREATE POLICY "profiles_select_admin"
  ON profiles FOR SELECT
  USING (get_my_role() = 'admin');

-- Usuário atualiza o próprio perfil
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Usuário cria o próprio perfil (fallback caso trigger não exista ainda)
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);


-- ============================================================
-- 4. Políticas para COURSES
-- ============================================================

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Cursos publicados visíveis para todos autenticados
CREATE POLICY "courses_select"
  ON courses FOR SELECT
  USING (is_published = true OR get_my_role() IN ('admin', 'instructor'));

-- Apenas admin e instructor criam cursos
CREATE POLICY "courses_insert"
  ON courses FOR INSERT
  WITH CHECK (get_my_role() IN ('admin', 'instructor'));

-- Apenas admin e instructor editam cursos
CREATE POLICY "courses_update"
  ON courses FOR UPDATE
  USING (get_my_role() IN ('admin', 'instructor'));

-- Apenas admin deleta cursos
CREATE POLICY "courses_delete"
  ON courses FOR DELETE
  USING (get_my_role() = 'admin');


-- ============================================================
-- 5. Políticas para MODULES
-- ============================================================

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "modules_select"
  ON modules FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "modules_insert"
  ON modules FOR INSERT
  WITH CHECK (get_my_role() IN ('admin', 'instructor'));

CREATE POLICY "modules_update"
  ON modules FOR UPDATE
  USING (get_my_role() IN ('admin', 'instructor'));

CREATE POLICY "modules_delete"
  ON modules FOR DELETE
  USING (get_my_role() IN ('admin', 'instructor'));


-- ============================================================
-- 6. Políticas para LESSONS
-- ============================================================

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lessons_select"
  ON lessons FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "lessons_insert"
  ON lessons FOR INSERT
  WITH CHECK (get_my_role() IN ('admin', 'instructor'));

CREATE POLICY "lessons_update"
  ON lessons FOR UPDATE
  USING (get_my_role() IN ('admin', 'instructor'));

CREATE POLICY "lessons_delete"
  ON lessons FOR DELETE
  USING (get_my_role() IN ('admin', 'instructor'));


-- ============================================================
-- 7. Políticas para ENROLLMENTS
-- ============================================================

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrollments_select_own"
  ON enrollments FOR SELECT
  USING (auth.uid() = user_id OR get_my_role() IN ('admin', 'instructor'));

CREATE POLICY "enrollments_insert"
  ON enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id OR get_my_role() = 'admin');

CREATE POLICY "enrollments_update"
  ON enrollments FOR UPDATE
  USING (get_my_role() = 'admin');


-- ============================================================
-- 8. Políticas para LESSON_PROGRESS
-- ============================================================

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "progress_select_own"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id OR get_my_role() IN ('admin', 'instructor'));

CREATE POLICY "progress_upsert_own"
  ON lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "progress_update_own"
  ON lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);


-- ============================================================
-- 9. Políticas para LESSON_FILES
-- ============================================================

ALTER TABLE lesson_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lesson_files_select"
  ON lesson_files FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "lesson_files_write"
  ON lesson_files FOR ALL
  USING (get_my_role() IN ('admin', 'instructor'))
  WITH CHECK (get_my_role() IN ('admin', 'instructor'));


-- ============================================================
-- 10. Políticas para INSTRUCTORS e COURSE_INSTRUCTORS
-- ============================================================

ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "instructors_select"
  ON instructors FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "instructors_write"
  ON instructors FOR ALL
  USING (get_my_role() = 'admin')
  WITH CHECK (get_my_role() = 'admin');

ALTER TABLE course_instructors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "course_instructors_select"
  ON course_instructors FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "course_instructors_write"
  ON course_instructors FOR ALL
  USING (get_my_role() IN ('admin', 'instructor'))
  WITH CHECK (get_my_role() IN ('admin', 'instructor'));


-- ============================================================
-- 11. Trigger para criar perfil automaticamente ao criar usuário
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    new.id,
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1)
    ),
    COALESCE(new.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ============================================================
-- 12. Cria perfil para usuários existentes sem perfil
--     e garante que seu usuário admin tenha role = 'admin'
-- ============================================================

-- Insere perfis faltando (com role student por padrão)
INSERT INTO public.profiles (id, name, role)
SELECT 
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)) AS name,
  'student' AS role
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Promove TODOS os usuários existentes para admin
-- (remova ou ajuste isso quando tiver múltiplos usuários)
UPDATE public.profiles
SET role = 'admin'
WHERE id IN (SELECT id FROM auth.users);
