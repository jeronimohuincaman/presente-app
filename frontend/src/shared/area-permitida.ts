// archivo .ts, por ejemplo en asistencia.page.ts
import { polygon } from '@turf/helpers';

// Este es el polígono del área válida neuquen y cipolletti
export const areaPermitida = polygon([[
    [-38.91564929280025, -68.2094389574519], // punto A
    [-38.98226336097035, -68.13644803497486], // punto B
    [-38.99300373468096, -68.08518821895937], // punto C
    [-38.9945371148915, -67.97664237196278], // punto D
    [-38.91448177386428, -67.94405191348486],
    [-38.88028097547201, -68.12772106723321],
    [-38.91564929280025, -68.2094389574519]  // volver al punto A (cierra el polígono)
]]);

// // Este es el polígono del área inválida
// export const areaPermitida = polygon([[
//     [-38.91918235091653, -68.30775544374075], // punto A
//     [-38.929599125049045, -68.20956514121815], // punto B
//     [-38.97925808034839, -68.1632165718456], // punto C
//     [-38.97205168135486, -68.31256196204606], // punto D
//     [-38.91448177386428, -67.94405191348486],
//     [-38.91918235091653, -68.30775544374075],
// ]]);
