/* eslint-disable */
export default async () => {
    const t = {
        ["./modules/common/enum/gender_options.enum"]: await import("./modules/common/enum/gender_options.enum"),
        ["./modules/common/enum/fiscal_status.enum"]: await import("./modules/common/enum/fiscal_status.enum")
    };
    return { "@nestjs/swagger": { "models": [[import("./modules/professional/dto/create-professional.dto"), { "CreateProfessionalDto": { name: { required: true, type: () => String, description: "Nombre del profesional", example: "Juan", minLength: 2, maxLength: 100, pattern: "^[A-Za-z\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC\u00D1\u00F1]+" }, last_name: { required: true, type: () => String, description: "Apellido del profesional", example: "P\u00E9rez", minLength: 2, maxLength: 100, pattern: "^[A-Za-z\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC\u00D1\u00F1]+" }, gender: { required: true, description: "Genero", example: "M", enum: t["./modules/common/enum/gender_options.enum"].gender_options }, cuit: { required: false, type: () => String, description: "CUIT", example: "20345678901", pattern: "^[0-9]{11}" }, fiscal_status: { required: false, description: "Estado fiscal", example: "monotributista", enum: t["./modules/common/enum/fiscal_status.enum"].fiscal_status }, phone: { required: false, type: () => String, description: "Tel\u00E9fono", example: "1123456789", maxLength: 30 }, email: { required: false, type: () => String, description: "Email", example: "juan@gmail.com", minLength: 12, maxLength: 255 }, password: { required: true, type: () => String, description: "Contrase\u00F1a", example: "JuanPerez123@", maxLength: 255 }, birthdate: { required: false, type: () => Date, description: "Fecha de nacimiento", example: "1990-01-21" }, bank: { required: false, type: () => String, description: "Banco", example: "Santander R\u00EDo", maxLength: 255 }, bank_account: { required: false, type: () => String, description: "N\u00FAmero de cuenta", example: "123456789", maxLength: 50 }, cbu: { required: false, type: () => String, description: "CBU", example: "1234567891234567891234", maxLength: 23 }, alias: { required: false, type: () => String, description: "Alias", example: "juanperez", maxLength: 50 }, note: { required: false, type: () => String, description: "Nota", example: "Profesional con 10 a\u00F1os de experiencia" } } }], [import("./modules/professional/dto/update-professional.dto"), { "UpdateProfessionalDto": {} }], [import("./modules/common/dto/pagination.dto"), { "PaginationDto": { limit: { required: false, type: () => Number, description: "Cantidad de registros a mostrar", example: 10, minimum: 1 }, offset: { required: false, type: () => Number, description: "Cantidad de registros a saltar", example: 0, default: 0, minimum: 0 } } }], [import("./modules/client/dto/create-client.dto"), { "CreateClientDto": { name: { required: true, type: () => String, description: "Nombre del cliente", example: "Ricardo", minLength: 2, maxLength: 100, pattern: "^[A-Za-z\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC\u00D1\u00F1]+" }, is_active: { required: false, type: () => Boolean, description: "Estado del cliente", example: true } } }], [import("./modules/client/dto/update-client.dto"), { "UpdateClientDto": {} }], [import("./modules/auth/dto/login-user.dto"), { "LoginUserDto": { email: { required: false, type: () => String, description: "Email", example: "user1@gmail.com", minLength: 12, maxLength: 255 }, password: { required: true, type: () => String, description: "Contrase\u00F1a", example: "pppppppp", maxLength: 255 } } }], [import("./modules/auth/dto/token-user.dto"), { "TokenUserDto": { token: { required: true, type: () => String, description: "Token", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNzYsImlhdCI6MTcwNzY5NDYzOSwiZXhwIjoxNzA3NzgxMDM5fQ.ZGodi1dWraNjuE2cAk8tON-tZMJb0xLvc2rgYn7zVO8" } } }], [import("./modules/user/dto/create-user.dto"), { "CreateUserDto": { client_fk: { required: true, type: () => Number, description: "Foreign Key del cliente", example: 1, maximum: 2147483647, minimum: 1 }, name: { required: true, type: () => String, description: "Nombre del usuario", example: "Juan", minLength: 2, maxLength: 100, pattern: "^[A-Za-z\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC\u00D1\u00F1]+" }, email: { required: true, type: () => String, description: "Email", example: "juan@gmail.com", minLength: 12, maxLength: 255 }, password: { required: true, type: () => String, description: "Contrase\u00F1a", example: "JuanPerez123@", maxLength: 255 }, is_admin: { required: false, type: () => Boolean, description: "Es admin", example: true }, is_active: { required: false, type: () => Boolean, description: "Estado del usuario", example: true } } }], [import("./modules/user/dto/update-user.dto"), { "UpdateUserDto": {} }], [import("./modules/screen/dto/create-screen.dto"), { "CreateScreenDto": { name: { required: true, type: () => String, description: "Nombre del usuario", example: "Juan", minLength: 2, maxLength: 100, pattern: "^[A-Za-z\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC\u00D1\u00F1]+" }, is_active: { required: true, type: () => Boolean, description: "Estado del usuario", example: true } } }], [import("./modules/screen/dto/update-screen.dto"), { "UpdateScreenDto": {} }], [import("./modules/permission/dto/create-permission.dto"), { "CreatePermissionDto": { user_fk: { required: true, type: () => Number, description: "Foreign Key del usuario", example: 1, maximum: 2147483647, minimum: 1 }, client_fk: { required: true, type: () => Number, description: "Foreign Key del cliente", example: 1, maximum: 2147483647, minimum: 1 }, screen_fk: { required: true, type: () => Number, description: "Foreign Key de la pantalla", example: 1, maximum: 2147483647, minimum: 1 } } }], [import("./modules/permission/dto/update-permission.dto"), { "UpdatePermissionDto": {} }], [import("./modules/work_invitation/dto/create-work_invitation.dto"), { "CreateWorkInvitationDto": { client_fk: { required: true, type: () => Number, description: "Foreign Key del cliente", example: 1, maximum: 2147483647, minimum: 1 }, professional_fk: { required: true, type: () => Number, description: "Foreign Key del profesional", example: 1, maximum: 2147483647, minimum: 1 }, sender: { required: true, type: () => Object, description: "Rol del usuario" }, is_accept: { required: true, type: () => Boolean, description: "Estado del usuario", example: true, default: false } } }], [import("./modules/work_invitation/dto/update-work_invitation.dto"), { "UpdateWorkInvitationDto": {} }]], "controllers": [[import("./modules/professional/professional.controller"), { "ProfessionalController": { "create": { summary: "Crea un profesional" }, "findAll": { summary: "Listar todos los profesionales" }, "findOne": { summary: "Obtiene un profesional por id" }, "update": { summary: "Actualiza un profesional por id" } } }], [import("./modules/client/client.controller"), { "ClientController": { "create": { summary: "Crear un cliente" }, "findAll": { summary: "Listar todos los clientes" }, "findOne": { summary: "Buscar un cliente por id" }, "update": { summary: "Actualizar un cliente por id" } } }], [import("./modules/auth/auth.controller"), { "AuthController": { "login": { summary: "Iniciar sesi\u00F3n", type: Object }, "decodeToken": { summary: "Decodificar token", type: Object }, "checkAuthStatus": { summary: "Verificar estado de autenticaci\u00F3n" } } }], [import("./modules/user/user.controller"), { "UserController": { "create": { summary: "Crea un usuario" }, "findAll": { summary: "Listar todos los usuarios" }, "findOne": { summary: "Buscar un usuario por id" }, "update": { summary: "Actualizar un usuario por id" } } }], [import("./modules/screen/screen.controller"), { "ScreenController": { "create": { summary: "Crea una pantalla" }, "findAll": { summary: "Listar todas las pantallas" }, "findOne": { summary: "Buscar una pantalla por id" }, "update": { summary: "Actualiza una pantalla por id" } } }], [import("./modules/permission/permission.controller"), { "PermissionController": { "create": { summary: "Crea un permiso" }, "findAll": { summary: "Listar todos los permisos por cliente" }, "findOne": { summary: "Obtiene un permiso por vista y usuario" }, "update": { summary: "Actualiza un permiso por vista y usuario" }, "findAllPerClient": { summary: "Listar todos los permisos por cliente" }, "findAllPerUser": { summary: "Listar todos los permisos por usuario" } } }], [import("./modules/work_invitation/work_invitation.controller"), { "WorkInvitationController": { "create": { summary: "Crea una invitaci\u00F3n" }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String }, "findInvitationByClient": { summary: "Obtiene todas las invitaciones de un cliente" }, "findInvitationByProfessional": { summary: "Obtiene todas las invitaciones de un profesional" }, "acceptInvitation": { summary: "Acepta una invitaci\u00F3n" } } }]] } };
};