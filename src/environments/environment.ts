export const environment = {
    production: true,
    urlBAse: "https://centroartesanal-api.onrender.com",
    pathUrl: {
        urlVerificarUsuarioPassword: "/api/v1/usuarios/verifyUserByUserAndPassword",
        urlObtenerUsuariosPorUser: "/api/v1/usuarios/getUsersByUserName",
        urlObtenerHorariosporId: "/api/v1/horarios/getHorarioEstudiante",
        urlObtenerHorariosmatricula: "/api/v1/horarios/getAllHorarios",
        urlVerificarUsuario: "/api/v1/usuarios/verifyUserByUser",
        urlObtenerHorariosporIdDocente: "/api/v1/horarios/getHorarioDocente",
        UrlObtenerCursos: "/api/v1/cursos/getCursos",
        UrlObtenerParalelos: "/api/v1/paralelos/getParalelos",
        UrlObtenerMaterias: "/api/v1/materias/getItemMaterias",
        UrlObtenerDatosCompletos: "/api/v1/usuarios/getUsersCompleteData",
        UrlObtenerActaByEstudiante: "/api/v1/itemActas/getItemActasByIdEstudiante",
        urlObtenerActaEstudiante: "/api/v1/actas/getActaEstudiante",
        urlObtenerItemMatricula: "/api/v1/matriculas/getItemMatriculasByEstudianteId",
        urlObtenerOrdenPago: "/api/v1/ordenPagoMatriculas/getItemOrdenPagoMatriculasByMatriculaId",
        urlObterCursoEstudiante: "/api/v1/cursos/getCursosEstudiante",
        urlObtenerMaterias: "/api/v1/materias/getItemMateriasByName",
        urlObtenerActividades: "/api/v1/actividades/getActividadByCurso",
        urlUpdateEntregas: "/api/v1/entregas/updateEntrega",
        urlObtenerEntregaActividad: "/api/v1/actividades/entregaActividad",
        urlObtenerAsistenciasByIdEstudiante: "/api/v1/asistencias/getAsistenciasByIdEstudiante",

        urlDocentes: {
            obtenerCursos: "/api/v1/cursos/getCursosDocente",
            obtenerActividades: "/api/v1/actividades/getActividadByCurso",
            obtenerIdDocente: "/api/v1/usuarios/getUsersCompleteData/",
            obtenerContratoDocente: "/api/v1/contratos/getContratoDocente",
            obtenerDocente: "/api/v1/docentes/getTeachers",
            obtenerDatosDocente: "/api/v1/usuarios/getUsersCompleteData/",
            modificarActividad: "/api/v1/actividades/updateActividad",
            agregarActividad: "/api/v1/actividades/addActividad",
            obtenerPagoDocenteByDocenteId: "/api/v1/pagoDocentes/getPagoDocenteByDocenteId",
            obtenerEntrega: "/api/v1/actividades/entregaActividad",
            obtenerParticipantes: "/api/v1/cursos/getParticipantesCurso",
            borrarActividad: "/api/v1/actividades/deleteActividad",
            calificarEntrega: "/api/v1/entregas/addCalificacion",
            obtenerContratoDocente2: "/api/v1/contratos/getContratosByIdDocente",
            actualizarActa: "/api/v1/actas/addActa",
            getActa: "/api/v1/actas/getActaCurso",
        },          
        urlObtenerParticipantes: "/api/v1/participantes/getParticipantesByActividadId",
        urlObtenerEstudiantes: "/api/v1/estudiantes/getEstudiantes",
        urlModificarEntrega: "/api/v1/entregas/updateEntrega",
        urlObtenerUsuarios: "/api/v1/usuarios/getUsers",

        urlDocenteAdmin: {
            obtenerTopDocentes: "/api/v1/docentes/getTop5Teacher",
            obtenerDocentes: "/api/v1/docentes/getAdminDocentes",
            obtenerPagoDocentes: "/api/v1/pagoDocentes/getAdminPagoDocentes",
            obtenerEvaluacionesDocente: "/api/v1/evaluaciones/getEvaluacionesByDocente",
            agregarContratoDocente: "/api/v1/contratos/addContrato",
        },
        urlEstudianteAdmin: {
            obtenerTopEstudiantes: "/api/v1/estudiantes/getTop5Estudiantes",
            obtenerEstudiantes: "/api/v1/estudiantes/getAdminEstudiantes",
            obtenerMateriasEstudiantes: "/api/v1/cursos/getCursosEstudiante",
            obtenerEntregasEstudiantes: "/api/v1/entregas/GetEntregasAdmin",
        },
        urlAgregarDocente: "/api/v1/docentes/addUserAndTeachers",
        urlAgregarEstudiante: "/api/v1/estudiantes/addUserAndStudents",

        urlMatriculacion: {
            urlAgregarMatricula: "/api/v1/matriculas/addMatricula",
            urlAgregarItemMatriculas: "/api/v1/itemMatriculas/addItemMatriculas",
            urlAgregarOrdenPagoMatriculas: "/api/v1/ordenPagoMatriculas/addOrdenPagoMatriculas",
            urlObtenerOrdenesPago: "/api/v1/ordenPagoMatriculas/getItemOrdenPagoMatriculas",
        }
    }
}
