export const MESSAGES_ERROR = {
  DB: {
    ERROR: 'Ha ocurrido un error al intentar comunicarse con la base de datos.',
    NOT_FOUND: (id: string) => `No se ha encontrado el recurso con id \'${id}\'en la base de datos.`,
  },
}