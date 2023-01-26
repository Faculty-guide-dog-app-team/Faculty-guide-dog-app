/**
 * Class describing a single cell
 *
 * Atributes
 * ----------
 * distance: number
 *      The cells shortest known distance from the starting node
 * parent_coordinates: [number, number]
 *      The coordinates of a cell that last updated this cells distance, on a grid originating at [0, 0]
 *      equal to it's own coordinates by default
 * is_walkable: boolean
 *      Describes whether the cell is walkable
 * coordinates: [number, number]
 *      This cells coordinates on the grid, originating at [0, 0]
 * room_number: string, optional
 *      The number of the room
 */

import config from '../config.json';

export class Cell {
  distance: number;
  parent_coordinates?: [number, number];
  is_walkable: boolean;
  coordinates: [number, number];
  room_text?: string;

  constructor(
    distance: number,
    is_walkable: boolean,
    coordinates: [number, number],
    room_text?: string,
  ) {
    this.distance = distance;
    this.is_walkable = is_walkable;
    this.coordinates = coordinates;
    this.room_text = room_text;
  }
}

/**
 * Receives a grid of numbers and returns a grid of
 * corresponding cells
 *
 * 0: path
 * 1: wall
 *
 * @param number_grid
 * @returns
 */
export function number_to_object_grid(): Array<Array<Cell>> {
  let number_grid = config.grid;
  let object_grid: Array<Array<Cell>> = [];
  let row_index = 0;
  for (let row of number_grid) {
    let object_row: Array<Cell> = [];
    let column_index = 0;
    for (let number of row) {
      switch (
        number // decyduje czy da się przejść przez komórkę
      ) {
        case '0': // ścieżka
          object_row.push(new Cell(Infinity, true, [column_index, row_index]));
          break;
        case '1': // ściana
          object_row.push(new Cell(Infinity, false, [column_index, row_index]));
          break;
        case '2': // drzwi
          object_row.push(
            new Cell(Infinity, false, [column_index, row_index], 'nn'),
          );
          break;
        default:
          object_row.push(
            new Cell(Infinity, false, [column_index, row_index], number),
          );
          break;
      }
      column_index += 1;
    }
    object_grid.push(object_row);
    row_index += 1;
  }
  return object_grid;
}

/**
 * Takes a 2d array and returns and array of  all
 * of its indexes in a [number, number] format
 *
 * @param grid
 * @returns
 */
// function all_coordinates(grid: Array<Array<any>>): Array<[number, number]> {
//     let coordinates: Array<[number, number]> = [];
//     for (let row_index in grid){
//         for (let column_index in grid[Number(row_index)]){
//             coordinates.push([Number(row_index), Number(column_index)])
//         }
//     }
//     return coordinates;
// }

/**
 *
 * Takes a 2d array and returns all of its values
 *
 * @param array_2d
 * @returns
 */
function all_values(array_2d: Array<Array<any>>): Array<any> {
  let values: Array<any> = [];
  for (let row of array_2d) {
    values = values.concat(row);
  }
  return values;
}

export function find_door(room: string, grid: Array<Array<Cell>>): Cell | null {
  for (let row of grid) {
    for (let cell of row) {
      if (cell.room_text === room) {
        return cell;
      }
    }
  }
  return null;
}

function includes(array: Array<any>, target: any): boolean {
  for (let item of array) {
    if (item == target) {
      return true;
    }
  }
  return false;
}

/**
 * Takes the starting coordinates in the format [x, y] (column, row),
 * the goal's coordinates in the format [x, y] (column, row) and
 * a grid of cells which must be bounded by walls
 *
 * returns an array of cells forming
 * the shortest path from point A (start) to point B (goal)
 *
 *
 * @param start
 * @param goal
 * @param grid
 * @returns
 */
export function find_path_dijkstra(
  start: [number, number],
  goal: [number, number],
  grid: Array<Array<Cell>>,
): Array<Cell> {
  let path: Array<Cell> = [];
  start[0] = Math.abs(start[0]);
  start[1] = Math.abs(start[1]);
  let start_cell = grid[start[1]][start[0]];
  let goal_cell = grid[goal[1]][goal[0]];
  if (start === goal) {
    return [start_cell];
  }

  start_cell.distance = 0;
  let unexplored_cells: Array<Cell> = all_values(grid);
  // while (unexplored_cells.includes(goal_cell)){
  while (includes(unexplored_cells, goal_cell)) {
    let closest = unexplored_cells.reduce((lowest, current) => {
      // getting the cell with the lowest distance
      if (current.distance < lowest.distance) {
        return current;
      }
      return lowest;
    });
    let [x, y] = closest.coordinates;
    let neighbours = [
      grid[y - 1][x],
      grid[y][x - 1],
      grid[y + 1][x],
      grid[y][x + 1],
    ];
    for (let neighbour of neighbours) {
      // iterating over every neighbour and updating their distances if needed
      if (neighbour.is_walkable || neighbour == goal_cell) {
        // sprawdza czy da się przejść lub czy jest u celu
        if (neighbour.distance > closest.distance + 1) {
          neighbour.distance = closest.distance + 1;
          neighbour.parent_coordinates = closest.coordinates; // and setting the current cell as their parent
        }
      }
    }
    let closest_index = unexplored_cells.indexOf(closest);
    unexplored_cells.splice(closest_index, 1); // deleting the current cell from unexplored
  }
  let current_cell = goal_cell;
  while (current_cell != start_cell) {
    // making the array of all parents of the final cell
    path.push(current_cell);
    let next_coordinates = current_cell.parent_coordinates;
    if (next_coordinates === undefined) {
      throw TypeError;
    }
    current_cell = grid[next_coordinates[1]][next_coordinates[0]];
  }
  path.push(current_cell); // adding the starting cell to the end

  return path.reverse(); // changing the path from finish-start to start-finish
}

// let cell_grid = number_to_object_grid(number_grid);
// let coordinates = all_coordinates(cell_grid);
// console.log(coordinates);

// let path = find_path_dijkstra([1,1], [4,4], number_to_object_grid(number_grid));
// console.log(path);
