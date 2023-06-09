import * as ActionTypes from "./ActionTypes";

export const comentarios = (
  state = { errMess: null, comentarios: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      const id = state.comentarios.length;
      const nuevoComentario = {
        id: id,
        excursionId: action.payload.excursionId,
        valoracion: action.payload.valoracion,
        comentario: action.payload.comentario,
        autor: action.payload.autor,
        dia: action.payload.dia,
      };
      return {
        ...state,
        comentarios: state.comentarios.concat(nuevoComentario),
      };
    default:
      return state;
  }
};
